import { createStore } from 'vuex';

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
    // 组件
    components: [],
    componentsTotal: 1,
    // 激活组件
    activity: {
      type: 'background',
      isMoving: false, // 是否移动中 => 是否显示指示线
      isLocked: false, // 是否锁定
      component: null // 保存选中的组件的配置
    },
    // 复制的组件
    copiedComponent: null,
    copiedConfig: null,
    // 默认配置
    defaultConfig: {
      size: {
        width: 360,
        height: 240
      }
    }
  }),
  mutations: {
    setActivity(state: any, { type, component }: any) {
      state.activity.type = type;
      updateComponent(state, component);
    },
    updateActivity(state: any, component: any) {
      updateComponent(state, component);
    },
    setMoving(state: any, status: boolean) {
      state.activity.isMoving = status;
    },
    setCopied(state: any, component: any) {
      console.log(component);
      state.copiedComponent = JSON.parse(JSON.stringify(component));
    },
    setCopiedConfig(state: any, config: any) {
      state.copiedConfig = JSON.parse(JSON.stringify(config));
    },
    createComponent(state: any, component: any){
      state.components.push(JSON.parse(JSON.stringify(component)));
      state.activity.component = JSON.parse(JSON.stringify(component));
      state.activity.component.visible = true;
      state.activity.type = 'component';
      state.componentsTotal = state.componentsTotal + 1;
    },
    updateComponent(state: any, component: any) {
      const index = state.components.findIndex((cp: any) => cp.id === component.id);
      if (index !== -1) {
        state.components.splice(index, 1, JSON.parse(JSON.stringify(component)));
      }
    }
  }
});
