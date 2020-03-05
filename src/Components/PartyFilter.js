import React from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";

const PartyFilter = props => {

  // FIRST WROTE THIS TO COMPONENT TO USE STATE FOR CONTROLLED INPUT
  // REFACTORED TO USE STORE
  // const [getSearch, setSearch] = useState("");
  // const searchChangeHandler = newSearch => setSearch(newSearch);

  const changeHandler = (valueObj) => {
    props.editPartyFilter(valueObj)
    props.setSavedPoints(null)
    props.setClickZoomed(null)
  }

  return (
    <Dropdown
      placeholder="Party"
      fluid
      selection
      clearable
      options={props.partyOptions}
      value={props.partyFilter}
      onChange={(e, { value }) => changeHandler({value})}
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
    setClickZoomed: (value) => {
      dispatch({ type: "SET_CLICK_ZOOMED", payload: value })
    },
    setSavedPoints: (value) => {
      dispatch({ type: "SET_SAVED_POINTS", payload: value })
    },
    editPartyFilter: (valueObj) => {
      console.log("editPartyFilter", valueObj.value)
      dispatch({ type: "PARTY_FILTER", payload: valueObj.value });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartyFilter);


