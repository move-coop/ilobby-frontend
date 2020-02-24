import React from 'react';
import logo from './logo.svg';
import './App.css';
import WelcomeContainer from './Containers/WelcomeContainer'
import LoggedInContainer from './Containers/LoggedInContainer'
import { connect } from 'react-redux'

const API = "http://localhost:3000/legislators"

class App extends React.Component {
  
  componentDidMount() {
    console.log("App Did Mount")
    fetch(API)
    .then(res => res.json())
    .then(data => {
      // sort alphabetically
      let legislators = data.sort((a, b) => a.name.localeCompare(b.name))

      this.props.storeLegislators(legislators)}
      )
  }
      
  render() {

    // if we are not logged in, render the WelcomeContainer
    // otherwise, render LoggedInContainer
    return (
      <div>
        {this.props.currentUser ? <LoggedInContainer /> : <WelcomeContainer /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeLegislators: (data) => {
      dispatch({ type: "STORE_LEGISLATORS", payload: data })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


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
