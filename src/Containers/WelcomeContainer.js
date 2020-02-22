import React from 'react';
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

class WelcomeContainer extends React.Component {
  render() {
    return (
      <div>
        WELCOME SPLASH
        <Button onClick={this.props.toggleCurrentUser} primary>
          {this.props.currentUser ? "Logout" : "Login"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("msp state", state);
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

