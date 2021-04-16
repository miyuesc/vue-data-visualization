import { useStore } from "vuex";

export default function DropEventHook() {
  const store = useStore();

  const drop: any = (event: MouseEvent) => {
    // @ts-ignore
    const { offsetX, offsetY, target, path } = event;
    // 默认配置项
    const defaultSize = { width: 400, height: 260 }; // const defaultSize = store.state.defaultConfig.size;
    const copied = store.state.draggedComponent;
    const canvasSize = store.state.canvas.size;
    const draggedConfig = store.state.draggedConfig || {};

    let left, top;

    // 拖放结束时鼠标在画布上
    if ((target as HTMLElement).tagName === "DIV" && (target as HTMLElement).className === "editor-canvas-area") {
      left = offsetX - (draggedConfig?.offsetX || 0);
      top = offsetY - (draggedConfig?.offsetY || 0);
    } else {
      let targetDiv = (path as HTMLElement[]).find((el: HTMLElement) => el.className.indexOf("cp cp") !==-1);
      // 拖拽放置的目标位置在组件上
      left = (targetDiv as HTMLElement).offsetLeft + offsetX - (draggedConfig?.offsetX || 0);
      top = (targetDiv as HTMLElement).offsetTop + offsetY - (draggedConfig?.offsetY || 0);
    }
    // 边界判定
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (left + defaultSize.width > canvasSize.width) left = canvasSize.width - defaultSize.width;
    if (top + defaultSize.height > canvasSize.height) top = canvasSize.height - defaultSize.height;

    const newComponent = {
      component: copied,
      size: { ...defaultSize },
      position: { left, top }
    }

    store.commit('createComponent', newComponent);
  }

  return {
    drop
  }
}
