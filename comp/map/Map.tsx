import React from "react";
import Marker from "./Marker";
import useMap from "./useMap";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";

export default function Map({
  address,
  osm,
  bounds,
  style,
}: {
  address: any;
  osm?: any;
  bounds?: any;
  style: any;
}) {
  const { center, attribute, url } = useMap({ address });
  return (
    <div className={style.map}>
      <MapContainer
        className={style.mapContainer}
        center={center}
        zoom={14}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution={osm?.attribute || attribute}
          url={osm?.url || url}
        />
        {bounds && (
          <Polygon pathOptions={{ color: "blue" }} positions={bounds} />
        )}
        <Marker position={center} />
      </MapContainer>
    </div>
  );
}
