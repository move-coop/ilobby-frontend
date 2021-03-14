import React, { useState } from 'react'
import { Icon, Input, Modal, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

const AddCampaignModal = (props) => {

  const [getModalOpen, setModalOpen] = useState(false)

  const handleOpen = () => { setModalOpen(true) }
  const handleClose = () => { 
    setModalOpen(false)
    props.updateCampaignNameInput("")

  }

  const handleSubmit = () => {
    
    const url = `${process.env.REACT_APP_ILOBBY_API}/campaigns`
    const token = localStorage.token;
    const configObj = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
        "Authorization": token
      },
      body: JSON.stringify({
        campaign: {
          name: props.campaignNameInput,
          user_id: props.id
        }
      })
    }

    console.log(url)
    console.log(configObj)
    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {
      props.addCampaign(json)
    })
    .catch(err => {
        alert('Create Campaign: fetch error')
        console.log(err)
      })

    handleClose()
  }

  return (
    <Modal
      basic
      closeIcon
      open={getModalOpen}
      onClose={handleClose}
      trigger={
        <Button 
          onClick={handleOpen}
          size="small" 
          icon>
          <Icon name='add' /></Button>
      }>
      <Modal.Header>Add Campaign</Modal.Header>
      <Modal.Content >
        <Input 
          fluid 
          inverted 
          value={props.campaignNameInput}
          onChange={(e) => props.updateCampaignNameInput(e.target.value)} 
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='green'
          inverted
          onClick={handleSubmit}
        >
          <Icon name='angle double right' /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    id: state.id,
    currentUser: state.currentUser,
    campaignNameInput: state.campaignNameInput
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCampaignNameInput: (value) => {
      dispatch({ type: "UPDATE_CAMPAIGN_NAME_INPUT", payload: value })
    },
    addCampaign: (campaign) => {
      dispatch({ type: "ADD_CAMPAIGN", payload: campaign })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCampaignModal);