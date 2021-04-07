import { createStore } from 'vuex';
import { objectDeepClone, uuid } from '@/utils/commonUtils';

function updateComponent(state: any, component: any) {
  state.activity.component = JSON.parse(JSON.stringify(component));
  if (component) {
    state.activity.isLocked = component?.isLocked || false;
    const index = state.components.findIndex((cp: any) => cp.id === component.id);
    if (index !== -1) {
      state.components.splice(index, 1, JSON.parse(JSON.stringify(component)));
    }
  }
}

const defaultComponentState = {
  size: { width: 400, height: 260 },
  position: { left: 700, top: 400 },
  isLocked: false, // 是否锁定
  id: 0,
  index: "",
  zIndex: 1,
}

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
      state.activatedFlag.isMoving = false;
      state.activatedFlag.indicatorVisible = !!component;
      state.activatedFlag.zIndex = component?.zIndex ?? 0;
      objectDeepClone(state.activatedComponent, component);
    },
    setMoving(state: any, { zIndex, status }: any) {
      console.log(state.components[zIndex]);
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
      const newCompo = JSON.parse(component);
      newCompo.position = { ...position };
      newCompo.size = { ...size };
      newCompo.zIndex = state.componentsTotal + 1;
      newCompo.id = uuid(16);
      state.components[newCompo.zIndex] = {};
      objectDeepClone(state.components[newCompo.zIndex], newCompo)
      state.componentsTotal = state.componentsTotal + 1;
    },
    // key: 配置项的 key
    updateComponent(state: any, { newState, key }: any) {
      objectDeepClone(state.activatedComponent[key], newState);
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
    // setActivity(state: any, { type, component }: any) {
    //   state.activity.type = type;
    //   updateComponent(state, component);
    // },
    // updateActivity(state: any, component: any) {
    //   updateComponent(state, component);
    // },
    // setMoving(state: any, status: boolean) {
    //   state.activity.isMoving = status;
    // },
    // setCopied(state: any, component: any) {
    //   state.copiedComponent = JSON.parse(JSON.stringify(component));
    // },
    // setCopiedConfig(state: any, config: any) {
    //   state.copiedConfig = JSON.parse(JSON.stringify(config));
    // },
    // createComponent(state: any, component: any){
    //   state.components.push(JSON.parse(JSON.stringify(component)));
    //   state.activity.component = JSON.parse(JSON.stringify(component));
    //   state.activity.component.visible = true;
    //   state.activity.type = 'component';
    //   state.componentsTotal = state.componentsTotal + 1;
    // },
    // updateComponent(state: any, component: any) {
    //   const index = state.components.findIndex((cp: any) => cp.id === component.id);
    //   if (index !== -1) {
    //     state.components.splice(index, 1, JSON.parse(JSON.stringify(component)));
    //   }
    // }
  }
});
