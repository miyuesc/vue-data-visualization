import { computed } from 'vue';
import { useStore } from "vuex";
import { uuid } from "@/utils/commonUtils";

export default function DropEventHook() {
  const store = useStore();
  const copied =  computed(() => store.state.copiedComponent).value;
  const defaultSize = computed(() => store.state.defaultConfig.size).value;

  const drop: any = (event: MouseEvent) => {
    const { offsetX, offsetY, target } = event;
    const zIndex = store.state.componentsTotal + 1;
    let left = 0;
    let top = 0;
    if ((target as HTMLElement).classList.contains('cp')) {
      // 拖拽放置的目标位置在组件上
      // 继承原组件位置
      left = (target as HTMLElement).offsetLeft + offsetX;
      top = (target as HTMLElement).offsetTop + offsetY;
    } else {
      left = offsetX;
      top = offsetY;
    }
    const id = uuid(16);

    const newComponent = {
      ...copied,
      index: zIndex - 1,
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
