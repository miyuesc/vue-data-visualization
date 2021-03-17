interface MouseDownCoordinator {
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
}

const mouseStatus = {
  namespaced: true,
  state: () => ({
    mouseDownCoordinator: {
      x: 0,
      y: 0,
      offsetX: 0,
      offsetY: 0
    }
  }),
  mutations: {
    // update mouse down coordinator
    updateMDC(state: { mouseDownCoordinator: MouseDownCoordinator }, mdc: MouseDownCoordinator) {
      state.mouseDownCoordinator.x = mdc.x;
      state.mouseDownCoordinator.y = mdc.y;
      state.mouseDownCoordinator.offsetX = mdc.offsetX;
      state.mouseDownCoordinator.offsetY = mdc.offsetY;
    }
  }
};

export default mouseStatus;
