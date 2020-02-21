import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, GoogleApiWrapper, Polygon } from "google-maps-react";
import TestFile from "./geo/Copy";
import ScriptTag from "react-script-tag";




class App extends React.Component {
  
  render() {
  
    const mapStyles = {
      width: "100%",
      height: "100%"
    };
    
    const triangleCoords = [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.19 }
    ];

    return (
      <div id="map">
        <Map
          google={this.props.google}
          zoom={7.3}
          style={mapStyles}
          disableDefaultUI={true}
          mapType={"satellite"}
          initialCenter={{ lat: 42.8182876, lng: -75.9917835 }}
        >
          {/* {displayPolygons} */}
          <Polygon
            // key={feature.properties.OBJECTID_1}
            paths={triangleCoords}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#0000FF"
            fillOpacity={0.35}
          />
        </Map>
      </div>
    );
  }
}

// export default App
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY
})(App);


    // CODE FOR TRANSFORMING GeoJSON data into format usable by Google Maps API
    // 
    // let TestFileHelped = TestFile.features.map(feature => {
    //   let coordinatesArray = feature.geometry.coordinates.map(
    //     polygon => {
    //       let latLongArray = polygon.map(pair => {
    //         return {
    //           lat: pair[0],
    //           lng: pair[1]
    //         };
    //       });
    //       return latLongArray;
    //     }
    //   );
    //   // console.log("coordinatesArray", coordinatesArray);
    //   // console.log("feature", feature);
    //   let returnItem = {
    //     ...feature,
    //     geometry: {
    //       ...feature.geometry,
    //       coordinates: coordinatesArray
    //     }
    //   };
    //   return returnItem;
    // });
