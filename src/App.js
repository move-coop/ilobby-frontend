import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, GoogleApiWrapper, Polygon } from "google-maps-react";
import WelcomeContainer from './Containers/WelcomeContainer'
import LoggedInContainer from './Containers/LoggedInContainer'


class App extends React.Component {
  
  render() {

    return (
      <div>
        
      </div>
    );
  }
}

export default App
// export default GoogleApiWrapper({
//   apiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY
// })(App);

// const mapStateToProps = (state) => {
//   return {
//     exampleMessage: state.exampleState.exampleMessage
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     changeExampleMessage: () => { dispatch(changeExampleMessage()) }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);



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
