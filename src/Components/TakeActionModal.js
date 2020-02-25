import React from 'react'
import { Image, Modal, Header, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

const TakeActionModal = (props) => {

  return(
    <Modal trigger={<Button>Take Action</Button>}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Image wrapped size='medium' src='/images/avatar/large/rachel.png' />
        <Modal.Description>
          <Header>Take Action</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
        </p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    legislators: state.legislators
  }
}

export default connect(mapStateToProps)(TakeActionModal);