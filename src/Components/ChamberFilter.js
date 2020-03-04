import React from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";

const ChamberFilter = props => {
  
  // FIRST WROTE THIS TO COMPONENT TO USE STATE FOR CONTROLLED INPUT
  // REFACTORED TO USE STORE
  // const [getSearch, setSearch] = useState("");
  // const searchChangeHandler = newSearch => setSearch(newSearch);


  const changeHandler = (valueObj) => {
    props.editChamberFilter(valueObj)
    props.setSavedPoints(null)
    props.setClickZoomed(null)
  }

  return (
    <Dropdown
      placeholder="Chamber"
      fluid
      selection
      clearable
      options={props.chamberOptions}
      value={props.chamberFilter}
      onChange={(e, { value }) => changeHandler({ value })}
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
    setClickZoomed: (value) => {
      dispatch({ type: "SET_CLICK_ZOOMED", payload: value })
    },
    setSavedPoints: (value) => {
      dispatch({ type: "SET_SAVED_POINTS", payload: value })
    },
    editChamberFilter: (valueObj) => {
      dispatch({ type: "CHAMBER_FILTER", payload: valueObj.value });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChamberFilter);



