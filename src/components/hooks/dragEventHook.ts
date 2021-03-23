import { useStore } from 'vuex';
import { computed } from 'vue';
import { throttle } from '@/utils/commonUtils';

export default function dragEventHook () {
  const store = useStore();
  const canvas = computed(() => store.state.canvas).value;
  const activity = computed(() => store.state.activity).value;

  const throttleUpdate: any = throttle((newState: any) => {
    const component: any = {...activity.component, ...newState};
    store.commit('setActivity', { type: 'component', component });
    store.commit('updateComponent', component);
  }, 8);

  const dragStart: any = (event: any, component: any) => {
    const { path } = event;
    const target = path.filter((el: HTMLElement) => {
      return el.classList && el.classList.value && el.classList.value.indexOf('cp cp__') !== -1;
    });
    const currentPAS = {
      x: target[0].offsetLeft,
      y: target[0].offsetTop,
      clientX: event.clientX,
      clientY: event.clientY
    }
    let first = true;
    component.visible = true;
    store.commit('setActivity', { type: 'component', component: component });

    const moving = (event: MouseEvent) => {
      if (first) {
        store.commit('setMoving', true);
        first = false;
      }
      const { size: { width, height } } = activity.component;
      // 根据鼠标移动距离更新元素的当前位置
      const { x, y, clientX, clientY } = currentPAS;
      let newLeft: number = x + (event.clientX - clientX) / canvas.scale;
      let newTop: number = y + (event.clientY - clientY) / canvas.scale;
      // 判断是否还在可视区域内, 不在则重设为合法数值
      if (newLeft < 0) newLeft = 0;
      if (newLeft + width > canvas.size.width) newLeft = canvas.size.width - width;
      if (newTop < 0) newTop = 0;
      if (newTop + height > canvas.size.height) newTop = canvas.size.height - height;

      const newPAS = {
        position: { left: Math.floor(newLeft), top: Math.floor(newTop) }
      };

      throttleUpdate(newPAS);
    }

    const moveEnd = () => {
      store.commit('setMoving', false);
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
