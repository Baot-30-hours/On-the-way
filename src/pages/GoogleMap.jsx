// import React, { useState, useRef } from 'react'
// import { GoogleMap, useJsApiLoader, StandaloneSearchBox, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '800px',
//   height: '400px'
// };

// // const center = {
// //   lat: -3.745,
// //   lng: -38.523
// // };

// let markerArray = [];

// function MyComponent() {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyBtUSAW7ssnBNngTj4Q7X076cyRoCHtd94"
//   })

//   const [map, setMap] = useState(null)
//   const [currentLocation, setCurrentLocation] = useState({ lat: -3.745, lng: -38.523 })
//   const [markers, setMarks] = useState([])
//   const [bounds, setBounds] = useState(null)
//   const searchBox = useRef(null);

//   const onLoad = React.useCallback(function callback(map) {
//     setBounds(new window.google.maps.LatLngBounds(currentLocation));
//     map.fitBounds(bounds);
//     setMap(map)
//     navigator.geolocation.getCurrentPosition(function (position) {
//       setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
//     });
//     //     navigator.geolocation.getCurrentPosition(function(position){
//     // });
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null)
//   }, [])

//   const onSBLoad = ref => {
//     searchBox = ref;
//   };

//   const onPlacesChanged = () => {
//     markerArray = [];
//     let results = searchBox.getPlaces();
//     for (let i = 0; i < results.length; i++) {
//       let place = results[i].geometry.location;
//       markerArray.push(place);
//     }
//     setMarks({ markers: markerArray });
//     console.log(markerArray);
//   };

//   return isLoaded ? (
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={currentLocation}
//         zoom={10}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//       >
//         { /* Child components, such as markers, info windows, etc. */}
//       </GoogleMap>
//   ) : <></>
// }

// export default React.memo(MyComponent)

/*global google*/
import React, { useState } from "react";
import '../css/GoogleMap.css';

import { GoogleMap, StandaloneSearchBox, Marker, withScriptjs, withGoogleMap } from "@react-google-maps/api";

let markerArray = [];
const Map = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 })
  //const [markers, setMarkers] = useState(null)
  const [marker, setMarker] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [searchBox, setSearchBox] = useState(null)
  const [mapZoom, setMapZoom] = useState(17)
  const [isMarkerShown, setIsMarkerShown] = useState(false)

  const onMapLoad = map => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setCurrentLocation(pos);
      }
    );
    google.maps.event.addListener(map, "bounds_changed", () => {
      console.log(map.getBounds());
      setBounds(map.getBounds());
    });
  };

  const onSBLoad = ref => {
    setSearchBox(ref);
    console.log('ref', ref);
  };

  const onPlacesChanged = () => {
  
    let results = searchBox.getPlaces();
    for (let i = 0; i < results.length; i++) {
      let place = results[i].geometry.location;
      setCurrentLocation(place);
      setMapZoom(19);
      // setMarkers([...markers, place]);
      setMarker(place);
    }
  };

  // delayedShowMarker = () => {
  //   setTimeout(() => {
  //     setIsMarkerShown(true)
  //   }, 3000)
  // }

  // const handleMarkerClick = () => {
  //   setIsMarkerShown(false);
  //   //delayedShowMarker()
  // };

  return (
    <div className="map-wrapper">
      <div id="searchbox">
        <StandaloneSearchBox
          onLoad={onSBLoad}
          onPlacesChanged={onPlacesChanged}
          bounds={bounds}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
          />
        </StandaloneSearchBox>
      </div>
      <br />
      <div>
        <GoogleMap
          center={currentLocation}
          zoom={mapZoom}
          onLoad={map => onMapLoad(map)}
          // onMarkerClick={this.handleMarkerClick}
          mapContainerStyle={{ height: "400px", width: "800px" }}
        >
          {/* {markers.map((mark, index) => (
            <Marker key={index} position={mark} 
            // onClick={props.onMarkerClick}
            />
          ))} */}

       
           {marker &&  <Marker position={marker} />} 
        
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;

// 1. בחירת נקודה בעת יצירת התראה - רותם
// 2. חיפוש על גבי המפה - סהר

// 3. הצגת התראות לפי איזורים על גבי המפה
// 4. הצגת התראות אחרונות בעמוד הבית