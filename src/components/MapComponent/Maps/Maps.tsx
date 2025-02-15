import { useState, useEffect } from "react";
import { GeoObject, Map, YMaps, Placemark } from "@pbe/react-yandex-maps";
import { fetchData } from "../../../api";
import "./Maps.css";
import { Chart } from "../../Chart";
import { TResponseData, TRouteList } from "./Maps.type";

export const Maps = () => {
  const [routeList, setRouteList] = useState<TRouteList>();
  const [placemark, setPlacemark] = useState<number[]>([]);
  const mapState = {
    center: [53.56841278076172, 49.547794342041016],
    zoom: 8,
  };

  useEffect(() => {
    const getRouteList = async () => {
      try {
        const response = await fetchData();
        if (response) {
          const data: TResponseData = await response.json();
          const routeData = Object.values(data).flat()[0];
          const latlon: number[][] = [];
          const labels: string[] = [];
          routeData.route.forEach((elem) => {
            latlon.push([elem.lat, elem.lng]);
            labels.push(elem.datetime.slice(0, 10));
          });
          setRouteList({ route: routeData.route, latlon, labels });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!routeList) getRouteList();
  }, [routeList]);

  return (
    <YMaps
      query={{
        lang: "ru_RU",
        apikey: "9e4b0962-7277-4997-953a-f11dcdfae43b",
        coordorder: "longlat",
      }}
    >
      <div className="mapContainer">
        <Map
          state={
            placemark.length === 0
              ? mapState
              : {
                  center: placemark,
                  zoom: 9,
                }
          }
          options={{
            maxAnimationZoomDifference: Infinity,
            avoidFractionalZoom: true,
          }}
          className="map"
        >
          {routeList?.latlon && (
            <GeoObject
              geometry={{
                type: "LineString",
                coordinates: routeList.latlon,
              }}
            />
          )}
          {placemark.length > 0 && (
            <Placemark
              geometry={placemark}
              options={{
                iconLayout: `default#image`,
              }}
            />
          )}
          {routeList?.route && (
            <Chart routeList={routeList} setPlacemark={setPlacemark} />
          )}
        </Map>
      </div>
    </YMaps>
  );
};
