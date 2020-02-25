import React from 'react'
import { Image, Modal, Grid, Button, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import TwitterEmbed from './TwitterEmbed'

const LegislatorModal = (props) => {

  return(
    <Modal 
      basic
      closeIcon
      trigger={<Button compact floated='right' size="mini">Profile</Button>}>
      <Modal.Header>{`${props.chamber === "Senate" ? "Sen." : "Assemb."} ${props.name} (${props.party === "Democratic" ? "D-" : "R-"}${props.district})`}</Modal.Header>
      <Modal.Content image scrolling >
        <Image circular wrapped size='medium' src={props.image} />
        <Modal.Description>
          <Grid>
            <Grid.Row id="contactsAndCommittees">
              <Header>Contact Information</Header>
              <Header>Committees</Header>
              
            </Grid.Row>
            <Grid.Row id="twitter">
              <TwitterEmbed {...props} />
            </Grid.Row>
          </Grid>
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

export default connect(mapStateToProps)(LegislatorModal);