import { useStore } from 'vuex';
import { computed } from 'vue';
import { throttle } from '@/utils/commonUtils';
import type { Store } from 'vuex';
import type { StoreState } from '@/types/store';
import type { Canvas } from '@/types/canvas';
import type { Component, Position } from '@/types/component';

export default function dragEventHook() {
  const store: Store<StoreState> = useStore();
  const canvas: Canvas = computed(() => store.state.canvas).value;

  const throttleUpdate: any = throttle((position: any) => {
    store.commit('updateComponent', { newState: { ...position }, key: 'position' });
  }, 8);

  const dragStart: any = (event: any, component: Component, index: number) => {
    // 将激活组件设置为当前鼠标所在的组件
    store.commit('setActivated', { type: 'component', component, index });

    // const { path } = event;
    // const target = path.find((el: HTMLElement) => el.className && el.className.indexOf('cp cp__') !== -1);
    const currentPAS = {
      // x: target.offsetLeft,
      // y: target.offsetTop,
      x: component.position.left,
      y: component.position.top,
      clientX: event.clientX,
      clientY: event.clientY
    };
    let first = true;

    const moving = (event: MouseEvent) => {
      if (first) {
        store.commit('setMoving', { status: true });
        first = false;
      }
      const {
        size: { width, height }
      } = component;
      // 根据鼠标移动距离更新元素的当前位置
      const { x, y, clientX, clientY } = currentPAS;
      let newLeft: number = x + (event.clientX - clientX) / canvas.scale;
      let newTop: number = y + (event.clientY - clientY) / canvas.scale;
      // 判断是否还在可视区域内, 不在则重设为合法数值
      if (newLeft < 0) newLeft = 0;
      if (newLeft + width > canvas.size.width) newLeft = canvas.size.width - width;
      if (newTop < 0) newTop = 0;
      if (newTop + height > canvas.size.height) newTop = canvas.size.height - height;

      const position: Position = { left: Math.floor(newLeft), top: Math.floor(newTop) };

      throttleUpdate(position);
    };

    const moveEnd = () => {
      store.commit('setMoving', { status: false });
      first = true;
      document.documentElement.removeEventListener('mousemove', moving);
      document.documentElement.removeEventListener('mouseup', moveEnd);
    };
    document.documentElement.addEventListener('mousemove', moving);
    document.documentElement.addEventListener('mouseup', moveEnd);
  };

  return {
    dragStart
  };
}
