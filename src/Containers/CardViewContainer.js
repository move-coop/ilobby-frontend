import React from "react";
import LegislatorRow from '../Components/LegislatorRow'
import { connect } from 'react-redux'
import { Grid, Segment, SegmentGroup } from 'semantic-ui-react'


class CardViewContainer extends React.Component {
  render() {

    console.log(this.props.legislators)
    const displayLegislators = this.props.legislators.filter(legislator => legislator.display === true)
    const renderLegislators = displayLegislators.map(legislator => <LegislatorRow key={legislator.id} {...legislator} />)

    return (
      <div>
        CARD VIEW
        {/* <SegmentGroup >
          {renderLegislators}
        </SegmentGroup> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    legislators: state.legislators
  }
}

export default connect(mapStateToProps)(CardViewContainer);

