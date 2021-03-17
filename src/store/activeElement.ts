import { Position, Size } from "@/types/activeElement";
import { ChartComponent } from "@/types/components";

const activeElement = {
  namespaced: true,
  state: () => ({
    position: { left: 0, top: 0 }, // 位置
    size: { width: 0, height: 0 }, // 大小
    id: "",
    index: -1,
    visible: false, // 显示状态
    resizable: false, // 是否准备缩放
    movable: false, // 是否移动 => 是否显示指示线
    componentInfo: ""
  }),
  mutations: {
    updateAll(state: ChartComponent, newState: ChartComponent) {
      state.position = { ...newState.position }; // position and size
      state.size = { ...newState.size };
      state.visible = newState.visible;
      state.movable = newState.movable;
      state.resizable = newState.resizable;
      state.id = newState.id;
      state.index = newState.index;
    },
    updatePAS(state: ChartComponent, { position, size }: ChartComponent) {
      state.position = { ...position }; // position and size
      state.size = { ...size };
    },
    updatePosition(state: ChartComponent, newPosition: Position) {
      state.position = { ...newPosition };
    },
    updateSize(state: ChartComponent, newSize: Size) {
      state.size = { ...newSize };
    },
    updateVisible(state: ChartComponent, visible: boolean) {
      state.visible = visible;
    },
    updateMovable(state: ChartComponent, movable: boolean) {
      state.movable = movable;
    },
    updateResizable(state: ChartComponent, resizable: boolean) {
      state.resizable = resizable;
    },
    updateBase(state: ChartComponent, { id, index }: ChartComponent) {
      state.id = id;
      state.index = index;
    }
  }
};

export default activeElement;
