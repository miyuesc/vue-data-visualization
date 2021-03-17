import { ActiveElement, Position, Size } from "@/types/activeElement";

interface ActiveElementState {

}

const activeElement = {
  namespaced: true,
  state: () => ({
    position: { left: 0, top: 0 }, // 位置
    size: { width: 0, height: 0 }, // 大小
    id: "",
    index: -1,
    visible: false, // 显示状态
    resizable: false, // 是否准备缩放
    movable: false // 是否移动 => 是否显示指示线
  }),
  mutations: {
    updateAll(state: ActiveElement, newState: ActiveElement) {
      state.position = { ...newState.position }; // position and size
      state.size = { ...newState.size };
      state.visible = newState.visible;
      state.movable = newState.movable;
      state.resizable = newState.resizable;
      state.id = newState.id;
      state.index = newState.index;
    },
    updatePAS(state: ActiveElement, { position, size }: { position: Position, size: Size }) {
      state.position = { ...position }; // position and size
      state.size = { ...size };
    },
    updatePosition(state: ActiveElement, newPosition: Position) {
      state.position = { ...newPosition };
    },
    updateSize(state: ActiveElement, newSize: Size) {
      state.size = { ...newSize };
    },
    updateVisible(state: ActiveElement, visible: boolean) {
      state.visible = visible;
    },
    updateMovable(state: ActiveElement, movable: boolean) {
      state.movable = movable;
    },
    updateResizable(state: ActiveElement, resizable: boolean) {
      state.resizable = resizable;
    },
    updateBase(state: ActiveElement, { id, index }: { id: string, index: number }) {
      state.id = id;
      state.index = index;
    }
  }
}
