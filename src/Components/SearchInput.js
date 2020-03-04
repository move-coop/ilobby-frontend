import React from "react";
import { Icon, Input, Button } from 'semantic-ui-react'
import { connect } from "react-redux";


const SearchInput = props => {

  // FIRST WROTE THIS TO COMPONENT TO USE STATE FOR CONTROLLED INPUT
  // REFACTORED TO USE STORE
  // const [getSearch, setSearch] = useState("");
  // const searchChangeHandler = newSearch => setSearch(newSearch);

  const changeHandler = (value) => {
    props.editSearchFilter(value)
    props.setSavedPoints(null)
    props.setClickZoomed(null)
  }

  return (
      <Input 
        fluid
        action
        onChange={e => changeHandler(e.target.value)}
        value={props.searchFilter}
        type="text"
        placeholder="Name or district number..."
      />
      //   <Button basic icon ><Icon name='delete' /></Button>
      // </Input>
  );
};

const mapStateToProps = state => {
  return {
    searchFilter: state.searchFilter
    // exampleMessage: state.exampleState.exampleMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setClickZoomed: (value) => {
      dispatch({ type: "SET_CLICK_ZOOMED", payload: value })
    },
    setSavedPoints: (value) => {
      dispatch({ type: "SET_SAVED_POINTS", payload: value })
    },
    editSearchFilter: (value) => {
      dispatch({ type: "SEARCH_FILTER", payload: value });
    }
    // changeExampleMessage: () => { dispatch(changeExampleMessage()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);


