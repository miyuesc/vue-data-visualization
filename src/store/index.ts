import { createStore } from 'vuex';
import { objectDeepClone, uuid } from '@/utils/commonUtils';
import defaultConfig from "@/assets/components/defaultConfig";

function setAcComponent(state: any, index: number) {
  state.acFlag.isMoving = false;
  state.acFlag.indicatorVisible = true;
  state.acFlag.acIndex = index;
  state.acComponent = state.components[index];
  // objectDeepClone(state.acComponent, component);
}

function presetComponent(component: any) {
  for (let key of component.config) {
    component[key] = {};
    // @ts-ignore
    objectDeepClone(component[key], defaultConfig[key]);
  }
}

// const defaultComponentState = {
//   size: { width: 400, height: 260 },
//   position: { left: 700, top: 400 },
//   isLocked: false, // 是否锁定
//   id: 0,
//   index: "",
//   zIndex: 1,
// }

export default createStore({
  state: () => ({
    // 画布
    canvas: {
      size: {
        width: 1920,
        height: 1080
      },
      scale: 0.8,
      background: {
        color: '',
        opacity: 1,
        image: ''
      }
    },
    components: [],
    componentsTotal: 0,
    // 激活组件
    acFlag: {
      type: 'background',
      acIndex: 0, // zIndex映射，当前选中的组件
      isMoving: false, // 是否移动中 => 是否显示指示线
      indicatorVisible: false
    },
    acComponent: {},
    // 复制的组件
    copiedComponent: {},
    copiedConfig: {},
    // 拖拽的组件
    draggedComponent: {},
    draggedConfig: {}
  }),
  mutations: {
    setActivated(state: any, { type, component, index }: any) {
      state.acFlag.type = type;
      if (!component) {
        state.acFlag.indicatorVisible = false;
        state.acFlag.acIndex = -1;
        state.acComponent = {};
      } else {
        setAcComponent(state, index);
      }
    },
    setMoving(state: any, { status }: any) {
      if (!state.acComponent || !state.acComponent.isLocked) {
        state.acFlag.isMoving = status;
      }
    },
    setCopiedComponent(state: any, compo: any) {
      state.copiedConfig = JSON.stringify(compo);
    },
    setDraggedComponent(state: any, { component, config}: any) {
      state.draggedComponent = JSON.stringify(component);
      objectDeepClone(state.draggedConfig, config)
    },
    // 创建新图表
    createComponent(state: any, { component, position, size }: any) {
      const newCompo = {
        ...JSON.parse(component),
        position: { ...position },
        size: { ...size },
        id: uuid(16)
      };
      // 合成 默认初始数据
      presetComponent(newCompo);
      state.components.push(newCompo);
      setAcComponent(state, state.componentsTotal);
      state.componentsTotal = state.componentsTotal + 1;
      state.acFlag.type = 'component';
    },
    // 更新图表：key: 配置项的 key
    updateComponent(state: any, { newState, key }: any) {
      !state.acComponent[key] && (state.acComponent[key] = {});
      objectDeepClone(state.acComponent[key], newState);
      // !state.components[state.acFlag.acIndex][key] && (state.components[state.acFlag.acIndex][key] = {});
      // objectDeepClone(state.components[state.acFlag.acIndex][key], newState);
    },
    // 更新元素 位置与大小
    updateComponentPAS(state: any, newState: any) {
      objectDeepClone(state.acComponent.position, newState.position);
      objectDeepClone(state.acComponent.size, newState.size);
      // objectDeepClone(state.components[state.acFlag.acIndex].position, newState.position);
      // objectDeepClone(state.components[state.acFlag.acIndex].size, newState.size);
    },
    // 更新元素 所有属性
    updateComponentAll(state: any, {detail, index}: any) {
      objectDeepClone(state.acComponent, detail);
      // objectDeepClone(state.components[index], detail);
    },
    // a: activated, t: target
    swapComponent(state: any, { a, t }: {  a: number; t: number }) {
      // state.components[t].zIndex = a;
      // state.components[a].zIndex = t;
      // const compA = state.components[a];
      // const compT = state.components[t];
      // state.components[t] = compA;
      // state.components[a] = compT;
    },
    // 画布相关
    updateCanvas(state: any, newState: any) {
      objectDeepClone(state.canvas, newState);
    }
  }
});
