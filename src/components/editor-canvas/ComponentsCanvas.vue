<template>
  <div class="editor-canvas-area" :style="cpStyle">
    <div
      v-for="cpt in componentsList"
      :key="cpt.id"
      :class="`cp cp__${cpt.id}`"
      :style="{
        width: `${cpt.size.width}px`,
        height: `${cpt.size.height}px`,
        left: `${cpt.position.left}px`,
        top: `${cpt.position.top}px`,
        zIndex: cpt.zIndex
      }"
      @mousedown.stop.prevent="changeActiveElement(cpt, $event)"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ComputedRef, onMounted, onBeforeMount, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { ChartComponent, ChartComponents } from "@/types/components";
import { ActivePoint, MouseDownCoordinator, MouseStatus } from "@/types/mouseStatus";
import { Canvas } from "@/types/canvas";
import { debounce, throttle } from "@/utils/commonUtils";
import { Position, Size } from "@/types/activeElement";

export default defineComponent({
  name: "ComponentsCanvas",
  props: { cpStyle: String },
  setup() {
    const store = useStore();
    const componentsState: ChartComponents = store.state.components;
    const activeElementState: ChartComponent = store.state.activeElement;
    const mouseStatusState: MouseStatus = store.state.mouseStatus;
    const canvasState: Canvas = store.state.canvas;

    const componentsList: ComputedRef<ChartComponent[]> = computed(() => componentsState.components);

    const parentNodeSize: { width: number; height: number } = reactive({ width: 0, height: 0 }); // 父元素的高宽
    const isResizable: ComputedRef<boolean> = computed(() => activeElementState.resizable);
    const isMovable: ComputedRef<boolean> = computed(() => activeElementState.movable);
    const mousedownMDC: ComputedRef<MouseDownCoordinator> = computed(() => mouseStatusState.mouseDownCoordinator);
    const activePoint: ComputedRef<ActivePoint> = computed(() => mouseStatusState.activePoint);
    const scale: ComputedRef<number> = computed(() => canvasState.scale);

    const throttleUpdate: (newState: ChartComponent) => void = throttle((newState: ChartComponent) => {
      console.log(newState);
      store.commit("activeElement/updatePAS", newState);
      store.commit("components/update", { component: newState, index: activeElementState.index });
    }, 8);
    const throttleActiveUpdate: (component: ChartComponent) => void = throttle(
      (component: ChartComponent) => store.commit("activeElement/updatePAS", component),
      16
    );
    const debounceComponentUpdate: (component: ChartComponent) => void = debounce(
      (component: ChartComponent) => store.commit("components/update", { component, index: activeElementState.index }),
      100
    );

    const computedElementPosition: any = (event: MouseEvent): any => {
      const {
        size: { width, height }
      } = activeElementState;
      // 根据鼠标移动距离更新元素的当前位置
      const { x, y, mouseX, mouseY } = mousedownMDC.value;
      let newLeft: number = x + (event.clientX - mouseX) / scale.value;
      let newTop: number = y + (event.clientY - mouseY) / scale.value;
      // 判断是否还在可视区域内, 不在则重设为合法数值
      if (newLeft < 0) newLeft = 0;
      if (newLeft + width > parentNodeSize.width) newLeft = parentNodeSize.width - width;
      if (newTop < 0) newTop = 0;
      if (newTop + height > parentNodeSize.height) newTop = parentNodeSize.height - height;

      const newPAS: { position: Position } = {
        position: { left: newLeft, top: newTop }
      };

      throttleUpdate({ ...activeElementState, ...newPAS });
    };
    const computedElementSize: any = (event: MouseEvent): any => {
      const { x, y, width, height, mouseX, mouseY } = mousedownMDC.value;
      let newWidth = width;
      let newHeight = height;
      let newLeft = x;
      let newTop = y;
      const offsetX = (event.clientX - mouseX) / scale.value; // x 方向偏移量
      const offsetY = (event.clientY - mouseY) / scale.value; // y 方向偏移量
      // 边界判断
      const isLegalX = offsetX + x > 0 && offsetX + x < parentNodeSize.width;
      const isLegalY = offsetY + y > 0 && offsetY + y < parentNodeSize.height;
      // 根据 鼠标移动距离 设置 新的高宽
      // 左上, 均会改变
      if (activePoint.value === "tl") {
        newWidth = isLegalX ? width - offsetX : width + x;
        if (newWidth > 0) {
          newLeft = isLegalX ? x + offsetX : 0;
        } else {
          newLeft = width + x;
          newWidth = 0;
        }
        newHeight = isLegalY ? height - offsetY : height + y;
        if (newHeight > 0) {
          newTop = isLegalY ? y + offsetY : 0;
        } else {
          newTop = height + y;
          newHeight = 0;
        }
      }
      // 中上, newLeft, newWidth 不变
      if (activePoint.value === "tc") {
        newHeight = isLegalY ? height - offsetY : height + y;
        if (newHeight > 0) {
          newTop = isLegalY ? y + offsetY : 0;
        } else {
          newTop = height + y;
          newHeight = 0;
        }
      }
      // 右上, newLeft 不变
      if (activePoint.value === "tr") {
        const maxWidth = parentNodeSize.width - x;
        newWidth = width + offsetX > maxWidth ? maxWidth : width + offsetX;
        if (newWidth <= 0) newWidth = 0;
        newHeight = isLegalY ? height - offsetY : height + y;
        if (newHeight > 0) {
          newTop = isLegalY ? y + offsetY : 0;
        } else {
          newTop = height + y;
          newHeight = 0;
        }
      }
      // 左中, newTop、newHeight 不变
      if (activePoint.value === "ml") {
        const maxWidth = width + x;
        newWidth = width - offsetX > maxWidth ? maxWidth : width - offsetX;
        newLeft = width - offsetX > maxWidth ? 0 : newLeft + offsetX;
        if (newWidth <= 0) {
          newWidth = 0;
          newLeft = maxWidth;
        }
      }
      // 右中, newTop、newHeight、newLeft 不变
      if (activePoint.value === "mr") {
        const maxWidth = parentNodeSize.width - x;
        newWidth = width + offsetX < maxWidth ? width + offsetX : maxWidth;
        if (newWidth <= 0) newWidth = 0;
      }
      // 下左, newTop 不变
      if (activePoint.value === "bl") {
        const maxWidth = width + x;
        newWidth = width - offsetX > maxWidth ? maxWidth : width - offsetX;
        newLeft = width - offsetX > maxWidth ? 0 : newLeft + offsetX;
        if (newWidth <= 0) {
          newWidth = 0;
          newLeft = maxWidth;
        }
        const maxHeight = parentNodeSize.height - y;
        newHeight = height + offsetY < maxHeight ? height + offsetY : maxHeight;
        if (newHeight <= 0) newHeight = 0;
      }
      // 下中, newWidth, newTop 不变
      if (activePoint.value === "bc") {
        const maxHeight = parentNodeSize.height - y;
        newHeight = height + offsetY < maxHeight ? height + offsetY : maxHeight;
        if (newHeight <= 0) newHeight = 0;
      }
      // 下右, newTop, newLeft 不变
      if (activePoint.value === "br") {
        const maxWidth = parentNodeSize.width - x;
        newWidth = width + offsetX < maxWidth ? width + offsetX : maxWidth;
        if (newWidth <= 0) newWidth = 0;
        const maxHeight = parentNodeSize.height - y;
        newHeight = height + offsetY < maxHeight ? height + offsetY : maxHeight;
        if (newHeight <= 0) newHeight = 0;
      }

      const newPAS: { position: Position; size: Size } = {
        position: { left: newLeft, top: newTop },
        size: { width: newWidth || 0, height: newHeight || 0 }
      };

      throttleActiveUpdate({ ...activeElementState, ...newPAS });
      debounceComponentUpdate({ ...activeElementState, ...newPAS, movable: false });
    };
    const OnMouseMoving: any = (event: MouseEvent): any => {
      if (isMovable.value) return computedElementPosition(event);
      if (isResizable.value) return computedElementSize(event);
      return undefined;
    };
    const OnMouseUp: any = (event: MouseEvent): any => {
      console.log(event);
      store.commit("activeElement/updateMovable", false);
      store.commit("activeElement/updateResizable", false);
    };

    const changeActiveElement: any = (cpt: ChartComponent, event: MouseEvent) => {
      const mdc: MouseDownCoordinator = {
        x: cpt.position.left, // 鼠标所在元素 距离父元素左侧 的距离
        y: cpt.position.top, // 鼠标所在元素 距离父元素上侧 的距离
        width: 0,
        height: 0,
        mouseX: event.clientX || 0, // 鼠标处于屏幕的横向位置
        mouseY: event.clientY || 0 // 鼠标处于屏幕的纵向位置
      };
      const newState: ChartComponent = {
        ...cpt,
        visible: true,
        movable: true
      };
      store.commit("mouseStatus/updateMDC", mdc);
      store.commit("activeElement/updateAll", newState);
    };

    onMounted(() => {
      const { ctx: instance }: any = getCurrentInstance();
      parentNodeSize.width = instance.$el.clientWidth;
      parentNodeSize.height = instance.$el.clientHeight;
      document.documentElement.addEventListener("mousemove", OnMouseMoving);
      document.documentElement.addEventListener("mouseup", OnMouseUp);
    });
    onBeforeMount(() => {
      document.documentElement.removeEventListener("mousemove", OnMouseMoving);
      document.documentElement.removeEventListener("mouseup", OnMouseUp);
    });

    return {
      componentsList,
      changeActiveElement
    };
  }
});
</script>

<style lang="scss">
.cp {
  background: #00b9ff99;
  position: absolute;
}
</style>
