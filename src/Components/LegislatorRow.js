import React from "react";
import { Checkbox, Segment } from "semantic-ui-react"

const LegislatorRow = props => {
  return(
      <Segment onClick={() => {console.log("click")}} >
        <Checkbox />{`${props.name} | ${props.party}`}
      </Segment>
  )
};

export default LegislatorRow;
