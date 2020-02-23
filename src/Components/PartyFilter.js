import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";

const PartyFilter = props => {

  // FIRST WROTE THIS TO COMPONENT TO USE STATE FOR CONTROLLED INPUT
  // REFACTORED TO USE STORE
  // const [getSearch, setSearch] = useState("");
  // const searchChangeHandler = newSearch => setSearch(newSearch);

  return (
    <Dropdown
      placeholder="Select Party"
      fluid
      selection
      clearable
      options={props.partyOptions}
      value={props.partyFilter}
      onChange={(e, {value}) => props.editPartyFilter({value})}
    />
  );
};

const mapStateToProps = state => {
  return {
    partyFilter: state.partyFilter,
    partyOptions: state.partyOptions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editPartyFilter: (valueObj) => {
      console.log("editPartyFilter", valueObj.value)
      dispatch({ type: "PARTY_FILTER", payload: valueObj.value });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartyFilter);


