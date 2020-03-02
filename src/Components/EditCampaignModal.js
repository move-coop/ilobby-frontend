import React, { useState } from 'react'
import { Icon, Input, Modal, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

const EditCampaignModal = (props) => {

  const [getModalOpen, setModalOpen] = useState(false)

  const handleOpen = () => { 
    props.updateCampaignNameInput(props.name)
    setModalOpen(true) 
  }
  const handleClose = () => {
    setModalOpen(false)
    props.updateCampaignNameInput("")

  }

  const handleSave = () => {

    const url = `http://localhost:3000/campaigns/${props.id}`
    const configObj = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        campaign: {
          name: props.campaignNameInput        }
      })
    }

    console.log(url)
    console.log(configObj)
    fetch(url, configObj)
      .then(resp => resp.json())
      .then(json => {
        props.editCampaign(json)
      })

    handleClose()
  }

  const handleDelete = () => {

    const url = `http://localhost:3000/campaigns/${props.id}`
    const configObj = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      }
    }

    console.log(url)
    console.log(configObj)
    fetch(url, configObj)
      .then(resp => resp.json())
      .then(json => {
        console.log(json)
      })

    props.deleteCampaign(props.id)
    handleClose()
  }

  return (
    <Modal
      basic
      closeIcon
      open={getModalOpen}
      onClose={handleClose}
      trigger={
        <Button onClick={handleOpen} floted='right' circular icon size="mini" ><Icon name="pencil" /></Button>  
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
          color='red'
          inverted
          onClick={handleDelete}
        >
          <Icon name='delete' /> Delete
        </Button>
        <Button
          color='green'
          inverted
          onClick={handleSave}
        >
          <Icon name='angle double right' /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    campaignNameInput: state.campaignNameInput
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCampaignNameInput: (value) => {
      dispatch({ type: "UPDATE_CAMPAIGN_NAME_INPUT", payload: value })
    },
    editCampaign: (campaign) => {
      dispatch({ type: "EDIT_CAMPAIGN", payload: campaign })
    },
    deleteCampaign: (id) => {
      dispatch({ type: "DELETE_CAMPAIGN", payload: id })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCampaignModal);