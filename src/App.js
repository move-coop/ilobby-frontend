import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, GoogleApiWrapper, Polygon } from "google-maps-react";
import TestFile from "./geo/Copy";
import ScriptTag from "react-script-tag";



class App extends React.Component {
  
  

  render() {
             console.log(TestFile);
             // let file = TestFile
             // debugger

             const mapStyles = {
               width: "100%",
               height: "100%"
             };

             let TestFileHelped = TestFile.features.map(feature => {
               let coordinatesArray = feature.geometry.coordinates.map(
                 polygon => {
                   let latLongArray = polygon.map(pair => {
                     return {
                       lat: pair[0],
                       lng: pair[1]
                     };
                   });
                   return latLongArray;
                 }
               );
               // console.log("coordinatesArray", coordinatesArray);
               // console.log("feature", feature);
               let returnItem = {
                 ...feature,
                 geometry: {
                   ...feature.geometry,
                   coordinates: coordinatesArray
                 }
               };
               return returnItem;
             });

             console.log("TestFileHelped", TestFileHelped);

             let displayPolygons = TestFileHelped.map(feature => {
               console.log("f.g.c[0]", feature.geometry.coordinates[0])
              //  <Polygon
              //    // key={feature.properties.OBJECTID_1}
              //    paths={feature.geometry.coordinates[0]}
              //    strokeColor="#0000FF"
              //    strokeOpacity={0.8}
              //    strokeWeight={2}
              //    fillColor="#0000FF"
              //    fillOpacity={0.35}
              //  />
             });

             const triangleCoords = [
               { lat: 25.774, lng: -80.19 },
               { lat: 18.466, lng: -66.118 },
               { lat: 32.321, lng: -64.757 },
               { lat: 25.774, lng: -80.19 }
             ];



             return (
               <div id="map">
                 {/* <ScriptTag
          async 
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAsUKKbrwuqsyRf5nnolIO87PxRcXPsqjQ&callback=initMap`}>

        />  */}

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
  apiKey: "AIzaSyAsUKKbrwuqsyRf5nnolIO87PxRcXPsqjQ"
})(App);
