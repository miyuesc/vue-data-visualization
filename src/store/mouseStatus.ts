import { ActivePoint, MouseActiveType, MouseDownCoordinator, MouseStatus } from "@/types/mouseStatus";

const mouseStatus = {
  namespaced: true,
  state: (): MouseStatus => ({
    mouseDownCoordinator: {
      x: 0, // event.target.parentNode.offsetLeft 鼠标所在元素 距离父元素左侧 的距离
      y: 0, // event.target.parentNode.offsetTop 鼠标所在元素 距离父元素上侧 的距离
      width: 0, // event.target.parentNode.clientWidth 鼠标所在元素 的标记元素 的宽度
      height: 0, // event.target.parentNode.clientHeight 鼠标所在元素 的标记元素 的高度
      mouseX: 0, // event.clientX 鼠标处于屏幕的横向位置
      mouseY: 0 // event.clientY  鼠标处于屏幕的纵向位置
    },
    mouseActiveType: null,
    activePoint: null
  }),
  mutations: {
    // update mouse down coordinator
    updateMDC(state: MouseStatus, mdc: MouseDownCoordinator) {
      state.mouseDownCoordinator.x = mdc.x;
      state.mouseDownCoordinator.y = mdc.y;
      state.mouseDownCoordinator.width = mdc.width;
      state.mouseDownCoordinator.height = mdc.height;
      state.mouseDownCoordinator.mouseX = mdc.mouseX;
      state.mouseDownCoordinator.mouseY = mdc.mouseY;
    },
    updateMAT(state: MouseStatus, type: MouseActiveType) {
      state.mouseActiveType = type;
    },
    updateActivePoint(state: MouseStatus, point: ActivePoint) {
      state.activePoint = point;
    }
  }
};

export default mouseStatus;
