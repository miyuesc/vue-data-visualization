import { useStore } from 'vuex';
import type { Store } from 'vuex';
import type { StoreState } from '@/types/store';
import type { Size } from '@/types/component';

export default function DropEventHook() {
  const store: Store<StoreState> = useStore();

  const drop: any = (event: MouseEvent) => {
    const { offsetX, offsetY, target, path } = event as any;
    // 默认配置项
    const defaultSize = { width: 400, height: 260 }; // const defaultSize = store.state.defaultConfig.size;
    const copied: string = store.state.draggedComponent ?? '';
    const canvasSize: Size = store.state.canvas.size;
    const draggedConfig: any = store.state.draggedConfig || {};

    let left: number, top: number;

    // 拖放结束时鼠标在画布上
    if ((target as HTMLElement).tagName === 'DIV' && (target as HTMLElement).className === 'editor-canvas-area') {
      left = offsetX - (draggedConfig?.offsetX || 0);
      top = offsetY - (draggedConfig?.offsetY || 0);
    } else {
      const targetDiv = (path as HTMLElement[]).find((el: HTMLElement) => el.className.indexOf('cp cp') !== -1);
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
    };

    store.commit('createComponent', newComponent);
  };

  return {
    drop
  };
}
