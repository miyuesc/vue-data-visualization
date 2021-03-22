import { createStore } from "vuex";
import activeElement from "@/store/activeElement";
import canvas from "@/store/canvas";
import components from "@/store/components";
import mouseStatus from "@/store/mouseStatus";

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
    components: [],
    // 激活组件
    activity: {
      type: "background",
      resizable: false, // 是否准备缩放
      movable: false, // 是否移动 => 是否显示指示线
      isLocked: false, // 是否锁定
      component: {} // 保存选中的组件的配置
    },
    // 复制的组件
    copiedComponent: null
  }),
  mutations: {
    setActivity(state: any, { type, component }: any) {
      state.activity.type = type;
      state.activity.component = JSON.parse(JSON.stringify(component));
      state.activity.isLocked = component.isLocked;
    },
    updateComponent(state: any, component: any) {
      state.components.splice(component.index, 1, JSON.parse(JSON.stringify(component)));
    }
  }
  // modules: {
  //   activeElement,
  //   canvas,
  //   components,
  //   mouseStatus
  // }
});
