import { FunctionComponent, useEffect, useRef, useState } from "react";
import useEntries from "../lib/useEntries";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGhlcGljb25lcmQiLCJhIjoiY2tpaGtlbWkzMDhhZzJzbnhjbmsybGx6byJ9.ZDL1rc9W6hk71FyyjfFxmw";

const LiveMap: FunctionComponent = () => {
  const [entries, lastUpdate] = useEntries();
  const [lat, setLat] = useState(5);
  const [lng, setLng] = useState(34);
  const [zoom, setZoom] = useState(2);
  const mapContainer = useRef();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom,
    });
  });

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        ref={mapContainer}
      />
    </div>
  );
};

export default LiveMap;
