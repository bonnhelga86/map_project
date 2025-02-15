import { Maps } from "./Maps/Maps";
import { MapMenu } from "./MapMenu";
import "./MapComponent.css";

export const MapComponent = () => {
  return (
    <div className="mapContainer">
      <MapMenu />
      <Maps />
    </div>
  );
};
