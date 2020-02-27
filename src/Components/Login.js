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

    // fetch
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    };

    console.log(configObj)

    //form should be reset to blank!!

    fetch(`http://localhost:3000/login`, configObj)
      .then(resp => resp.json())
      .then(json => {
        if (json.errors) {
          console.log("errors")
          alert(json.errors);
        } else {
          console.log("success")
          this.props.setUser(json);
          // reroute if successful
        }
      });

  };

  render() {
    return (
      <div>
        <Header as="h2" color="grey" textAlign="center">
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
              color="grey"
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