import React from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";

const ChamberFilter = props => {
  
  // FIRST WROTE THIS TO COMPONENT TO USE STATE FOR CONTROLLED INPUT
  // REFACTORED TO USE STORE
  // const [getSearch, setSearch] = useState("");
  // const searchChangeHandler = newSearch => setSearch(newSearch);

  return (
    <Dropdown
      placeholder="Chamber"
      fluid
      selection
      clearable
      options={props.chamberOptions}
      value={props.chamberFilter}
      onChange={(e, { value }) => props.editChamberFilter({ value })}
    />
  );
};

const mapStateToProps = state => {
  return {
    chamberFilter: state.chamberFilter,
    chamberOptions: state.chamberOptions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editChamberFilter: (valueObj) => {
      dispatch({ type: "CHAMBER_FILTER", payload: valueObj.value });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChamberFilter);



