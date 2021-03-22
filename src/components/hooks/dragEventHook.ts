import { useStore } from 'vuex';
import { computed } from 'vue';
import { throttle } from '@/utils/commonUtils';

export default function dragEventHook (event: any, component: any) {
  const store = useStore();
  const activity = store.state;
  const canvas = computed(() => store.state.canvas);
  store.commit('setActivity', { type: 'component', component});

  let currentPAS = {
    x: event.target.parentNode.offsetX,
    y: event.target.parentNode.offsetY,
    clientX: event.clientX,
    clientY: event.clientY
  }

  const throttleUpdate: any = throttle((newState: any) => {
    const component: any = { ...activity.value.component, ...newState };
    store.commit('setActivity', { type: 'component', component});
    store.commit('updateComponent', component);
  }, 8);

  const move = (moveEvent: MouseEvent) => {
    const {
      size: { width, height }
    } = activity;
    // 根据鼠标移动距离更新元素的当前位置
    const { x, y, clientX, clientY } = currentPAS;
    let newLeft: number = x + (moveEvent.clientX - clientX) / canvas.value.scale;
    let newTop: number = y + (moveEvent.clientY - clientY) / canvas.value.scale;
    // 判断是否还在可视区域内, 不在则重设为合法数值
    if (newLeft < 0) newLeft = 0;
    if (newLeft + width > canvas.value.size.width) newLeft = canvas.value.size.width - width;
    if (newTop < 0) newTop = 0;
    if (newTop + height > canvas.value.size.height) newTop = canvas.value.size.height - height;

    const newPAS = {
      position: { left: Math.floor(newLeft), top: Math.floor(newTop) }
    };

    throttleUpdate(newPAS);
  }
  const up = () => {
    document.documentElement.removeEventListener('mousemove', move);
    document.documentElement.removeEventListener('mouseup', up);
  }

}
