import React from "react";
import LegislatorRow from '../Components/LegislatorRow'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'


class ListViewContainer extends React.Component {
  render() {

    console.log(this.props.legislators)
    const displayLegislators = this.props.legislators.filter(legislator => legislator.display === true)
    const renderLegislators = displayLegislators.map(legislator => <LegislatorRow key={legislator.id} {...legislator} />)

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
    legislators: state.legislators
  }
}

export default connect(mapStateToProps)(ListViewContainer);

