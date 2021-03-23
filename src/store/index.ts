import { createStore } from "vuex";

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
        color: "",
        opacity: 1,
        image: ""
      }
    },
    // 组件
    components: [
      {
        id: 'test',
        name: '测试',
        index: 0,
        zIndex: 1,
        position: {
          left: 122,
          top: 267
        },
        size: {
          width: 500,
          height: 360
        }
      }
    ],
    componentsTotal: 1,
    // 激活组件
    activity: {
      type: "background",
      isMoving: false, // 是否移动中 => 是否显示指示线
      isLocked: false, // 是否锁定
      component: null // 保存选中的组件的配置
    },
    // 复制的组件
    copiedComponent: null,
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
      state.activity.component = JSON.parse(JSON.stringify(component));
      if (component) {
        state.activity.isLocked = component?.isLocked || false;
        state.components.splice(component.index, 1, JSON.parse(JSON.stringify(component)));
      }
    },
    setMoving(state: any, status: boolean) {
      state.activity.isMoving = status;
    },
    setCopied(state: any, component: any) {
      state.copiedComponent = JSON.parse(JSON.stringify(component));
    },
    createComponent(state: any, component: any){
      state.components.push(JSON.parse(JSON.stringify(component)));
      state.activity.component = JSON.parse(JSON.stringify(component));
      state.activity.type = 'component';
      state.componentsTotal = state.componentsTotal + 1;
    },
    updateComponent(state: any, component: any) {
      state.components.splice(component.index, 1, JSON.parse(JSON.stringify(component)));
    }
  }
});
