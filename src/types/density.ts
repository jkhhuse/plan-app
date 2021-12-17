export interface Density {
  uuid?: string;
  personUuid?: string;
  measureTime: string;
  measureValue: number;
}

export type DensityList = Density[];

export interface ChartType {
  date: string;
  value: number;
}

export interface PieType {
  name: string;
  value: number;
}

export type PieTypeRender = PieType & {
  const: string;
};
