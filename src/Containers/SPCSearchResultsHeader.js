import React from "react";
import { connect } from 'react-redux'
import { Header, Checkbox, Button } from 'semantic-ui-react'

class SPCSearchResultsHeader extends React.Component {
  render() {

    const displayCount = () => {
      if (this.props.legislators) {
        return this.props.legislators.filter(legislator => legislator.display === true).length
      } else {
        return 0
      }
    }

    const selectedCount = () => {
      if (this.props.legislators) {
        return this.props.legislators.filter(legislator => legislator.selected === true).length
      } else {
        return 0
      }
    }

    return(
      <div>
        <Header>
          {displayCount} Results. {selectedCount} Selected.
        </Header>
        <Button onClick={this.props.toggleAllSelection} >Select All/None</Button>
        <Button>Take Action</Button>
        <Checkbox toggle label="Card View" />

      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    legislators: state.legislators,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleAllSelection: () => {
      dispatch({ type: "TOGGLE_ALL_SELECTION" })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SPCSearchResultsHeader);
