import React from "react";
import { Grid, Checkbox, Segment, Button } from "semantic-ui-react"
import { connect } from 'react-redux'
import LegislatorModal from './LegislatorModal'


const LegislatorRow = props => {

  // const clickHandler = (id) => {
  //   props.mapDispatchToProps(id)
  // }

  return(
    <Segment>
        <Checkbox
          id={props.id} 
          checked={props.selected} 
          onClick={(event) => props.toggleOneSelection(event.target.id)}
          label={`${props.chamber === "Senate" ? "Sen." : "Assemb." } ${props.name} (${props.party === "Democratic" ? "D-" : "R-" }${props.district})`} 
        />
      <LegislatorModal />
      </Segment>
        
  )
};

const mapDispatchToProps = dispatch => {
  return {
    toggleOneSelection: (id) => {
      dispatch({ type: "TOGGLE_ONE_SELECTION", payload: id })
    }
  }
}

export default connect(null, mapDispatchToProps)(LegislatorRow);

