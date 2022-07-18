import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1100px',
  height: '700px'
};

var center = {
  lat: 48.85,
  lng: 2.35
};

var position ={
    lat:m,
    lng:null
}

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAIJx9hwjxcmt2-VjyW5MCxwPqlVvTW51w"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={ev => {
            console.log("latitide = ", ev.latLng.lat());
            console.log("longitude = ", ev.latLng.lng());
            //position.lat=ev.latLng.lat();
            //position.lng=ev.latLng.lng();
            //position.lat=48.85;
            //position.lng=2.35;
          }}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <><Marker
      position={position}
    /></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)
