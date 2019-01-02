export interface Station {
  id: number;
  name: string;
  coordinate: {
    type: string;
    x: number;
    y: number;
  };
}
