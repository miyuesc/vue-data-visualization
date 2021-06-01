import { createStore } from 'vuex';
import { objectDeepClone, uuid } from '@/utils/commonUtils';
import defaultConfig from '@/assets/components/defaultConfig';
import { AcFlagType, StoreState } from '@/types/store';
import type { Component, ComponentConfig, Position, Size } from '@/types/component';

function setAcComponent(state: StoreState, index: number) {
  state.acFlag.isMoving = false;
  state.acFlag.indicatorVisible = true;
  state.acFlag.acIndex = index;
  state.acComponent = state.components[index];
}

function presetComponent(component: Component) {
  for (const key of component.config) {
    component[key] = {};
    objectDeepClone(component[key], (defaultConfig as any)[key]);
  }
}

// const defaultComponentState = {
//   size: { width: 400, height: 260 },
//   position: { left: 700, top: 400 },
//   isLocked: false, // 是否锁定
//   id: 0,
//   index: "",
//   zIndex: 1,
// }

export default createStore<StoreState>({
  state: {
    // 画布
    canvas: {
      size: {
        width: 1920,
        height: 1080
      },
      scale: 0.8,
      background: {
        color: '',
        opacity: 1,
        image: ''
      }
    },
    // 页面控制
    editorConfig: {
      overviewPadVisible: false
    },
    // 组件列表
    components: [],
    componentsTotal: 0,
    // 激活组件
    acFlag: {
      type: 'background',
      acIndex: 0, // zIndex映射，当前选中的组件
      isMoving: false, // 是否移动中 => 是否显示指示线
      indicatorVisible: false
    },
    acComponent: null,
    // 复制的组件
    copiedComponent: '',
    copiedConfig: {},
    // 拖拽的组件
    draggedComponent: '',
    draggedConfig: {}
  },
  mutations: {
    setActivated(
      state: StoreState,
      { type, component, index }: { component: string; type: AcFlagType; index: number }
    ) {
      state.acFlag.type = type;
      if (!component) {
        state.acFlag.indicatorVisible = false;
        state.acFlag.acIndex = -1;
        state.acComponent = null;
      } else {
        setAcComponent(state, index);
      }
    },
    setMoving(state: StoreState, { status }: { status: boolean }) {
      if (!state.acComponent || !state.acComponent.isLocked) {
        state.acFlag.isMoving = status;
      }
    },
    setCopiedComponent(state: StoreState, compo: any) {
      state.copiedComponent = JSON.stringify(compo);
    },
    setDraggedComponent(state: StoreState, { component, config }: any) {
      state.draggedComponent = JSON.stringify(component);
      objectDeepClone(state.draggedConfig, config);
    },
    // 创建新图表
    createComponent(
      state: StoreState,
      { component, position, size }: { component: string; position: Position; size: Size }
    ) {
      const newCompo = {
        ...JSON.parse(component),
        position: { ...position },
        size: { ...size },
        id: uuid(16)
      };
      // 合成 默认初始数据
      presetComponent(newCompo);
      state.components.push(newCompo);
      state.acFlag.type = 'component';
      setAcComponent(state, state.components.length - 1);
    },
    // 更新图表：key: 配置项的 key
    updateComponent(state: StoreState, { newState, key }: { newState: any; key: ComponentConfig }) {
      if (!state.acComponent) return;
      !state.acComponent[key] && (state.acComponent[key] = {});
      objectDeepClone(state.acComponent[key], newState);
    },
    // 更新元素 位置与大小
    updateComponentPAS(state: StoreState, newState: Component) {
      if (!state.acComponent) return;
      objectDeepClone(state.acComponent.position, newState.position);
      objectDeepClone(state.acComponent.size, newState.size);
    },
    // 更新元素 所有属性
    updateComponentAll(state: StoreState, { detail }: { detail: Component }) {
      if (!state.acComponent) return;
      objectDeepClone(state.acComponent, detail);
    },
    // a: activated, t: target
    swapComponent(state: StoreState, type: string) {
      // 浅拷贝复制目标元素, 避免改变元素组长度
      const comp = state.components.slice(state.acFlag.acIndex, state.acFlag.acIndex + 1)[0];
      const index = state.acFlag.acIndex;
      if (type === 'lowest') {
        state.components.splice(index, 1);
        state.components.unshift(comp);
        setAcComponent(state, 0);
      }
      if (type === 'highest') {
        state.components.splice(index, 1);
        state.components.push(comp);
        setAcComponent(state, state.components.length - 1);
      }
      if (type === 'down') {
        if (index > 0) {
          // 非底层元素
          state.components.splice(index, 1); // 删除
          state.components.splice(index - 1, 0, comp);
          setAcComponent(state, index - 1);
        }
      }
      if (type === 'up') {
        if (index < state.components.length - 1) {
          // 非顶层元素
          state.components.splice(index, 1);
          state.components.splice(index + 1, 0, comp);
          setAcComponent(state, index + 1);
        }
      }
    },
    removeComponent(state: StoreState) {
      state.components.splice(state.acFlag.acIndex, 1);
      if (state.components.length) {
        setAcComponent(state, state.components.length - 1);
      } else {
        state.acFlag.type = 'background';
        state.acFlag.indicatorVisible = false;
        state.acFlag.acIndex = -1;
        state.acComponent = null;
      }
    },
    // 画布相关
    updateCanvas(state: StoreState, newState: Component) {
      objectDeepClone(state.canvas, newState);
    },
    changeOverviewPadVisible(state: StoreState) {
      state.editorConfig.overviewPadVisible = !state.editorConfig.overviewPadVisible;
    }
  }
});
