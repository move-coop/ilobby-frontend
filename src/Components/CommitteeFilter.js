import React from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";

const CommitteeFilter = props => {

  // FIRST WROTE THIS TO COMPONENT TO USE STATE FOR CONTROLLED INPUT
  // REFACTORED TO USE STORE
  // const [getSearch, setSearch] = useState("");
  // const searchChangeHandler = newSearch => setSearch(newSearch);

  const filteredCommitteeOptions = props.committeeOptions.filter(option => option.chamber.includes(props.chamberFilter))

  const changeHandler = (valueObj) => {
    props.editCommitteeFilter(valueObj)
    props.setSavedPoints(null)
    props.setClickZoomed(null)
  }

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
      onChange={(e, { value }) => changeHandler({ value })}
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
    setClickZoomed: (value) => {
      dispatch({ type: "SET_CLICK_ZOOMED", payload: value })
    },
    setSavedPoints: (value) => {
      dispatch({ type: "SET_SAVED_POINTS", payload: value })
    },
    editCommitteeFilter: (valueObj) => {
      console.log("editCommitteeFilter", valueObj.value)
      dispatch({ type: "COMMITTEE_FILTER", payload: valueObj.value });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitteeFilter);



