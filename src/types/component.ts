export interface Position {
  left: number;
  top: number;
}

export interface Size {
  width: number;
  height: number;
}

export type ComponentConfig =
  | 'titleConfig'
  | 'background'
  | 'xAxis'
  | 'yAxis'
  | 'legend'
  | 'lineConfig'
  | 'pieConfig'
  | 'radarConfig'
  | 'treeConfig'
  | 'gaugeConfig'
  | 'funnelConfig'
  | 'graphConfig'
  | 'kConfig';

export type Component = {
  [key in ComponentConfig]: any;
} & {
  id: string;
  position: Position;
  size: Size;
  isLocked: boolean;
  config: ComponentConfig[];
};
