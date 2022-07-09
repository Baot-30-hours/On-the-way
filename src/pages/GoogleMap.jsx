/*global google*/
import React, { useEffect, useState } from "react";
import '../css/GoogleMap.css';

import { GoogleMap, StandaloneSearchBox, Marker, withScriptjs, withGoogleMap, LoadScript } from "@react-google-maps/api";

let markerArray = [];
const lib = ["places"];
const Map = ({ type, handleSearchedLocationChange, detailsLocation }) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 })
  //const [markers, setMarkers] = useState(null)
  const [marker, setMarker] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [searchBox, setSearchBox] = useState(null)
  const [mapZoom, setMapZoom] = useState(17)
  const [isMarkerShown, setIsMarkerShown] = useState(false)

  // const lib = ["places"];
  const id = 'google-map-script';
  const key = "AIzaSyBtUSAW7ssnBNngTj4Q7X076cyRoCHtd94";

  const onMapLoad = map => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setCurrentLocation(pos);
      }
    );
    google.maps.event.addListener(map, "bounds_changed", () => {
      setBounds(map.getBounds());
    });
  };

  const onSBLoad = ref => {
    if (detailsLocation) setSearchBox(detailsLocation);
    else setSearchBox(ref);
  };

  const onPlacesChange = () => {
    if (searchBox) {
      let results = searchBox.getPlaces();
      for (let i = 0; i < results.length; i++) {
        let place = results[i].geometry.location;
        setCurrentLocation(place);
        setMapZoom(19);
        // setMarkers([...markers, place]);
        console.log('on place change');
        setMarker(place);
        if (type === 'createHazard') {
          handleSearchedLocationChange(searchBox.gm_accessors_.places.Rj.formattedPrediction)
        }
      }
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
    <LoadScript googleMapsApiKey={key} libraries={lib} id={id}>
      <div className="map-wrapper">
        <div id="searchbox">
          <StandaloneSearchBox
            onLoad={onSBLoad}
            onPlacesChanged={onPlacesChange}
            bounds={bounds}
          >
            <input
              type="text"
              placeholder="Search location"
            />
          </StandaloneSearchBox>
          <br />
        </div>
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


            {marker && <Marker position={marker} />}

          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
}

export default Map;

// 1. בחירת נקודה בעת יצירת התראה - רותם
// 2. חיפוש על גבי המפה - סהר

// 3. הצגת התראות לפי איזורים על גבי המפה
// 4. הצגת התראות אחרונות בעמוד הבית