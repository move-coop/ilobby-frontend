import React from "react";
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { Header, Checkbox, Button } from 'semantic-ui-react'
import TakeActionModal from '../Components/TakeActionModal'

class SPCSearchResultsHeader extends React.Component {
  
  resetFilters = () => {
    this.props.editCommitteeFilter({value: []})
    this.props.editPartyFilter({value: ""})
    this.props.editChamberFilter({value: "Senate"})
    this.props.editSearchFilter("")
  }

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
          {displayCount()} Results. {displaySelectedCount()} Selected. <Button size='mini' outline basic onClick={this.resetFilters} >Reset</Button>
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
    },
    editCommitteeFilter: (valueObj) => {
      console.log("editCommitteeFilter", valueObj.value)
      dispatch({ type: "COMMITTEE_FILTER", payload: valueObj.value });
    },
    editPartyFilter: (valueObj) => {
      console.log("editPartyFilter", valueObj.value)
      dispatch({ type: "PARTY_FILTER", payload: valueObj.value });
    },
    editChamberFilter: (valueObj) => {
      dispatch({ type: "CHAMBER_FILTER", payload: valueObj.value });
    },
    editSearchFilter: (value) => {
      dispatch({ type: "SEARCH_FILTER", payload: value });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SPCSearchResultsHeader);
