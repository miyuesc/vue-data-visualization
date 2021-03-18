import { useStore } from 'vuex';
import { ChartComponent, ChartComponents } from '@/types/components';
import { ActivePoint, MouseActiveType, MouseDownCoordinator, MouseStatus } from '@/types/mouseStatus';
import { Canvas } from '@/types/canvas';
import { computed, ComputedRef, reactive } from 'vue';
import { throttle, uuid } from '@/utils/commonUtils';
import { Position, Size } from '@/types/activeElement';

export default function mouseEventHook() {
  const store = useStore();
  const activeElementState: ChartComponent = store.state.activeElement;
  const mouseStatusState: MouseStatus = store.state.mouseStatus;
  const canvasState: Canvas = store.state.canvas;
  const componentsState: ChartComponents = store.state.components;

  const parentNodeSize: { width: number; height: number } = reactive({ width: 0, height: 0 }); // 父元素的高宽
  const isResizable: ComputedRef<boolean> = computed(() => activeElementState.resizable);
  const isMovable: ComputedRef<boolean> = computed(() => activeElementState.movable);
  const mousedownMDC: ComputedRef<MouseDownCoordinator> = computed(() => mouseStatusState.mouseDownCoordinator);
  const activePoint: ComputedRef<ActivePoint> = computed(() => mouseStatusState.activePoint);
  const activeType: ComputedRef<MouseActiveType> = computed(() => mouseStatusState.mouseActiveType);
  const scale: ComputedRef<number> = computed(() => canvasState.scale);

  const throttleUpdate: (newState: ChartComponent) => void = throttle((newState: ChartComponent) => {
    store.commit('activeElement/updatePAS', newState);
    store.commit('components/update', { component: newState, index: activeElementState.index });
  }, 8);

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
      position: { left: Math.floor(newLeft), top: Math.floor(newTop) }
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
    if (activePoint.value === 'tl') {
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
    if (activePoint.value === 'tc') {
      newHeight = isLegalY ? height - offsetY : height + y;
      if (newHeight > 0) {
        newTop = isLegalY ? y + offsetY : 0;
      } else {
        newTop = height + y;
        newHeight = 0;
      }
    }
    // 右上, newLeft 不变
    if (activePoint.value === 'tr') {
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
    if (activePoint.value === 'ml') {
      const maxWidth = width + x;
      newWidth = width - offsetX > maxWidth ? maxWidth : width - offsetX;
      newLeft = width - offsetX > maxWidth ? 0 : newLeft + offsetX;
      if (newWidth <= 0) {
        newWidth = 0;
        newLeft = maxWidth;
      }
    }
    // 右中, newTop、newHeight、newLeft 不变
    if (activePoint.value === 'mr') {
      const maxWidth = parentNodeSize.width - x;
      newWidth = width + offsetX < maxWidth ? width + offsetX : maxWidth;
      if (newWidth <= 0) newWidth = 0;
    }
    // 下左, newTop 不变
    if (activePoint.value === 'bl') {
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
    if (activePoint.value === 'bc') {
      const maxHeight = parentNodeSize.height - y;
      newHeight = height + offsetY < maxHeight ? height + offsetY : maxHeight;
      if (newHeight <= 0) newHeight = 0;
    }
    // 下右, newTop, newLeft 不变
    if (activePoint.value === 'br') {
      const maxWidth = parentNodeSize.width - x;
      newWidth = width + offsetX < maxWidth ? width + offsetX : maxWidth;
      if (newWidth <= 0) newWidth = 0;
      const maxHeight = parentNodeSize.height - y;
      newHeight = height + offsetY < maxHeight ? height + offsetY : maxHeight;
      if (newHeight <= 0) newHeight = 0;
    }

    const newPAS: { position: Position; size: Size } = {
      position: { left: Math.floor(newLeft), top: Math.floor(newTop) },
      size: { width: Math.floor(newWidth) || 0, height: Math.floor(newHeight) || 0 }
    };

    throttleUpdate({ ...activeElementState, ...newPAS, movable: false });
  };
  const OnMouseMoving: any = (event: MouseEvent): any => {
    if (isMovable.value) return computedElementPosition(event);
    if (isResizable.value) return computedElementSize(event);
    return undefined;
  };
  const OnMouseUp: any = (event: MouseEvent): any => {
    store.commit('activeElement/updateMovable', false);
    store.commit('activeElement/updateResizable', false);
    if (activeType.value === 'create') {
      store.commit('mouseStatus/updateMAT', null);
      const { offsetX, offsetY } = event;
      // 未进入画布区域的判断
      console.log(offsetY, offsetX);
      const { mouseX, mouseY } = mousedownMDC.value;
      // 边界判断
      const width: number = Math.floor(224 / scale.value);
      const height: number = Math.floor(128 / scale.value);

      let top: number = Math.floor(offsetY - mouseY / scale.value);
      if (top < 0) top = 0;
      if (top + height > 1080) top = 1080 - height;
      let left: number = Math.floor(offsetX - mouseX / scale.value);
      if (left < 0) left = 0;
      if (left + width > 1920) left = 1920 - width;

      const newComponent: ChartComponent = {
        id: uuid(16),
        index: componentsState.components.length,
        zIndex: componentsState.components[componentsState.components.length - 1].zIndex + 1,
        position: { top, left },
        size: { width, height },
        visible: true,
        movable: false,
        resizable: false,
        componentInfo: componentsState.draggingComponent || ''
      };
      store.commit('components/add', newComponent);
      store.commit('activeElement/updateAll', newComponent);
    }
  };

  return {
    parentNodeSize,
    OnMouseMoving,
    OnMouseUp
  };
}
