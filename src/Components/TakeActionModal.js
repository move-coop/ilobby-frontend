import React, {useState} from 'react'
import { Input, Icon, Dropdown, Modal, Header, Button, Grid, List, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'

const TakeActionModal = (props) => {

  let selectedLegislators = props.legislators.filter(legislator => legislator.selected === true && legislator.display === true)
  let renderedSelectedLegislators = selectedLegislators.map(legislator => {
    return <List.Item key={legislator.id} >
      {legislator.chamber === "Senate" ? "Sen." : "Assemb."} {legislator.name} ({legislator.party === "Democratic" ? "D-" : "R-"}{legislator.district})
    </List.Item>
  })

  const [getModalOpen, setModalOpen] = useState(false)

  const handleOpen = () => {setModalOpen(true)}
  const handleClose = () => {setModalOpen(false)}
  const handleSubmit = () => {

    let selectedLegislatorIds = selectedLegislators.map(legislator => legislator.id)

    createCallList({
        call_list_name: props.actionNameInput,
        campaign_id: props.campaignSelection,
        legislator_ids: selectedLegislatorIds,
        current_user_id: props.id
    })
    handleClose()
  }

  const createCallList = (bodyObj) => {
    // fetch post request
    const url = `${process.env.REACT_APP_ILOBBY_API}/call_lists`
    const token = localStorage.token;
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({call_list: bodyObj})
    }

    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
      
      // add responses to store: currentUser.callLists
      props.addTAResponseToStore({
        callList: {
          id: json.id,
          campaign_id: json.campaign.id,
          name: json.name,
          created_at: json.created_at,
          updated_at: json.updated_at,
          display: true

        },
        calls: json.calls,
        // actions: json.call_actions
        actions: json.call_actions.map(action => ({...action, display: true}))
      })

      // clear store values for modal fields:
      props.editCampaignSelection({value: ""})
      props.editActionTypeSelection({value: ""})
      props.editActionName({value: ""})

      // clear selected legislators
      selectedLegislators.forEach(legislator => {
        legislator.selected = false
      })
        
      // reset filters and display legislators ?

      // set current CallList and Campaign for rendering callList page
      
      
      // redirect to calllists/:id
      props.history.push(`/campaigns/calllists/${json.id}`)

    })
    .catch(err => {
        alert('Create Call List: fetch error')
        console.log(err)
      })

  }

  
  return(
    <Modal 
      basic
      closeIcon
      open={getModalOpen}
      onClose={handleClose}
      trigger={
        <Button
          size='mini'
          color='purple'
          disabled = {selectedLegislators.length === 0} 
          onClick={handleOpen} 
        >Take Action</Button>}>
      <Modal.Header>Take Action</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Grid padded columns='equal'>
            <Grid.Column >
              <Grid.Row>
                <Dropdown
                  placeholder="Select Campaign..."
                  fluid
                  search
                  selection
                  clearable
                  // allowAdditions
                  options={props.campaignOptions}
                  value={props.campaignSelection}
                  onAddItem={(e, { value }) => props.addCampaign({ value })}
                  onChange={(e, { value }) => props.editCampaignSelection({ value })}
                />                

                <Divider />

                <Dropdown
                  placeholder="Select Action Type..."
                  fluid
                  search
                  selection
                  clearable
                  options={props.actionTypeOptions}
                  value={props.actionTypeSelection}
                  onChange={(e, { value }) => props.editActionTypeSelection({ value })}
                />

                <Divider />

                <Input
                  placeholder="Name Call List..."
                  fluid
                  value={props.actionNameInput}
                  onChange={(e, { value }) => props.editActionName({ value })}
                />

              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row stretched>
                <Header inverted>{selectedLegislators.length} Selected Legislators</Header>
                <List>
                  {renderedSelectedLegislators}
                </List>

              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button 
          color='green' 
          inverted
          disabled={ !(props.campaignSelection !== "" && props.actionTypeSelection !== "" && props.actionNameInput !== "") }
          onClick={handleSubmit}>
          <Icon name='angle double right' /> Take Action!
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    legislators: state.legislators,
    campaignOptions: state.campaignOptions,
    campaignSelection: state.campaignSelection,
    actionTypeOptions: state.actionTypeOptions,
    actionTypeSelection: state.actionTypeSelection,
    actionNameInput: state.actionNameInput,
    currentUser: state.currentUser,
    id: state.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editCampaignSelection: (valueObj) => {
      console.log("editCampaignSelection", valueObj.value)
      dispatch({ type: "CAMPAIGN_SELECTION", payload: valueObj.value });
    },
    editActionTypeSelection: (valueObj) => {
      console.log("editActionTypeSelection", valueObj.value)
      dispatch({ type: "ACTION_TYPE_SELECTION", payload: valueObj.value });
    },
    editActionName: (valueObj) => {
      console.log("editActionName", valueObj.value)
      dispatch({ type: "EDIT_ACTION_NAME", payload: valueObj.value });
    },
    addTAResponseToStore: (valueObj) => {
      console.log("addTAResponseToStore")
      dispatch({ type: "ADD_TA_RESPONSE_TO_STORE", payload: valueObj });
    }
    
    // addCampaign: (valueObj) => {
    //   console.log("addCampaign", valueObj.value)
    //   dispatch({ type: "ADD_CAMPAIGN", payload: valueObj.value });
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TakeActionModal);