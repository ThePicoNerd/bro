import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import useEntries from "../lib/useEntries";
import ReactMapGL, { Marker } from "react-map-gl";
import { Entry } from "../lib/entry";
import { transparentize } from "polished";
import { DeckGL, GeoJsonLayer } from "deck.gl";

const Waypoint: FunctionComponent<{ latest?: boolean; entry: Entry }> = ({
  latest = false,
  entry,
}) => {
  const size = latest ? 16 : 12;
  const background = "#4969ed";

  return (
    <Marker
      css={{
        pointerEvents: "none",
        zIndex: latest ? 2 : 1,
      }}
      key={entry.timestamp}
      latitude={entry.lat}
      longitude={entry.lng}
      offsetLeft={-size / 2}
      offsetTop={-size / 2}
    >
      <div
        css={{
          width: size,
          height: size,
          backgroundColor: background,
          border: latest ? "2px solid #ffffff" : "none",
          boxSizing: "border-box",
          borderRadius: "50%",
          position: "relative",
          pointerEvents: "none",
          boxShadow: latest
            ? `0 0 20px 20px ${transparentize(0.5, background)}`
            : `0 0 10px 20px ${transparentize(0.9, background)}`,
        }}
      />
    </Marker>
  );
};

const LiveMap: FunctionComponent = () => {
  const [mapViewport, setMapViewport] = useState<any>({
    latitude: 59.3177841,
    longitude: 18.0605881,
    zoom: 12,
    width: "100%",
    height: "100%",
  });

  const [entries] = useEntries();

  const layers = [
    new GeoJsonLayer({
      id: "route",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: entries?.map(({ lat, lng }) => [lng, lat]),
            },
          },
        ],
      } as any,
      stroked: false,
      filled: false,
      lineWidthMinPixels: 2,
      getLineColor: () => [255, 255, 255],
      getLineWidth: () => 2,
    }),
  ];

  return (
    <div
      css={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      <ReactMapGL
        {...mapViewport}
        mapboxApiAccessToken="pk.eyJ1IjoidGhlcGljb25lcmQiLCJhIjoiY2tpaGtlbWkzMDhhZzJzbnhjbmsybGx6byJ9.ZDL1rc9W6hk71FyyjfFxmw"
        mapStyle="mapbox://styles/thepiconerd/ckiht7gmd355u1ao7y0uv98qj"
        onViewStateChange={(viewport) =>
          setMapViewport({ ...mapViewport, ...viewport })
        }
      >
        {entries?.map((entry, index) => (
          <Waypoint latest={index === 0} key={entry.timestamp} entry={entry} />
        ))}
        <DeckGL {...mapViewport} layers={layers} />
      </ReactMapGL>
    </div>
  );
};

export default LiveMap;
