import React, { useState } from "react";
import { Input } from 'semantic-ui-react'
import { connect } from "react-redux";


const SearchInput = props => {

  // FIRST WROTE THIS TO COMPONENT TO USE STATE FOR CONTROLLED INPUT
  // REFACTORED TO USE STORE
  // const [getSearch, setSearch] = useState("");
  // const searchChangeHandler = newSearch => setSearch(newSearch);

  return (
    <Input 
      fluid
      onChange={e => props.editSearchFilter(e.target.value)}
      value={props.searchFilter}
      type="text"
      placeholder="Filter by name or district..."
    />
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
    editSearchFilter: (value) => {
      dispatch({ type: "SEARCH_FILTER", payload: value });
    }
    // changeExampleMessage: () => { dispatch(changeExampleMessage()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);


