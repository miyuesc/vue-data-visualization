import { Canvas } from "@/types/canvas";

const canvas = {
  namespaced: true,
  state: () => ({
    scale: 0.8
  }),
  mutations: {
    updateScale(state: Canvas, scale: number) {
      state.scale = scale;
    }
  }
};

export default canvas;
