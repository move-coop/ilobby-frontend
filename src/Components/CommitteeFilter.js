import React from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";

const CommitteeFilter = props => {

  // FIRST WROTE THIS TO COMPONENT TO USE STATE FOR CONTROLLED INPUT
  // REFACTORED TO USE STORE
  // const [getSearch, setSearch] = useState("");
  // const searchChangeHandler = newSearch => setSearch(newSearch);

  const filteredCommitteeOptions = props.committeeOptions.filter(option => option.chamber.includes(props.chamberFilter))

  return (
    <Dropdown
      placeholder="Committee"
      fluid
      multiple
      search
      selection
      clearable
      options={filteredCommitteeOptions}
      value={props.committeeFilter}
      onChange={(e, {value}) => props.editCommitteeFilter({ value })}
    />
  );
};

const mapStateToProps = state => {
  return {
    chamberFilter: state.chamberFilter,
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



