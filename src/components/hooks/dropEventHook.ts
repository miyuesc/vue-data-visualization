import { useStore } from "vuex";
import { uuid } from "@/utils/commonUtils";

export default function DropEventHook() {
  const store = useStore();

  const drop: any = (event: MouseEvent) => {
    const { offsetX, offsetY, target } = event;
    const copied =  store.state.copiedComponent;
    const defaultSize = store.state.defaultConfig.size;
    const canvasSize = store.state.canvas.size;
    const zIndex = store.state.componentsTotal + 1;
    const copiedConfig = store.state.copiedConfig || {};
    let left = 0;
    let top = 0;
    if ((target as HTMLElement).classList.contains('cp')) {
      // 拖拽放置的目标位置在组件上
      left = (target as HTMLElement).offsetLeft + offsetX - (copiedConfig?.offsetX || 0);
      top = (target as HTMLElement).offsetTop + offsetY - (copiedConfig?.offsetY || 0);
    } else {
      left = offsetX - (copiedConfig?.offsetX || 0);
      top = offsetY - (copiedConfig?.offsetY || 0);
    }
    // 边界判定
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (left + defaultSize.width > canvasSize.width) left = canvasSize.width - defaultSize.width;
    if (top + defaultSize.height > canvasSize.height) top = canvasSize.height - defaultSize.height;

    const id = uuid(16);

    const newComponent = {
      ...copied,
      size: { ...defaultSize },
      position: { left, top },
      id,
      zIndex
    }

    store.commit('createComponent', newComponent);
  }

  return {
    drop
  }
}
