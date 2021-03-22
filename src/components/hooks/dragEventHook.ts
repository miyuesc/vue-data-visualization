import {useStore} from 'vuex';
import {computed} from 'vue';
import {throttle} from '@/utils/commonUtils';

export default function dragEventHook () {
  const store = useStore();
  const canvas = computed(() => store.state.canvas).value;
  const activity = computed(() => store.state.activity).value;

  const throttleUpdate: any = throttle((newState: any) => {
    const component: any = {...activity.component, ...newState};
    store.commit('setActivity', {type: 'component', component});
    store.commit('updateComponent', component);
  }, 8);

  const dragStart: any = (event: any, component: any) => {
    const currentPAS = {
      x: event.target.offsetLeft,
      y: event.target.offsetTop,
      clientX: event.clientX,
      clientY: event.clientY
    }
    console.log(currentPAS);
    component.visible = true;
    store.commit('setActivity', { type: 'component', component: component });

    const move = (event: MouseEvent) => {
      console.log(event);

      const { size: { width, height } } = activity.component;
      // 根据鼠标移动距离更新元素的当前位置
      const { x, y, clientX, clientY } = currentPAS;
      console.log(width, height);
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

    const up = () => {
      document.documentElement.removeEventListener('mousemove', move);
      document.documentElement.removeEventListener('mouseup', up);
    }
    document.documentElement.addEventListener('mousemove', move);
    document.documentElement.addEventListener('mouseup', up);
  }

  return {
    dragStart
  }
}
