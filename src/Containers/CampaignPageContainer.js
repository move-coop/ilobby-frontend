import React from "react";
import { Button, Divider, Dropdown, Grid, Header, Icon, Input, List, Tab } from "semantic-ui-react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AddCampaignModal from "../Components/AddCampaignModal";
import EditCampaignModal from "../Components/EditCampaignModal";


class CampaignPageContainer extends React.Component {
  
  render() {
    
    const displayCampaigns = this.props.campaigns.filter(campaign => campaign.display === true)
    const renderCampaigns = displayCampaigns.map(campaign => 
      <List.Item 
        key={campaign.id} 
        >{campaign.name} 
        <EditCampaignModal {...campaign} />
      </List.Item>
      )


    const displayActions = this.props.actions.filter(action => action.display === true)
    const renderActions = displayActions.map(action => {
      const legislator = this.props.legislators.find(legislator => legislator.id == action.legislator_id)
      let legislatorSlug
      if (!!legislator) {
        legislatorSlug = `${legislator.chamber === "Senate" ? "Sen." : "Assemb."} ${legislator.name} (${legislator.party === "Democratic" ? "D-" : "R-"}${legislator.district})`
        return <List.Item key={action.id} >
          {action.kind} | {legislatorSlug}:
        </List.Item>
      }
    })

    const displayCallLists = this.props.callLists.filter(list => list.display === true)
    const renderCallLists = displayCallLists.map(list => {
      return <List.Item key={list.id} >
        <Link to={`/campaigns/calllists/${list.id}`}>
          {list.name}
        </Link>
      </List.Item>
    })

    const panes = [
      {menuItem: 'Call Lists', render: () => {
          return <Tab.Pane>
            <Input
              fluid
              placeholder="Search call lists..."
              value={this.props.callListSearchInput}
              onChange={(e) => { this.props.changeCallListInput(e.target.value) }}
            />
            {/* <Button icon><Icon name='add' /></Button><br /> */}
            Showing {displayCallLists.length} of {this.props.callLists.length}
            <Divider hidden />
            <List>
              {renderCallLists}
            </List>
          </Tab.Pane>
        }
      },

      { menuItem: 'Actions', render: () => {
        return <Tab.Pane> 
          <Input
            fluid
            placeholder="Search actions..."
            value={this.props.actionSearchInput}
            onChange={(e) => { this.props.changeActionInput(e.target.value) }}
          />
          {/* <Button icon><Icon name='add' /></Button><br /> */}
          Showing {displayActions.length} of {this.props.actions.length}
          <Divider hidden />
          <List>           
            {renderActions}
          </List>
        </Tab.Pane>
      }}
    ]

    return (
      <div>
        <Grid padded columns='equal'>
          <Grid.Column>
            <Header>Campaigns</Header>
            
            <AddCampaignModal />
            <Input 
              fluid 
              placeholder="Search campaigns..."
              value={this.props.campaignSearchInput}
              onChange={(e) => {this.props.changeCampaignInput(e.target.value)}} 
              />
            Showing {displayCampaigns.length} of {this.props.campaigns.length}
            <Divider hidden />
            <List>
              {/* {this.props.legislatorDataLoaded && this.props.userDataLoaded && this.renderCampaigns(displayCampaigns)} */}
              {renderCampaigns}
            </List>
          </Grid.Column>
          <Grid.Column>
            <Tab panes={panes}>
            </Tab>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    campaigns: state.campaigns,
    campaignSearchInput: state.campaignSearchInput,
    actions: state.actions,
    actionSearchInput: state.actionSearchInput,
    callLists: state.callLists,
    callListSearchInput: state.callListSearchInput,
    legislatorDataLoaded: state.legislatorDataLoaded,
    userDataLoaded: state.userDataLoaded,
    legislators: state.legislators

  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCampaignInput: (value) => {
      console.log("changeCampaignInput", value)
      dispatch({ type: "CHANGE_CAMPAIGN_INPUT", payload: value });
    },
    changeActionInput: (value) => {
      console.log("changeActionInput", value)
      dispatch({ type: "CHANGE_ACTION_INPUT", payload: value });
    },
    changeCallListInput: (value) => {
      console.log("changeCallListInput", value)
      dispatch({ type: "CHANGE_CALL_LIST_INPUT", payload: value });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignPageContainer);