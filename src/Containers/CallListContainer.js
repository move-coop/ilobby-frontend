import React from "react";
import { connect } from 'react-redux'
import { Checkbox, Table, Dropdown, Input, Header, List, Button, Icon } from "semantic-ui-react";


class CallListContainer extends React.Component {
  
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
    const callAction = (call) => this.props.actions.find(action => action.id === call.action_id)
    const callLegislator = (call) => this.props.legislators.find(legislator => legislator.id === callAction(call).legislator_id)
    const currentSortedCalls = currentCalls.sort((a, b) => callLegislator(a).name.localeCompare(callLegislator(b).name))
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
          <Table.Cell ><Checkbox
            checked={callAction(call).complete}
            label={`${legislator.chamber === "Senate" ? "Sen." : "Assemb."} ${legislator.name} (${legislator.party === "Democratic" ? "D-" : "R-"}${legislator.district})`}
          /></Table.Cell>
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
            clearable
            options={this.props.commitmentOptions}
            value={call.commitment}
            onChange={(e, data) => this.props.updateCallCommitment(e, data)}
            /></Table.Cell>
          <Table.Cell>
            <Input
              callid={call.id}
              onChange={(e, data) => this.props.updateCallDuration(e, data)}
              value={call.duration || ""}
            />
          </Table.Cell>
          <Table.Cell>
            <Input 
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

    
    return (
      <div>
        <Header color="purple" > {this.props.userDataLoaded && `Campaign: ${this.currentCampaign().name}`} </Header>
        <Header >{this.props.userDataLoaded && `Call List: ${this.currentCallList().name}`}</Header>
        <Table selectable compact basic striped color={'purple'} >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Target</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Outcome</Table.HeaderCell>
              <Table.HeaderCell>Commitment</Table.HeaderCell>
              <Table.HeaderCell>Minutes</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
              <Table.HeaderCell textAlign="center"><Icon name="save" /></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.userDataLoaded && this.props.legislatorDataLoaded && this.renderLegislatorRows()}
          </Table.Body>
        </Table>
      </div>
    )
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
