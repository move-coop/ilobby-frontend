import React from "react";
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { Header, Checkbox, Button } from 'semantic-ui-react'
import TakeActionModal from '../Components/TakeActionModal'

class SPCSearchResultsHeader extends React.Component {
  render() {

    const displayCount = () => {
      if (this.props.legislators) {
        return this.props.legislators.filter(legislator => legislator.display === true).length
      } else {
        return 0
      }
    }

    const displaySelectedCount = () => {
      if (this.props.legislators) {
        return this.props.legislators.filter(legislator => legislator.selected === true && legislator.display === true ).length
      } else {
        return 0
      }
    }

    return(
      <div>
        <Header>
          {displayCount()} Results. {displaySelectedCount()} Selected.
        </Header>
        <Button onClick={this.props.toggleAllSelection} >Select All/None</Button>
        <Route component={TakeActionModal}>
        </Route>
        <Checkbox 
          checked={this.props.cardView}
          onClick={this.props.toggleCardView}
          toggle 
          label="Card View" 
        />

      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    legislators: state.legislators,
    cardView: state.cardView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleAllSelection: () => {
      dispatch({ type: "TOGGLE_ALL_SELECTION" })
    },
    toggleCardView: () => {
      dispatch({ type: "TOGGLE_CARDVIEW" })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SPCSearchResultsHeader);
