import React from "react";
import LegislatorRow from '../Components/LegislatorRow'
import { connect } from 'react-redux'
import { Dimmer, Loader, SegmentGroup } from 'semantic-ui-react'


class ListViewContainer extends React.Component {
  render() {

    console.log(this.props.legislators)
    console.log(this.props.committeeFilter)
    const displayLegislators = this.props.legislators.filter(legislator => legislator.display === true)
    const renderLegislators = displayLegislators.map(legislator => <LegislatorRow key={legislator.id} {...legislator} />)

    return(
      <div>
        {!this.props.legislatorDataLoaded ? <Dimmer active inverted ><Loader inverted content="Loading" /></Dimmer> :
          <SegmentGroup >
          {renderLegislators}
        </SegmentGroup>}
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    legislators: state.legislators,
    committeeFilter: state.committeeFilter,
    legislatorDataLoaded: state.legislatorDataLoaded
  }
}

export default connect(mapStateToProps)(ListViewContainer);

