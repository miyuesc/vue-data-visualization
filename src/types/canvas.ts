export interface Canvas {
  scale: number;
  size: {
    width: number;
    height: number;
  };
  background: {
    color: string;
    opacity: number;
    image: string | undefined;
  };
}
