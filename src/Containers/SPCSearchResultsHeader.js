import React from "react";
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

class SPCSearchResultsHeader extends React.Component {
  render() {
    return(
    <Header>
        {this.props.renderedLegislatorCount} Results. {this.props.selectionCount} Selected.
      </Header>
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
    renderedLegislatorCount: state.renderedLegislatorCount,
    selectionCount: state.selectionCount
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

export default connect(mapStateToProps, mapDispatchToProps)(SPCSearchResultsHeader);
