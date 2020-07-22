import React from "react";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import SearchPageContainer from "./SearchPageContainer";
import CampaignPageContainer from "./CampaignPageContainer";
import CallListContainer from "./CallListContainer";
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const legislatorsEndpoint = `${process.env.REACT_APP_ILOBBY_API}/legislators`
const committeesEndpoint = `${process.env.REACT_APP_ILOBBY_API}/committees`
const userDataEndpoint = `${process.env.REACT_APP_ILOBBY_API}/users`

class LoggedInContainer extends React.Component {

  componentDidMount() {
    console.log("logged in container did mount")

    // GET LEGISLATORS
    fetch(legislatorsEndpoint)
      .then(res => res.json())
      .then(data => {
        // sort alphabetically
        let legislators = data.sort((a, b) => a.name.localeCompare(b.name))

        this.props.storeLegislators(legislators)
        this.props.legislatorDataLoaded()
      })

    // GET COMMITTEES DATA
    fetch(committeesEndpoint)
      .then(res => res.json())
      .then(data => {
        // sort alphabetically
        let committees = data.sort((a, b) => a.filter_name.localeCompare(b.filter_name))

        this.props.storeCommittees(committees)
        this.props.committeeDataLoaded()
      })


    // GET USER DATA 
    console.log("this.props.currentUser.id", this.props.currentUser.id)
    const userDataUrl = userDataEndpoint + `/${this.props.currentUser.id}`
    const token = localStorage.token;

    fetch(userDataUrl, {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.props.storeUserData(data)
        this.props.userDataLoaded()
      })


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
  };


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
      // debugger
      dispatch({ type: "SET_USER", payload: json })
    },
    storeLegislators: (data) => {
      dispatch({ type: "STORE_LEGISLATORS", payload: data })
    },
    storeCommittees: (data) => {
      dispatch({ type: "STORE_COMMITTEES", payload: data })
    },
    storeUserData: (data) => {
      dispatch({ type: "STORE_USER_DATA", payload: data })
    },
    // setUser: (json) => {
    //   console.log("App called setUser")
    //   dispatch({ type: "SET_USER", payload: json })
    // },
    userDataLoaded: () => {
      console.log("User Data Loaded")
      dispatch({ type: "USER_DATA_LOADED" })
    },
    legislatorDataLoaded: () => {
      console.log("Legislator Data Loaded")
      dispatch({ type: "LEGISLATOR_DATA_LOADED" })
    },
    committeeDataLoaded: () => {
      console.log("Committee Data Loaded")
      dispatch({ type: "COMMITTEE_DATA_LOADED" })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInContainer)