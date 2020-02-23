import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";

const CommitteeFilter = props => {

  // FIRST WROTE THIS TO COMPONENT TO USE STATE FOR CONTROLLED INPUT
  // REFACTORED TO USE STORE
  // const [getSearch, setSearch] = useState("");
  // const searchChangeHandler = newSearch => setSearch(newSearch);

  return (
    <Dropdown
      placeholder="Committee"
      fluid
      multiple
      search
      selection
      options={props.committeeOptions}
      value={props.committeeFilter}
      onChange={(e, {value}) => props.editCommitteeFilter({ value })}
    />
  );
};

const mapStateToProps = state => {
  return {
    committeeFilter: state.committeeFilter,
    committeeOptions: state.committeeOptions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editCommitteeFilter: (valueObj) => {
      console.log("editCommitteeFilter", valueObj.value)
      dispatch({ type: "COMMITTEE_FILTER", payload: valueObj.value });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitteeFilter);



