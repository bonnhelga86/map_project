import { TRouteList } from "../MapComponent/Maps/Maps.type";

export type TChartProps = {
  routeList: TRouteList;
  setPlacemark: React.Dispatch<React.SetStateAction<number[]>>;
};

export type TChartState = {
  alt: boolean;
  direction: boolean;
  fuel1: boolean;
  ignition: boolean;
  speed: boolean;
  voltage: boolean;
};

export type TChartDict = {
  [key: string]: number[];
};

export type TChartColors = {
  [key: string]: string;
};
