import React from "react";
import LegislatorRow from '../Components/LegislatorRow'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'


class ListViewContainer extends React.Component {
  render() {

    const renderLegislators = this.props.displayLegislators.map(legislator => <LegislatorRow key={legislator.id} {...legislator} />)

    return(
      <div>
        <Segment.Group size={'mini'}>
          {renderLegislators}
        </Segment.Group>
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    displayLegislators: state.displayLegislators
  }
}

export default connect(mapStateToProps)(ListViewContainer);

