import { useStore } from "vuex";

export default function DropEventHook() {
  const store = useStore();

  const drop: any = (event: MouseEvent) => {
    const { offsetX, offsetY, target } = event;

    console.log(event);

    const copied = store.state.draggedComponent;
    const defaultSize = { width: 400, height: 260 };
    // const defaultSize = store.state.defaultConfig.size;
    const canvasSize = store.state.canvas.size;
    const draggedConfig = store.state.draggedConfig || {};

    let left, top;
    if ((target as HTMLElement).classList.contains('cp')) {
      // 拖拽放置的目标位置在组件上
      left = (target as HTMLElement).offsetLeft + offsetX - (draggedConfig?.offsetX || 0);
      top = (target as HTMLElement).offsetTop + offsetY - (draggedConfig?.offsetY || 0);
    } else {
      left = offsetX - (draggedConfig?.offsetX || 0);
      top = offsetY - (draggedConfig?.offsetY || 0);
    }
    // 边界判定
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (left + defaultSize.width > canvasSize.width) left = canvasSize.width - defaultSize.width;
    if (top + defaultSize.height > canvasSize.height) top = canvasSize.height - defaultSize.height;

    const newComponent = {
      component: copied,
      size: {...defaultSize},
      position: { left, top }
    }

    store.commit('createComponent', newComponent);
  }

  return {
    drop
  }
}
