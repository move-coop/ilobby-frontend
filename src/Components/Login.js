import firebase from "firebase";
import React from 'react'
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { connect } from 'react-redux';

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = () => {
    // FIREBASE AUTH
    console.log(
      "calling firebase auth with",
      this.state.email,
      this.state.password
    );

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((resp) => {
        console.log(resp.user);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
        alert("Outer Catch", errorMessage, errorCode);
      });

    // FETCH FROM RAILS API
    // const configObj = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accepts: "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: this.state.email,
    //     password: this.state.password,
    //   }),
    // };

    // console.log(configObj);

    // //form should be reset to blank!!

    // fetch(`${process.env.REACT_APP_ILOBBY_API}/login`, configObj)
    //   .then((resp) => resp.json())
    //   .then((json) => {
    //     if (json.errors) {
    //       console.log("errors");
    //       alert(`Login Error: ${json.errors}`);
    //     } else {
    //       console.log("success");
    //       this.props.setUser(json);
    //       // reroute if successful
    //     }
    //   });
  };

  render() {
    return (
      <div>
        <Header as="h2" color="purple" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.changeHandler}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.changeHandler}
              type="password"
            />
            <Button
              onClick={this.submitHandler}
              color="purple"
              fluid
              size="large"
            >
              Login
            </Button>
          </Segment>
        </Form>
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
      console.log("login called setUser")
      dispatch({ type: "SET_USER", payload: json })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)