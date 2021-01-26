import firebase from "firebase";
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import WelcomeContainer from './Containers/WelcomeContainer'
import LoggedInContainer from './Containers/LoggedInContainer'
import { connect } from 'react-redux'
import WelcomeModal from './Components/WelcomeModal';

const autoLoginEndpoint = `${process.env.REACT_APP_ILOBBY_API}/auto_login`

class App extends React.Component {
  componentDidMount() {}

  initApp = () => {
    const setUser = this.props.setUser;
    const logout = this.props.logout;

    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          user.getIdToken().then(function (accessToken) {
            localStorage.token = accessToken;
            setUser(user);
          });
        } else {
          logout();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // testForLogin = () => {
  //   // if we are logged in, render LoggedInContainer
  //   // if we are not logged in, render the WelcomeContainer

  //   if (this.props.currentUser) {
  //     console.log("(A) we've got a current user");
  //     return <LoggedInContainer />;
  //   } else {
  //     const token = localStorage.token;
  //     if (token && token !== "undefined") {
  //       // if there is a token, see if it is valid for autologin
  //       console.log(
  //         "(B) No current user, but we've got a token! Testing its validity. Token:",
  //         token
  //       );
  //       if (this.checkAutoLoginFirebase(token)) {
  //         return <LoggedInContainer />;
  //       } else {
  //         return <WelcomeContainer />;
  //       }
  //     } else {
  //       console.log("(C) No current user & no token");
  //       return <WelcomeContainer />;
  //     }
  //   }
  // };

  // autoLoginFirebase = () => {
  //   // returns the component corresponding to autologin success or failure
  //   // fetch(autoLoginEndpoint, {
  //   //   headers: {
  //   //     Authorization: token,
  //   //   },
  //   // })
  //   //   .then((resp) => resp.json())
  //   //   .then((json) => {
  //   //     if (json.errors) {
  //   //       console.log("Autologin Error");
  //   //       alert(json.errors);
  //   //       return false;
  //   //     } else {
  //   //       console.log("Autologin Success", json);
  //   //       this.props.setUser(json);
  //   //       return true;
  //   //     }
  //   //   });
  //   var user = firebase.auth().currentUser;

  //   if (user) {
  //     // User is signed in.
  //     return <LoggedInContainer />
  //   } else {
  //     // No user is signed in.
  //     return <WelcomeContainer />
  //   }

  // };

  // checkAutoLoginFirebase = (token) => {
  //   // returns the component corresponding to autologin success or failure
  //   // fetch(autoLoginEndpoint, {
  //   //   headers: {
  //   //     Authorization: token,
  //   //   },
  //   // })
  //   //   .then((resp) => resp.json())
  //   //   .then((json) => {
  //   //     if (json.errors) {
  //   //       console.log("Autologin Error");
  //   //       alert(json.errors);
  //   //       return false;
  //   //     } else {
  //   //       console.log("Autologin Success", json);
  //   //       this.props.setUser(json);
  //   //       return true;
  //   //     }
  //   //   });
  //   var user = firebase.auth().currentUser;

  //   if (user) {
  //     // User is signed in.
  //     return true
  //   } else {
  //     // No user is signed in.
  //     return false
  //   }

  // };

  // checkAutoLogin = (token) => {
  //   // returns the component corresponding to autologin success or failure
  //   fetch(autoLoginEndpoint, {
  //     headers: {
  //       Authorization: token,
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then((json) => {
  //       if (json.errors) {
  //         console.log("Autologin Error");
  //         alert(json.errors);
  //         return false;
  //       } else {
  //         console.log("Autologin Success", json);
  //         this.props.setUser(json);
  //         return true;
  //       }
  //     });
  // };

  render() {
    this.initApp();
    const token = localStorage.token;

    // use the existance of a token as the determinant of the logged in state
    // under normal circumstances, log in sets the token and logout removes it
    // if the token is removed manually and the page is refreshed, welcome screen will load and then, if the user's session is still valid, the logged in container will load to replace it
    // what happens if there is a token, but the firebase session has ended? That will probably come up when trying to access user data
    return <div>{token && token !== "undefined" ? <LoggedInContainer /> : <WelcomeContainer /> }</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      console.log("App called setUser");
      dispatch({ type: "SET_USER", payload: user });
    },
    logout: () => {
      console.log("App called logout");
      dispatch({ type: "LOGOUT" });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);