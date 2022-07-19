import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { center } from "../components/mainPage";

export default function googleMap() {
  return (
    <GoogleMap zoom={10} center={center}>
      <Marker position={center} />
    </GoogleMap>
  );
}
