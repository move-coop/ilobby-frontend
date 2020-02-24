import React from "react";
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

class SPCSearchResultsHeader extends React.Component {
  render() {
    return(
    <Header>
        {this.props.displayLegislators.length} Results. {this.props.selectionCount} Selected.
      </Header>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    displayLegislators: state.displayLegislators,
    selectionCount: state.selectionCount
  }
}

export default connect(mapStateToProps)(SPCSearchResultsHeader);
