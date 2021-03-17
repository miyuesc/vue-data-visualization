export interface Position {
  left: number;
  top: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ActiveElement {
  position: Position;
  size: Size;
  id: string | number;
  index: number;
  visible: boolean;
  movable: boolean;
  resizable: boolean;
  componentInfo: string | null;
}
