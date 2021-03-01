import firebase from "firebase";
import React from 'react';
import './App.css';
import WelcomeContainer from './Containers/WelcomeContainer'
import LoggedInContainer from './Containers/LoggedInContainer'
import { connect } from 'react-redux'

class App extends React.Component {

  initApp = () => {
    const setUser = this.props.setUser;
    // const logout = this.props.logout;

    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          user.getIdToken(true).then(function (accessToken) {
            localStorage.token = accessToken;
            console.log('app.js setUser')
            setUser(user);
          }).catch(error => alert(error));
        } else {
          console.log('firebase.auth().onAuthStateChanged: there is no user')
          //  logout to ensure state reset to initialState
          this.props.logout();
        }
      },
      (error) => {
        alert(error);
      }
    );
  };


  render() {
    this.initApp();
    const token = localStorage.token;
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