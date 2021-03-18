import { Size, Position } from "@/types/activeElement";

export interface ChartComponent {
  position: Position;
  size: Size;
  id: string | number;
  index: number;
  zIndex: number;
  visible: boolean;
  movable: boolean;
  resizable: boolean;
  componentInfo: string | null;
}

export interface ChartComponents {
  components: Array<ChartComponent>;
}
