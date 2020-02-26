import React from 'react';
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import { connect } from "react-redux";
import { Grid, Button, Divider } from "semantic-ui-react";

class WelcomeContainer extends React.Component {
  render() {
    console.log("rendering welcome container")
    return (
      <div>
        {/* WELCOME SPLASH
        <Button onClick={this.props.toggleCurrentUser} primary>
          {this.props.currentUser ? "Logout" : "Login"}
        </Button>
        <Divider /> */}
        <Grid
          style={{ height: "100vh" }}
          verticalAlign="middle"
          textAlign="center"
        >
          <Grid.Column>
            <Grid.Row>
              iLobby
              <br />
              <br />
              <br />
            </Grid.Row>
            <Grid.Row>
              <Grid textAlign="center" verticalAlign="top">
                <Grid.Column width="8" style={{ maxWidth: 450 }}>
                  <Login setUser={this.props.setUser} />
                </Grid.Column>
                <Grid.Column width="8" style={{ maxWidth: 450 }}>
                  <Signup setUser={this.props.setUser} />
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid.Column>
        </Grid>


      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
    // exampleMessage: state.exampleState.exampleMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleCurrentUser: () => {
      dispatch({ type: "TOGGLE" });
    }
    // changeExampleMessage: () => { dispatch(changeExampleMessage()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer);

