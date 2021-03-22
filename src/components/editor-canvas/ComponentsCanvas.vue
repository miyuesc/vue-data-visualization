<template>
  <div class="editor-canvas-area" :style="cpStyle" @mousedown.stop="clearActiveElement">
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
    >
      <ComponentTransform :info="cpt.componentInfo" :size="cpt.size" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, onMounted, onBeforeMount, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { ChartComponent, ChartComponents } from '@/types/components';
import { MouseDownCoordinator } from '@/types/mouseStatus';
// import mouseEventHook from '@/components/hooks/mouseEventHook';
import dragEventHook from '@/components/hooks/dragEventHook';
import ComponentTransform from './indicators/ComponentTransform.vue';

export default defineComponent({
  name: 'ComponentsCanvas',
  props: { cpStyle: String },
  components: { ComponentTransform },
  setup() {
    const store = useStore();
    const componentsState: ChartComponents = store.state.components;

    const componentsList: ComputedRef<ChartComponent[]> = computed(() => {
      console.log(componentsState.components);
      return componentsState.components;
    });

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
      store.commit('mouseStatus/updateMDC', mdc);
      store.commit('mouseStatus/updateMAT', 'move');
      store.commit('activeElement/updateAll', newState);
    };
    const clearActiveElement: any = () => {
      store.commit('activeElement/updateMovable', false);
      store.commit('activeElement/updateVisible', false);
      store.commit('activeElement/updateResizable', false);
      store.commit('mouseStatus/updateActivePoint', null);
    };

    const { parentNodeSize, OnMouseMoving, OnMouseUp } = mouseEventHook();

    onMounted(() => {
      const { ctx: instance }: any = getCurrentInstance();
      parentNodeSize.width = instance.$el.clientWidth;
      parentNodeSize.height = instance.$el.clientHeight;
      document.documentElement.addEventListener('mousemove', OnMouseMoving);
      document.documentElement.addEventListener('mouseup', OnMouseUp);
    });
    onBeforeMount(() => {
      document.documentElement.removeEventListener('mousemove', OnMouseMoving);
      document.documentElement.removeEventListener('mouseup', OnMouseUp);
    });

    return {
      componentsList,
      changeActiveElement,
      clearActiveElement
    };
  }
});
</script>

<style lang="scss">
.cp {
  position: absolute;
}
</style>
