import React, {useState} from "react";
import { Checkbox, Segment } from "semantic-ui-react"

const LegislatorRow = props => {

  const segmentClickHandler = () => {

  }

  return(
      <Segment className="legislator-row" onClick={() => {console.log("click")}} >
        <Checkbox checked={props.selected} label={`${props.chamber === "Senate" ? "Sen." : "Assemb." } ${props.name} (${props.party === "Democratic" ? "D-" : "R-" }${props.district})`} />
      </Segment>
  )
};

export default LegislatorRow;
