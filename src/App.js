import React from 'react';
// import logo from './logo.svg';
import './App.css';
import WelcomeContainer from './Containers/WelcomeContainer'
import LoggedInContainer from './Containers/LoggedInContainer'
import { connect } from 'react-redux'
import WelcomeModal from './Components/WelcomeModal';

const autoLoginEndpoint = `${process.env.REACT_APP_ILOBBY_API}/auto_login`

class App extends React.Component {
  
  componentDidMount() {
    
  }

  testForLogin = () => {
    // if we are logged in, render LoggedInContainer
    // if we are not logged in, render the WelcomeContainer
    
    if (this.props.currentUser) {
      console.log("(A) we've got a current user")
      return <LoggedInContainer />

    } else {
      const token = localStorage.token;
      if (token && token !== "undefined") {
        // if there is a token, see if it is valid for autologin
        console.log("(B) No current user, but we've got a token! Testing its validity. Token:", token)
        if (this.checkAutoLogin(token)) {return <LoggedInContainer />} else {return <WelcomeModal />}

      } else {
        console.log("(C) No current user & no token")
        return <WelcomeContainer />

      }
    }
  }

  checkAutoLogin = token => {
    // returns the component corresponding to autologin success or failure
    fetch(autoLoginEndpoint, {
      headers: {
        Authorization: token
      }
    })
      .then(resp => resp.json())
      .then(json => {
        if (json.errors) {
          console.log("Autologin Error")
          alert(json.errors);
          return false

        } else {
          console.log("Autologin Success", json)
          this.props.setUser(json)
          return true

        }
      });
  };

      
  render() {

    return (
      <div>
        { this.testForLogin() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (json) => {
      console.log("App called setUser")
      dispatch({ type: "SET_USER", payload: json })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);