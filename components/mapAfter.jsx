import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from "@react-google-maps/api";

var json = '{"name": "Peter", "age": 22, "country": "United States"}';

// Converting JSON-encoded string to JS object
var obj = JSON.parse(json);

const containerStyle = {
    width: '1100px',
    height: '700px'
  };

var center = {
lat: 48.85,
lng: 2.35
};

const NFT_1 = [
  {
    id: 1,
    name: "Danilo",
    position: { lat: 48.84, lng:2.35 }
  },
  {
    id: 2,
    name: "Yan",
    position: { lat: 48.85, lng: 2.33 }
  },
  {
    id: 3,
    name: "Brandon",
    position: { lat: 48.8427, lng: 2.345 }
  },
  {
    id: 4,
    name: "Henri",
    position: { lat: 48.8531, lng: 2.34 }
  }
];

function Map() {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
/***
  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    NFT_1.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  }; */

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAIJx9hwjxcmt2-VjyW5MCxwPqlVvTW51w"
  })
  const [map, setMap] = React.useState(null)
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    NFT_1.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
    onLoad={onLoad}
    onUnmount={onUnmount}
      onClick={ev => {
        console.log("latitide = ", ev.latLng.lat());
        console.log("longitude = ", ev.latLng.lng());
        () => setActiveMarker(null)}}
      mapContainerStyle={containerStyle}
      center={center}
    >
      {NFT_1.map(({ id, name, position }) => (
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  ):<></>
}

export default Map;
