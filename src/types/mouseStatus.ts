export interface MouseDownCoordinator {
  x: number;
  y: number;
  width: number;
  height: number;
  mouseX: number;
  mouseY: number;
}

export type MouseActiveType = "move" | "resize" | "create" | null;

export type ActivePoint = "tl" | "tc" | "tr" | "ml" | "mr" | "bl" | "bc" | "br" | null;

export interface MouseStatus {
  mouseDownCoordinator: MouseDownCoordinator;
  mouseActiveType: MouseActiveType;
  activePoint: ActivePoint;
}
