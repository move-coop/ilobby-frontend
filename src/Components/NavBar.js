import React, { useState } from "react";
import { Button, Menu, Icon, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";


const NavBar = (props) => {
  // local state just to handle active menu item

  const getPath = () => {
    if (props.location.pathname.includes("campaigns")) {
      return "campaigns"
    } else {
      return "search"
    }
  }

  const [activeItem, setActiveItem] = useState(getPath())

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
    if (name === "campaigns") {
      props.history.push('/campaigns')
    } else {
      props.history.push('/')
    }
  };

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
        Search
      </Menu.Item>

      <Menu.Item
        name="campaigns"
        active={activeItem === "campaigns"}
        onClick={handleItemClick}
      >
        Campaigns
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Button onClick={props.logoutCurrentUser} primary>
            {props.currentUser ? `Logout ${props.currentUser.email}` : "Login"}
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

 const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
    // exampleMessage: state.exampleState.exampleMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutCurrentUser: () => {
      dispatch({ type: "LOGOUT" });
    }
    // changeExampleMessage: () => { dispatch(changeExampleMessage()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

