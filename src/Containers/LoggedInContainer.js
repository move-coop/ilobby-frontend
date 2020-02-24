import React from "react";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import SearchPageContainer from "./SearchPageContainer";
import CampaignPageContainer from "./CampaignPageContainer";
import { Switch, Route } from 'react-router-dom'

class LoggedInContainer extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" component={NavBar} />
        <Switch >
          <Route path="/campaigns">
            <CampaignPageContainer />
          </Route>
          {/* NEED TO HAVE A COMPONENT FOR CALLLISTS */}
          {/* <Route path="/calllist/:id">
            <CampaignPageContainer />
          </Route> */}
          <Route path="/">
            <SearchPageContainer />
          </Route>
        </Switch>
        <Footer />

      </div>
    );


  }
}

export default LoggedInContainer;
