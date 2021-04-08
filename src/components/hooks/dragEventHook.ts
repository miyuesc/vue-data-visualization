import { useStore } from 'vuex';
import { computed } from 'vue';
import { throttle } from '@/utils/commonUtils';

export default function dragEventHook () {
  const store = useStore();
  const canvas = computed(() => store.state.canvas).value;

  const throttleUpdate: any = throttle((position: any) => {
    store.commit('updateComponent', { newState: { ...position }, key: 'position' });
  }, 8);

  const dragStart: any = (event: any, component: any) => {
    store.commit('setActivated', { type: 'component', component: component });

    const { path } = event;
    const target = path.find((el: HTMLElement) => el.className && el.className.indexOf('cp cp__') !== -1);
    const currentPAS = {
      x: target.offsetLeft,
      y: target.offsetTop,
      clientX: event.clientX,
      clientY: event.clientY
    }
    let first = true;

    const moving = (event: MouseEvent) => {
      if (first) {
        store.commit('setMoving', { zIndex: component.zIndex, status: true});
        first = false;
      }
      const { size: { width, height } } = component;
      // 根据鼠标移动距离更新元素的当前位置
      const { x, y, clientX, clientY } = currentPAS;
      let newLeft: number = x + (event.clientX - clientX) / canvas.scale;
      let newTop: number = y + (event.clientY - clientY) / canvas.scale;
      // 判断是否还在可视区域内, 不在则重设为合法数值
      if (newLeft < 0) newLeft = 0;
      if (newLeft + width > canvas.size.width) newLeft = canvas.size.width - width;
      if (newTop < 0) newTop = 0;
      if (newTop + height > canvas.size.height) newTop = canvas.size.height - height;

      const position = { left: Math.floor(newLeft), top: Math.floor(newTop) };

      throttleUpdate(position);
    }

    const moveEnd = () => {
      store.commit('setMoving', { zIndex: component.zIndex, status: false});
      first = true;
      document.documentElement.removeEventListener('mousemove', moving);
      document.documentElement.removeEventListener('mouseup', moveEnd);
    }
    document.documentElement.addEventListener('mousemove', moving);
    document.documentElement.addEventListener('mouseup', moveEnd);
  }

  return {
    dragStart
  }
}
