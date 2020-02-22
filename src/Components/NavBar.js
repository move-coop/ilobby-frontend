import React, { useState } from "react";
import { Button, Menu, Icon, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


const NavBar = (props) => {
  // local state just to handle active menu item
  const [activeItem, setActiveItem] = useState("")

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    // <div>NAVBAR</div>
    <Menu borderless color="purple">
      <Menu.Item>
        <Icon name="volleyball ball" />
      </Menu.Item>

      <Menu.Item
        name="search"
        active={activeItem === "search"}
        onClick={handleItemClick}
      >
        <Link to="/">Search</Link>
      </Menu.Item>

      <Menu.Item
        name="campaigns"
        active={activeItem === "campaigns"}
        onClick={handleItemClick}
      >
        <Link to="/campaigns">Campaigns</Link>
      </Menu.Item>
        <Menu.Item>
          <Button onClick={props.toggleCurrentUser} primary float right>
            {props.currentUser ? "Logout" : "Login"}
          </Button>
        </Menu.Item>
    </Menu>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

