import React from "react";
import { connect } from 'react-redux'
import { Checkbox, Dimmer, Table, Dropdown, Input, Header, Loader, List, Button, Icon, Grid } from "semantic-ui-react";
import EditCampaignModal from "../Components/EditCampaignModal"
import EditCallListModal from "../Components/EditCallListModal";


class CallListContainer extends React.Component {

  state = {
    currentSortedCalls: [],
    actions: []
  }

  componentDidMount() {
    if (!!this.props.userDataLoaded && !!this.props.legislatorDataLoaded ) {
      this.setState({
        currentSortedCalls: this.getCurrentSortedCallsFunc(),
        actions: this.getCurrentSortedCallsFunc().map(call => {
          return this.callActionFunc(call)
        })
      })

    }
  }

  componentDidUpdate(prevProps) {
    console.log("CallListContainer did Update")
    if (!!this.props.userDataLoaded && !!this.props.legislatorDataLoaded && prevProps !== this.props) {
      this.setState({
        currentSortedCalls: this.getCurrentSortedCallsFunc(),
        actions: this.getCurrentSortedCallsFunc().map(call => {
          return this.callActionFunc(call)
        })
      })

    }
  }

  // functions needed to set state
  callActionFunc = (call) => this.props.actions.find(action => action.id === call.action_id)
  callLegislatorFunc = (call) => this.props.legislators.find(legislator => legislator.id === this.callActionFunc(call).legislator_id)
  currentCallList = () => this.props.callLists.find(list => list.id === parseInt(this.props.match.params.id))
  getCurrentSortedCallsFunc = () => {
    const currentCalls = this.props.calls.filter(call => call.call_list_id === this.currentCallList().id)
    const currentSortedCalls = currentCalls.sort((a, b) => this.callLegislatorFunc(a).name.localeCompare(this.callLegislatorFunc(b).name))
    return currentSortedCalls
  }

  patchCallData = (call) => {
    // update store with call data data (optimistic)

    this.props.updateCallDetails(call)

    const url = `${process.env.REACT_APP_ILOBBY_API}/calls/${call.id}`
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
    }, )
  }

  // local state change handlers
  updateCallOutcome = (e, data) => {
    const newSortedCalls = this.state.currentSortedCalls.map(call => {
      if (call.id === data.callid) {
        return {...call, outcome: data.value}
      } else {
        return call
      }
    })

    this.setState({
      currentSortedCalls: newSortedCalls
    })
  }

  updateCallCommitment = (e, data) => {
    const newSortedCalls = this.state.currentSortedCalls.map(call => {
      if (call.id === data.callid) {
        return { ...call, commitment: data.value }
      } else {
        return call
      }
    })

    this.setState({
      currentSortedCalls: newSortedCalls
    })
  }


  updateCallDuration = (e, data) => {
    const newSortedCalls = this.state.currentSortedCalls.map(call => {
      if (call.id === data.callid) {
        return { ...call, duration: parseInt(data.value) }
      } else {
        return call
      }
    })

    this.setState({
      currentSortedCalls: newSortedCalls
    })
  }


  updateCallNotes = (e, data) => {
    const newSortedCalls = this.state.currentSortedCalls.map(call => {
      if (call.id === data.callid) {
        return { ...call, notes: data.value }
      } else {
        return call
      }
    })

    this.setState({
      currentSortedCalls: newSortedCalls
    })
  }




  renderLegislatorRows = () => {
       
    const callActionViaState = (call) => this.state.actions.find(action => action.id === call.action_id)
    const phoneNumbers = (legislator) => {
      
      let voices = legislator.contact_infos.filter(contactInfo => contactInfo.kind === 'voice')
      let numbers = voices.map((voice, i) => <List key={i} ><List.Icon name="phone" /> {voice.value}</List> )

    return numbers
    }
    
    //map through legislators and craete a table row for each
    const legislatorRows = this.state.currentSortedCalls.map(call => { 
      const callViaProps = this.props.calls.find(callViaProps => call.id === callViaProps.id)
      const noChanges = (call.outcome === callViaProps.outcome &&
        call.commitment === callViaProps.commitment &&
        (call.duration === callViaProps.duration || (!call.duration && !callViaProps.duration)) &&
        call.notes === callViaProps.notes)
      const legislator = this.callLegislatorFunc(call)
      return (
        <Table.Row key={call.id}>
          <Table.Cell >
            {callActionViaState(call).complete ? <Icon name='check' color='green' /> : <Icon name='wait' color='red' />}
          </Table.Cell>
          <Table.Cell >
            {legislator.chamber === "Senate" ? "Sen." : "Assemb."} {legislator.name} ({legislator.party === "Democratic" ? "D-" : "R-"}{legislator.district})
          </Table.Cell>
          <Table.Cell>{phoneNumbers(legislator)}</Table.Cell>
          <Table.Cell><Dropdown
            callid={call.id}
            placeholder="Outcome..."
            selection
            clearable
            options={this.props.outcomeOptions}
            value={call.outcome}
            onChange={(e, data) => this.updateCallOutcome(e, data)}
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
            onChange={(e, data) => this.updateCallCommitment(e, data)}
            /></Table.Cell>
          <Table.Cell>
            <Input
              fluid
              callid={call.id}
              type="number"
              onChange={(e, data) => this.updateCallDuration(e, data)}
              value={call.duration || ""}
            />
          </Table.Cell>
          <Table.Cell>
            <Input 
              fluid
              callid={call.id}
              onChange={(e, data) => this.updateCallNotes(e, data) } 
              value={call.notes || ""}
            />
          </Table.Cell>
          <Table.Cell>
            <Button 
              disabled={noChanges}
              color={!noChanges && "green"}
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

  // function needed for render
  currentCampaign = () => this.props.campaigns.find(campaign => campaign.id === this.currentCallList().campaign_id)  

  render() {

    const callListCalls = this.props.calls.filter(call => call.call_list_id === this.currentCallList().id)
    const completeCalls = callListCalls.filter(call => {
      const callAction = this.props.actions.find(action => call.action_id === action.id)
      return callAction.complete
    })
    const totalMinutes = callListCalls.reduce((total, call) => {
      let mins = call.duration ? call.duration : 0
      return (total + mins)
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
            {(this.state.currentSortedCalls.length > 0 &&
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
   
    updateActionComplete: (id) => {
      dispatch({ type: "UPDATE_ACTION_COMPLETE", payload: { id } })
    },
    updateCallDetails: (json) => {
      dispatch({ type: "UPDATE_CALL_DETAILS", payload: { ...json } })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CallListContainer)
