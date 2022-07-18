import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

interface isLoadedInterface{
  googleMapsApiKey:any
}

export default function googleMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAIJx9hwjxcmt2-VjyW5MCxwPqlVvTW51w",
  });

  if (!isLoaded) return (<div>Loading...
    <h1>Not Loaded</h1>
  </div>)

  return (<>
    <Map />
    <h1>Debug</h1>
  
    </>);
}

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <GoogleMap zoom={10} center={center}>
      <Marker position={center} />
    </GoogleMap>
  );
}