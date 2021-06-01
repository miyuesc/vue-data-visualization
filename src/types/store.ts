import { Canvas } from '@/types/canvas';
import { Component, Size } from '@/types/component';

export type AcFlagType = 'background' | 'component';

export interface AcFlag {
  type: AcFlagType;
  acIndex: number;
  isMoving: boolean;
  indicatorVisible: boolean;
}

export interface EditorConfig {
  overviewPadVisible: boolean;
  defaultComponentSize: Size;
}

export interface StoreState {
  canvas: Canvas;
  editorConfig: EditorConfig;
  components: Component[];
  componentsTotal: number;
  // 激活组件
  acFlag: AcFlag;
  acComponent: Component | null;
  // 复制的组件
  copiedComponent: string | null | undefined; // json 字符串
  copiedConfig: { [key: string]: number | string | boolean };
  // 拖拽的组件
  draggedComponent: string | null | undefined; // json 字符串
  draggedConfig: { [key: string]: number | string | boolean };
}
