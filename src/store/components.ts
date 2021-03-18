/* 被选中的组件状态缓存 */
import { ChartComponent, ChartComponents } from '@/types/components';

const components = {
  namespaced: true,
  state: () => ({
    components: [],
    draggingComponent: ''
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
