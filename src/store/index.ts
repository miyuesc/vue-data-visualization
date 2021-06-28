import { createStore } from 'vuex';
import { objectDeepClone, uuid } from '@/utils/commonUtils';
import defaultConfig from '@/assets/components/defaultConfig';
import type { AcFlagType, StoreState } from '@/types/store';
import type { Component, ComponentConfig, Position, Size } from '@/types/component';

// 设置当前激活组件
function setAcComponent(state: StoreState, index: number) {
  state.acFlag.isMoving = false;
  state.acFlag.indicatorVisible = true;
  state.acFlag.acIndex = index;
  state.acComponent = state.components[index];
}

// 设置组件默认状态
function presetComponent(component: Component) {
  for (const key of component.config) {
    component[key] = {};
    objectDeepClone(component[key], (defaultConfig as any)[key]);
  }
}

// 初始化 Store.State 状态
const state: StoreState = {
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
    overviewPadVisible: false,
    defaultComponentSize: {
      width: 400,
      height: 260
    }
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
};

// 组件状态更新
const componentStateChange = {
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
  // 设置激活组件
  setActivated(state: StoreState, { type, component, index }: { component: string; type: AcFlagType; index: number }) {
    state.acFlag.type = type;
    if (!component) {
      state.acFlag.indicatorVisible = false;
      state.acFlag.acIndex = -1;
      state.acComponent = null;
    } else {
      setAcComponent(state, index);
    }
  },
  // 设置移动状态
  setMoving(state: StoreState, { status }: { status: boolean }) {
    if (!state.acComponent || !state.acComponent.isLocked) {
      state.acFlag.isMoving = status;
    }
  },
  // 更新图表：key: 配置项的 key
  updateComponent(state: StoreState, { newState, key }: { newState: any; key: ComponentConfig }) {
    if (!state.acComponent) return;
    if (typeof newState !== 'object') {
      state.acComponent[key] = newState;
    } else {
      !state.acComponent[key] && (state.acComponent[key] = {});
      objectDeepClone(state.acComponent[key], newState);
    }
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
  // 移动元素层级
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
  }
};
// 组件列表等相关操作记录
const componentsListMutations = {
  // 复制一个组件基础状态
  setCopiedComponent(state: StoreState, compo: any) {
    state.copiedComponent = JSON.stringify(compo);
  },
  // 拖拽时创建一个组件基础状态
  setDraggedComponent(state: StoreState, { component, config }: any) {
    state.draggedComponent = JSON.stringify(component);
    objectDeepClone(state.draggedConfig, config);
  },
  // 移除组件
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
  }
};
// 画布等组件状态调整
const canvasStateChange = {
  // 画布相关
  updateCanvas(state: StoreState, newState: Component) {
    objectDeepClone(state.canvas, newState);
  },
  // 图层预览组件显示状态
  changeOverviewPadVisible(state: StoreState) {
    state.editorConfig.overviewPadVisible = !state.editorConfig.overviewPadVisible;
  }
};

export default createStore<StoreState>({
  state,
  mutations: {
    ...componentStateChange,
    ...canvasStateChange,
    ...componentsListMutations
  }
});
