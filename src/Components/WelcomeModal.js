import React, { useState } from 'react'
import { Icon, Input, Modal, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

const WelcomeModal = () => {

  const [getModalOpen, setModalOpen] = useState(false)

  const handleClose = () => {
    setModalOpen(false)
  }

  return (
    <Modal
      basic
      closeIcon
      open={getModalOpen}
      onClose={handleClose}
      >
      <Modal.Header>Welcome to iLobby</Modal.Header>
      <Modal.Content >
        {`Functionality pertaining to user accounts is currently suspended.`}
        <br />
        {"In the meantime, please enjoy this working deploy which has a single, common demo user account."}
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='green'
          inverted
          onClick={handleClose}
        >
          <Icon name='check' /> OK
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default WelcomeModal;