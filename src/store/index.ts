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
      id: "bg",
      resizable: false, // 是否准备缩放
      movable: false, // 是否移动 => 是否显示指示线
      isLocked: false, // 是否锁定
      config: {} // 保存选中的组件的配置
    },
    // 鼠标状态
    mouse: {
      down: {
        x: 0, // event.target.parentNode.offsetLeft 鼠标所在元素 距离父元素左侧 的距离
        y: 0, // event.target.parentNode.offsetTop 鼠标所在元素 距离父元素上侧 的距离
        clientX: 0, // event.clientX 鼠标处于屏幕的横向位置
        clientY: 0  // event.clientY  鼠标处于屏幕的纵向位置
      },
      client: {
        width: 0,
        height: 0
      },
      type: "create", // create, drag, background
    },
    // 复制的组件
    copiedComponent: null
  }),
  modules: {
    activeElement,
    canvas,
    components,
    mouseStatus
  }
});
