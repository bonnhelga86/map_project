type TParking = {
  dtime_start: string;
  duration: number;
  lat: number;
  lng: number;
  ptype: number;
};

type TRoute = {
  datetime: string;
  lat: number;
  lng: number;
  speed: number;
  reserve: {
    alt: number;
    direction: number;
    fuel1: number;
    ignition: number;
    speed: number;
    voltage: number;
  };
};

export type TObject = {
  parking: TParking[];
  refuels: [];
  route: TRoute[];
};

export type TResponseData = {
  [key: string]: TObject[];
};

export type TRouteList = {
  route: TRoute[];
  latlon: number[][];
  labels: string[];
};
