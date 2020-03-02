import React from "react";
import { Dimmer, Divider, Grid, Header, Icon, Input, Loader, Tab, Table } from "semantic-ui-react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AddCampaignModal from "../Components/AddCampaignModal";
import EditCampaignModal from "../Components/EditCampaignModal";


class CampaignPageContainer extends React.Component {
  
  render() {
    
    const displayCampaigns = this.props.campaigns.filter(campaign => campaign.display === true)
    const renderCampaigns = displayCampaigns.map(campaign => 
      <Grid.Row className='campaigns' key={campaign.id} >
        <Grid.Column width='13'>
          <Header color='purple' size='small' >{campaign.name}</Header>
        </Grid.Column>
        <Grid.Column width='2'>
          <EditCampaignModal {...campaign} />
        </Grid.Column>
      </Grid.Row>
      )

    const displayActions = this.props.actions.filter(action => action.display === true)
    const renderActions = displayActions.map(action => {
      const actionCampaign = this.props.campaigns.find(campaign => campaign.id === action.campaign_id)
      const actionCall = this.props.calls.find(call => call.action_id === action.id)
      const legislator = this.props.legislators.find(legislator => legislator.id === action.legislator_id)
      let legislatorSlug
      if (!!legislator) {
        legislatorSlug = `${legislator.chamber === "Senate" ? "Sen." : "Assemb."} ${legislator.name} (${legislator.party === "Democratic" ? "D-" : "R-"}${legislator.district})`
        return <Table.Row key={action.id} >
          <Table.Cell>
            {action.complete ? <Icon name='check' color='green' /> : <Icon name='wait' color='red' />}
          </Table.Cell>
          <Table.Cell>   
            {actionCall.duration ? `${actionCall.duration}m` : '--'}
          </Table.Cell>
          <Table.Cell>
            <Link to={`/campaigns/calllists/${actionCall.call_list_id}`} >
              {action.kind}
            </Link>
          </Table.Cell>
          <Table.Cell>
            {legislatorSlug}<br />
            {actionCampaign.name}
          </Table.Cell>
        </Table.Row>
      } else {
        return <Dimmer active inverted ><Loader inverted content="Loading" /></Dimmer>
      }
    })

    const displayCallLists = this.props.callLists.filter(list => list.display === true)
    const renderCallLists = displayCallLists.map(list => {
      const callListCampaign = this.props.campaigns.find(campaign => list.campaign_id === campaign.id)
      const callListCalls = this.props.calls.filter(call => call.call_list_id === list.id)
      const completeCalls = callListCalls.filter(call => {
        const callAction = this.props.actions.find(action => call.action_id === action.id)
        return callAction.complete
      })
      
      return (
        <Table.Row key={list.id}>
          <Table.Cell>
            <Link to={`/campaigns/calllists/${list.id}`}>{list.name}</Link>
            <br />
            {callListCampaign.name}
          </Table.Cell>
          <Table.Cell>{list.created_at.slice(0, 10)}</Table.Cell>
          <Table.Cell>
            <Icon name="check" color='grey' />
            {completeCalls.length} <Icon name="wait" color='grey' />
            {callListCalls.length - completeCalls.length}
          </Table.Cell>
        </Table.Row>
      );
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
            <Table basic='very'>
              <tbody>
                {renderCallLists}
              </tbody>
            </Table>
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
          <Table basic='very'>  
            <tbody>
              {renderActions}
            </tbody>         
          </Table>
        </Tab.Pane>
      }}
    ]

    return (
      <div>
        <Grid padded columns='equal'>
          <Grid.Column>
            <Header>Campaigns</Header>
            <Grid>
              <Grid.Column width='13'>
                <Input 
                  fluid 
                  placeholder="Search campaigns..."
                  value={this.props.campaignSearchInput}
                  onChange={(e) => {this.props.changeCampaignInput(e.target.value)}} 
                />
              </Grid.Column>
              <Grid.Column width='2'>
                <AddCampaignModal />
              </Grid.Column>
            </Grid>
            Showing {displayCampaigns.length} of {this.props.campaigns.length}
            <Divider hidden />
            <Grid divided='vertically' verticalAlign='middle'>
              {renderCampaigns}
            </Grid>
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
    calls: state.calls,
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