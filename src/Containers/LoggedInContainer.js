import React from "react";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import SearchPageContainer from "./SearchPageContainer";
import CampaignPageContainer from "./CampaignPageContainer";
import CallListContainer from "./CallListContainer";
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class LoggedInContainer extends React.Component {

  // componentDidMount() {
  //   console.log("logged in container did mount")
  //   const token = localStorage.token;

  //   if (token && !this.props.currentUser) {
  //     //get user info
  //     this.checkAutoLogin(token)
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
  //       } else {
  //         debugger
  //         this.props.setUser(response)
  //       }
  //     });
  // };


  render() {

    return (
      <div>
        <Route path="/" component={NavBar} />
        <Switch >
          <Route path="/campaigns/calllists/:id" component={CallListContainer} />
          <Route path="/campaigns" component={CampaignPageContainer} />
          <Route path="/" component={SearchPageContainer} />
        </Switch>
        <Footer />

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
    setUser: (json) => {
      console.log("logged in called setUser")
      debugger
      dispatch({ type: "SET_USER", payload: json })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInContainer)