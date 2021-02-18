import { useState } from "react";
import { Marker as MapMarker, useMap, useMapEvents } from "react-leaflet";

export default function Marker({
  position,
  onClick,
  pickable,
  children,
}: {
  position: any;
  children?: any;
  pickable?: any;
  onClick?: (arg?: any) => void;
}) {
  const map = useMap();
  const [pos, setpos] = useState<any>(() => position || [18.574137, -72.30987]);

  map.whenReady(() => {
    map.flyTo(pos, map.getZoom());
  });

  const mapEvent = useMapEvents({
    click(e) {
      if (pickable) {
        setpos([e.latlng.lat, e.latlng.lng]);
        mapEvent.flyTo(e.latlng, mapEvent.getZoom());
        onClick && onClick([e.latlng.lng, e.latlng.lat]);
      }
    },
    locationfound(e) {
      mapEvent.flyTo(e.latlng, mapEvent.getZoom());
      if (pickable) {
        setpos([e.latlng.lat, e.latlng.lng]);
        onClick && onClick([e.latlng.lat, e.latlng.lng]);
      }
    },
  });

  return (
    <MapMarker draggable={false} autoPan autoPanSpeed={1000} position={pos}>
      {/* <Popup /> */}
      {children}
    </MapMarker>
  );
}
