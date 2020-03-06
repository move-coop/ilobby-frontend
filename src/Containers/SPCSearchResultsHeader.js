import React, { Fragment } from "react";
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { Header, Checkbox, Button, Grid, Segment } from 'semantic-ui-react'
import TakeActionModal from '../Components/TakeActionModal'
import LegislatorModal from "../Components/LegislatorModal";

class SPCSearchResultsHeader extends React.Component {
  
  resetFilters = () => {
    this.props.editCommitteeFilter({value: []})
    this.props.editPartyFilter({value: ""})
    this.props.editChamberFilter({value: "Senate"})
    this.props.editSearchFilter("")

    if (!!this.props.clickZoomed) {
      this.props.clickZoomed.setOptions({ fillOpacity: 0.25 })
      this.props.setSavedPoints(null)
      this.props.setClickZoomed(null)
    }
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

    const mapInfoDetails = () => {
      // if clickZoomed is true, then don't change it
      if (this.props.clickZoomed) {
        const staticLegislator = this.props.legislators.find(legislator => legislator.id === this.props.clickZoomed.id)

        return (
          <Fragment>
            <Header>
              <LegislatorModal {...staticLegislator} />{` ${staticLegislator.chamber === "Senate" ? "Sen." : "Assemb."} ${
                staticLegislator.name
              } (${staticLegislator.party === "Democratic" ? "D-" : "R-"}${
                staticLegislator.district
              })`}
            </Header>
          </Fragment>
        );
      
      
        // if hoverLegislator exists, show the legislator slug. 
      } else if (this.props.hoverLegislator) {

        return <Header>
          {`${this.props.hoverLegislator.chamber === "Senate" ? "Sen." : "Assemb."} ${this.props.hoverLegislator.name} (${this.props.hoverLegislator.party === "Democratic" ? "D-" : "R-"}${this.props.hoverLegislator.district})`}
        </Header>
      }
    }

    return (
      <Grid padded>
        <Grid.Row columns="2">
          <Grid.Column width="6">
            <Header>{displayCount()} search results</Header>
          </Grid.Column>
          <Grid.Column width="10" textAlign="right">
            {mapInfoDetails()}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="2">
          <Grid.Column width="6">
            <Header color="purple">
              {displaySelectedCount()} legislators selected
            </Header>
          </Grid.Column>
          <Grid.Column width="10" textAlign="right">
            <Button size="mini" onClick={this.props.toggleAllSelection}>
              Select All/None
            </Button>
            <Route component={TakeActionModal}></Route>
            <Button size="mini" outline basic onClick={this.resetFilters}>
              Reset Filters
            </Button>
          </Grid.Column>

          {/* HIDING CARD VIEW TOGGLE */}
          {/* <Checkbox
              checked={this.props.cardView}
              onClick={this.props.toggleCardView}
              toggle
              label="Card View"
            /> */}
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    legislators: state.legislators,
    cardView: state.cardView,
    clickZoomed: state.clickZoomed,
    savedPoints: state.savedPoints,
    hoverLegislator: state.hoverLegislator,
    colors: state.colors
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
    },
    setClickZoomed: (value) => {
      dispatch({ type: "SET_CLICK_ZOOMED", payload: value })
    },
    setSavedPoints: (value) => {
      dispatch({ type: "SET_SAVED_POINTS", payload: value })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SPCSearchResultsHeader);
