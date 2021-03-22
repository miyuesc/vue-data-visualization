import { useStore } from "vuex";
import  {computed } from "vue";
import {throttle} from "@/utils/commonUtils";

export default function resizeEventHook() {
  const store = useStore();
  const canvas = computed(() => store.state.canvas).value;
  const activity = computed(() => store.state.activity).value;

  const throttleUpdate: any = throttle((newState: any) => {
    const component: any = {...activity.component, ...newState};
    store.commit('setActivity', { type: 'component', component });
    store.commit('updateComponent', component);
  }, 8);

  const resizeStart = (event: any, point: string) => {
    const activePoint = point;
    const currentPAS = {
      x: event.target.parentNode.offsetLeft,
      y: event.target.parentNode.offsetTop,
      width: event.target.parentNode.clientWidth,
      height: event.target.parentNode.clientHeight,
      clientX: event.clientX,
      clientY: event.clientY
    }

    const resizing = (event: MouseEvent) => {
    }

    const resizeEnd = () => {
      document.documentElement.removeEventListener('mousemove', resizing);
      document.documentElement.removeEventListener('mouseup', resizeEnd);
    }
    document.documentElement.addEventListener('mousemove', resizing);
    document.documentElement.addEventListener('mouseup', resizeEnd);
  }
  return {
    resizeStart
  }
}
