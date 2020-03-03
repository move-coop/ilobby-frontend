import React from "react";
import { connect } from 'react-redux'
import { Checkbox, Dimmer, Table, Dropdown, Input, Header, Loader, List, Button, Icon, Grid } from "semantic-ui-react";
import EditCampaignModal from "../Components/EditCampaignModal"
import EditCallListModal from "../Components/EditCallListModal";


class CallListContainer extends React.Component {

  state = {
    currentCallList: {},
    currentCampaign: {},
    currentCalls: [],
  
  }

  currentCallList = () => this.props.callLists.find(list => list.id === parseInt(this.props.match.params.id))
  currentCampaign = () =>this.props.campaigns.find(campaign => campaign.id === this.currentCallList().campaign_id)  

  patchCallData = (call) => {
    const url = `http://localhost:3000/calls/${call.id}`
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json',
        "Accepts": 'application/json'
      },
      body: JSON.stringify({call: call})
    }

    console.log("patchCallData")
    console.log("url", url)
    console.log("configObj", configObj)
    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
    })

    this.props.updateActionComplete(call.id)
    this.props.resetCallChanged(call.id)

  }

  renderLegislatorRows = () => {
   
    const currentCalls = this.props.calls.filter(call => call.call_list_id === this.currentCallList().id)
    const currentSortedCalls = currentCalls.sort((a, b) => callLegislator(a).name.localeCompare(callLegislator(b).name))
    
    const callAction = (call) => this.props.actions.find(action => action.id === call.action_id)
    const callLegislator = (call) => this.props.legislators.find(legislator => legislator.id === callAction(call).legislator_id)
    const phoneNumbers = (legislator) => {
      
      let voices = legislator.contact_infos.filter(contactInfo => contactInfo.kind === 'voice')
      let numbers = voices.map(voice => <List key={voice.value} ><List.Icon name="phone" /> {voice.value}</List> )

    return numbers
    }
    
    //map through legislators and craete a table row for each
    const legislatorRows = currentSortedCalls.map(call => { 
      const legislator = callLegislator(call)
      return (
        <Table.Row key={call.id}>
          <Table.Cell >
            {callAction(call).complete ? <Icon name='check' color='green' /> : <Icon name='wait' color='red' />}
          </Table.Cell>
          <Table.Cell >
            {legislator.chamber === "Senate" ? "Sen." : "Assemb."} {legislator.name} ({legislator.party === "Democratic" ? "D-" : "R-"}{legislator.district}}
          </Table.Cell>
          <Table.Cell>{phoneNumbers(legislator)}</Table.Cell>
          <Table.Cell><Dropdown
            callid={call.id}
            placeholder="Outcome..."
            selection
            clearable
            options={this.props.outcomeOptions}
            value={call.outcome}
            onChange={(e, data) => this.props.updateCallOutcome(e, data)}
          /></Table.Cell>
          <Table.Cell><Dropdown
            callid={call.id}
            placeholder="Commitment..."
            selection
            compact
            fluid
            clearable
            options={this.props.commitmentOptions}
            value={call.commitment}
            onChange={(e, data) => this.props.updateCallCommitment(e, data)}
            /></Table.Cell>
          <Table.Cell>
            <Input
              fluid
              callid={call.id}
              onChange={(e, data) => this.props.updateCallDuration(e, data)}
              value={call.duration || ""}
            />
          </Table.Cell>
          <Table.Cell>
            <Input 
              fluid
              callid={call.id}
              onChange={(e, data) => this.props.updateCallNotes(e, data) } 
              value={call.notes || ""}
            />
          </Table.Cell>
          <Table.Cell>
            <Button 
              disabled={!call.changed}
              color={call.changed && "green"}
              onClick={() => this.patchCallData(call)} 
              compact 
              floated='right' 
              size="mini"
              >Save
            </Button>
          </Table.Cell>
        </Table.Row>
      )})

      return legislatorRows
  }

  render() {

    const callListCalls = this.props.calls.filter(call => call.call_list_id === this.currentCallList().id)
    const completeCalls = callListCalls.filter(call => {
      const callAction = this.props.actions.find(action => call.action_id === action.id)
      return callAction.complete
    })
    const totalMinutes = callListCalls.reduce((total, call) => {
      return (total + call.duration)
    }, 0)

    return (
      <div>
        {/* HEADER SECTION */}
        <Grid columns='equal'>
          <Grid.Column>
            <Header as="h2">
              <Icon name="ordered list" />
              <Header.Content onClick={() => console.log("CLICK")}>
                {this.props.userDataLoaded &&
                  `${this.currentCallList().name} Call List`}{" "}
                <EditCallListModal {...this.props} />
                <Header.Subheader>
                  {this.props.userDataLoaded &&
                    `${this.currentCampaign().name} Campaign`}
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>

          <Grid.Column>
            <Grid.Row>
              {callListCalls.length} calls total. 
            </Grid.Row>
            <Grid.Row>
              {completeCalls.length} complete. {callListCalls.length - completeCalls.length} remaining.
            </Grid.Row>
            <Grid.Row>
              Total call time: {totalMinutes} minutes.
            </Grid.Row>
          </Grid.Column>
        </Grid>


        {/* START OF TABLE TO RENDER EACH CALL */}
        <Table selectable compact basic striped color={"purple"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing ></Table.HeaderCell>
              <Table.HeaderCell width='3' >Target</Table.HeaderCell>
              <Table.HeaderCell width='2' >{"Phone Number(s)   "}</Table.HeaderCell>
              <Table.HeaderCell collapsing >Outcome</Table.HeaderCell>
              <Table.HeaderCell collapsing >Commitment</Table.HeaderCell>
              <Table.HeaderCell collapsing >Duration</Table.HeaderCell>
              <Table.HeaderCell >Notes</Table.HeaderCell>
              <Table.HeaderCell collapsing></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {(this.props.userDataLoaded &&
              this.props.legislatorDataLoaded) ?
              this.renderLegislatorRows() : <Dimmer active inverted ><Loader inverted content="Loading" /></Dimmer>}
          </Table.Body>
        </Table>
      </div>
    );
  } 
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    campaigns: state.campaigns,
    actions: state.actions,
    callLists: state.callLists,
    calls: state.calls,
    legislators: state.legislators,
    legislatorDataLoaded: state.legislatorDataLoaded,
    userDataLoaded: state.userDataLoaded,
    outcomeOptions: state.outcomeOptions,
    commitmentOptions: state.commitmentOptions,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCallOutcome: (e, data) => {
      dispatch({ type: "UPDATE_CALL_OUTCOME", payload: { id: data.callid, value: data.value } })
    },
    updateCallCommitment: (e, data) => {
      dispatch({ type: "UPDATE_CALL_COMMITMENT", payload: { id: data.callid, value: data.value } })
    },
    updateCallDuration: (e, data) => {
      dispatch({ type: "UPDATE_CALL_DURATION", payload: { id: data.callid, value: data.value } })
    },
    updateCallNotes: (e, data) => {
      dispatch({ type: "UPDATE_CALL_NOTES", payload: { id: data.callid, value: data.value}})
    },
    resetCallChanged: (id) => {
      dispatch({ type: "RESET_CALL_CHANGED", payload: { id } })
    },
    updateActionComplete: (id) => {
      dispatch({ type: "UPDATE_ACTION_COMPLETE", payload: { id } })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CallListContainer)
