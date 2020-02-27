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

  // testForLogin = () => {
  //   const token = localStorage.token;

  //   if (this.props.currentUser) {
  //     console.log("A")
  //     return <LoggedInContainer />
  //   } else {
  //     if (token) {
  //       console.log("token!", token)
  //       this.checkAutoLogin(token)
  //     } else {
        
  //       console.log("C")
  //       return <WelcomeContainer />
  //     }
  //     console.log("D")
  //     return <WelcomeContainer />
  //   }
  // }

  // checkAutoLogin = token => {
  //   fetch("http://localhost:3000/auto_login", {
  //     headers: {
  //       Authorization: token
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(response => {
  //       if (response.errors) {

  //         alert(response.errors);
  //         console.log("B")
          
  //         return <WelcomeContainer />
  //       } else {
  //         this.props.setUser(response)
  //         console.log("B a winner")

  //         return <LoggedInContainer />
  //       }
  //     });
  // };

      
  render() {

    // if we are not logged in, render the WelcomeContainer
    // otherwise, render LoggedInContainer
    return (
      <div>
        {this.props.currentUser ? <LoggedInContainer /> : <WelcomeContainer /> }
        {/* { this.testForLogin() } */}
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
    },
    setUser: (json) => {
      console.log("App called setUser")
      debugger
      dispatch({ type: "SET_USER", payload: json })
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