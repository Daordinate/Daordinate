import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";



export default function googleMap() {




  return (
    <GoogleMap zoom={10} center={center}>
      <Marker position={center} />
    </GoogleMap>
  );
}