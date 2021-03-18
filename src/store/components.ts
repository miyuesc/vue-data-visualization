/* 被选中的组件状态缓存 */
import { ChartComponent, ChartComponents } from "@/types/components";

const components = {
  namespaced: true,
  state: () => ({
    components: [
      {
        id: "test-123",
        position: { left: 243, top: 123 },
        size: { width: 367, height: 635 },
        index: 0,
        zIndex: 1,
        visible: false, // 显示状态
        movable: false,
        resizable: false,
        componentInfo: null
      },
      {
        id: "test-1231",
        position: { left: 435, top: 657 },
        size: { width: 787, height: 253 },
        index: 1,
        zIndex: 2,
        visible: false, // 显示状态
        movable: false,
        resizable: false,
        componentInfo: null
      }
    ],
    draggingComponent: ""
  }),
  mutations: {
    add(state: ChartComponents, newComponent: ChartComponent) {
      state.components.push(JSON.parse(JSON.stringify(newComponent)));
    },
    update(state: ChartComponents, { component, index }: { component: ChartComponent; index: number }) {
      state.components.splice(index, 1, JSON.parse(JSON.stringify(component)));
    },
    delete(state: ChartComponents, index: number) {
      state.components.splice(index, 1);
    },
    dragging(state: any, componentInfo: string) {
      state.draggingComponent = componentInfo;
    }
  }
};

export default components;
