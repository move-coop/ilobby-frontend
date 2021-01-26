import firebase from "firebase";
import React from 'react'
import {
  Button,
  Form,
  Header,
  Segment
} from "semantic-ui-react";
import { connect } from 'react-redux';


class Signup extends React.Component {

  state = {
    email: "",
    password: "",
    passwordConfirmation: ""
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = () => {
    // validate password = password Confirmation
    if (this.state.password === this.state.passwordConfirmation) {
      
      console.log('passwords match')
      
      // FIREBASE AUTH
      console.log('calling firebase auth with', this.state.email, this.state.password)
      
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(resp => {
          console.log(resp.user);
        })
        .catch(error => {
          console.log(`There has been a problem with your signup operation:\n ${error.message}\n\nError:${error.code}`);
          alert(`There has been a problem with your signup operation:\n ${error.message}\n\nError:${error.code}`);
        });
      // }

      //form should be reset to blank!!

      // fetch(`${process.env.REACT_APP_ILOBBY_API}/signup`, configObj)
      //   .then(resp => resp.json())
      //   .then(json => {
      //     if (json.errors) {
      //       alert(json.errors)
      //     } else {
      //       console.log("signup response", json)
      //       this.props.setUser(json)
      //       // reroute if successful
      //     }
      //   })
    } else {
      alert("Passwords don't match!")
    }

  }



  render() {
    return (
      <div>
        <Header as="h2" color="grey" textAlign="center">
          Sign-up for an account
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
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password Confirmation"
              name="passwordConfirmation"
              value={this.state.passwordConfirmation}
              onChange={this.changeHandler}
              type="password"
            />
            <Button
              onClick={this.submitHandler}
              color="grey"
              fluid
              size="large"
            >
              Signup
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
      dispatch({ type: "SET_USER", payload: json })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)