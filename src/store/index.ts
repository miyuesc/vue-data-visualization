import { createStore } from 'vuex';
import { objectDeepClone, uuid } from '@/utils/commonUtils';
import defaultConfig from "@/assets/components/defaultConfig";

function setActivatedComponent(state: any, component: any) {
  state.activatedFlag.isMoving = false;
  state.activatedFlag.indicatorVisible = true;
  state.activatedFlag.zIndex = component.zIndex;
  objectDeepClone(state.activatedComponent, component);
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
    // 组件(以 ZIndex 为键的， 组件状态为值的对象)
    // ZIndex 方便更改层级
    components: {},
    componentsTotal: 0,
    // 激活组件
    activatedFlag: {
      type: 'background',
      zIndex: "0", // zIndex映射，当前选中的组件
      isMoving: false, // 是否移动中 => 是否显示指示线
      indicatorVisible: false
    },
    activatedComponent: {},
    // 复制的组件
    copiedComponent: {},
    copiedConfig: {},
    // 拖拽的组件
    draggedComponent: {},
    draggedConfig: {}
  }),
  mutations: {
    setActivated(state: any, { type, component }: any) {
      state.activatedFlag.type = type;
      if (!component) {
        state.activatedFlag.indicatorVisible = false;
        state.activatedFlag.zIndex = 0;
        state.activatedComponent = {};
      } else {
        setActivatedComponent(state, component);
      }
    },
    setMoving(state: any, { zIndex, status }: any) {
      if (!state.components[zIndex].isLocked) {
        state.activatedFlag.isMoving = status;
      }
    },
    setCopiedComponent(state: any, compo: any) {
      state.copiedConfig = JSON.stringify(compo);
    },
    setDraggedComponent(state: any, { component, config}: any) {
      state.draggedComponent = JSON.stringify(component);
      objectDeepClone(state.draggedConfig, config)
    },
    createComponent(state: any, { component, position, size }: any) {
      const newCompo = {
        ...JSON.parse(component),
        position: { ...position },
        size: { ...size },
        zIndex: state.componentsTotal + 1,
        id: uuid(16)
      };
      state.components[newCompo.zIndex] = {};
      objectDeepClone(state.components[newCompo.zIndex], newCompo);
      state.componentsTotal = state.componentsTotal + 1;
      presetComponent(state.components[newCompo.zIndex]);
      state.activatedFlag.type = 'component';
      setActivatedComponent(state, state.components[newCompo.zIndex]);
    },
    // key: 配置项的 key
    updateComponent(state: any, { newState, key }: any) {
      !state.activatedComponent[key] && (state.activatedComponent[key] = {});
      objectDeepClone(state.activatedComponent[key], newState);
      !state.components[state.activatedComponent.zIndex][key] && (state.components[state.activatedComponent.zIndex][key] = {});
      objectDeepClone(state.components[state.activatedComponent.zIndex][key], newState);
    },
    updateComponentPAS(state: any, newState: any) {
      objectDeepClone(state.activatedComponent.position, newState.position);
      objectDeepClone(state.components[state.activatedComponent.zIndex].position, newState.position);
      objectDeepClone(state.activatedComponent.size, newState.size);
      objectDeepClone(state.components[state.activatedComponent.zIndex].size, newState.size);
    },
    updateComponentAll(state: any, newCompo: any) {
      objectDeepClone(state.activatedComponent, newCompo);
      objectDeepClone(state.components[newCompo.zIndex], newCompo);
    },
    // a: activated, t: target
    swapComponent(state: any, { a, t }: {  a: number; t: number }) {
      state.components[t].zIndex = a;
      state.components[a].zIndex = t;
      const compA = state.components[a];
      const compT = state.components[t];
      state.components[t] = compA;
      state.components[a] = compT;
      setActivatedComponent(state, compA);
    },
    // 画布相关
    updateCanvas(state: any, newState: any) {
      objectDeepClone(state.canvas, newState);
    }
  }
});
