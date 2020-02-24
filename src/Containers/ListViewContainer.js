import React from "react";
import LegislatorRow from '../Components/LegislatorRow'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'


class ListViewContainer extends React.Component {
  render() {

    const { legislators, searchFilter, chamberFilter, partyFilter, committeeFilter } = this.props

    // apply 4 filers
    let displayLegislators = legislators.filter(legislator => (
      (
        legislator.name.toLowerCase().includes(searchFilter.toLowerCase()) 
        || legislator.district.toString().includes(searchFilter)
      ) && (
        legislator.chamber.includes(chamberFilter) &&
        legislator.party.includes(partyFilter) 
        // include committees once that is serialized from the backend
      )
    ))


    // send legislators count to store
    this.props.updateRenderedLegislatorCount(displayLegislators.length)

    // sort alphabetically
    displayLegislators = displayLegislators.sort((a, b) => a.name.localeCompare(b.name))
      
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
    legislators: state.legislators,
    searchFilter: state.searchFilter,
    chamberFilter: state.chamberFilter,
    partyFilter: state.partyFilter,
    committeeFilter: state.committeeFilter,
    renderedLegislatorCount: state.renderedLegislatorCount
    // exampleMessage: state.exampleState.exampleMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateRenderedLegislatorCount: (count) => {
      dispatch({ type: "UPDATE_RENDERED_LEGISLATOR_COUNT", payload: count })
    }
  }
  // changeExampleMessage: () => { dispatch(changeExampleMessage()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListViewContainer);

