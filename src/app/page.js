"use client";

import { useState } from "react";

import { Polyline } from "@/components/polyline";

import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";

// import styles from "./page.module.css";

const Coords = (lat, lng) => {
  return { lat, lng };
};

const flightPlanCoordinates = [
  Coords(36.044214, -115.053694),
  Coords(36.04793050876601, -115.05409838558803),
];

const Button = () => {
  const map = useMap();

  const onButtonClick = () => {
    map.setZoom(17);
    map.setCenter({ lat: 36.046253, lng: -115.053397 });
  };

  return <button onClick={onButtonClick}>Center</button>;
};

const HOCPolyline = ({ onClick }) => {
  const handler = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    return { lat, lng };
  };

  return (
    <Polyline
      path={flightPlanCoordinates}
      color="black"
      strokeWeight={8}
      strokeOpacity={0.5}
      onClick={(event) => {
        onClick(handler(event));
      }}
    />
  );
};

export default function Home() {
  const [coords, setCoords] = useState(Coords(null, null));

  const setCoordsHandler = ({ lat, lng }) => {
    setCoords(() => {
      return { lat, lng };
    });
  };

  return (
    <div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: "1000px", height: "500px" }}
          defaultCenter={{ lat: 36.046253, lng: -115.053397 }}
          mapId="DEMO_MAP_ID"
          mapTypeId="satellite"
          tilt={0}
          defaultZoom={16}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <HOCPolyline onClick={setCoordsHandler} />
        </Map>
        <Button />
      </APIProvider>
      <div>
        {coords.lat}, {coords.lng}
      </div>
    </div>
  );
}
