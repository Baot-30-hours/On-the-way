import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, StandaloneSearchBox, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '400px'
};

const center = {
  lat:  -3.745,
  lng: -38.523
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBtUSAW7ssnBNngTj4Q7X076cyRoCHtd94"
  })

  const [map, setMap] = useState(null)
  const [currentLocation, setCurrentLocation] = useState({ lat: -3.745, lng: -38.523 })

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(function (position) {  
//        setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
//     });
// }, [])

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(currentLocation);
    map.fitBounds(bounds);
    setMap(map)
    navigator.geolocation.getCurrentPosition(function (position) {  
        setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
     });
//     navigator.geolocation.getCurrentPosition(function(position){
// });
  }, [])

  
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)