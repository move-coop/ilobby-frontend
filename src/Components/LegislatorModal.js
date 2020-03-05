import React from 'react'
import { Divider, Icon, Image, List, Modal, Grid, Button, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import TwitterEmbed from './TwitterEmbed'

const LegislatorModal = (props) => {

  const contactInfoObj = props.contact_infos.reduce((acc, info) => {
    
    if (!acc[info.note]) {
      acc = {
        ...acc,
        [info.note]: {
          [info.kind]: info.value
        }
      }
    } else {
      const newNoteValue = {
        ...acc[info.note],
        [info.kind]: info.value
      }
      acc = {
        ...acc,
        [info.note]: newNoteValue
      }
    }

    return acc  
  }, {})

  
  const renderContactInfos = Object.keys(contactInfoObj).map((value) => {
    return (
      <Grid.Column key={value}>
        <Grid >
          <Grid.Row stretched>
            <Header inverted size="small">
              {value}
            </Header>
          </Grid.Row>
          {Object.keys(contactInfoObj[value]).map(inner => {
            return (
              <Grid.Row key={inner} stretched>
                <Grid.Column width="4">
                  {inner.slice(0, 1).toUpperCase() + inner.slice(1)}:{" "}
                </Grid.Column>
                <Grid.Column width="12">
                  {contactInfoObj[value][inner].replace(/\,/g, `\n`).replace(/\;/g, `\n`)}
                </Grid.Column>
              </Grid.Row>
            );
          })}
        </Grid>
      </Grid.Column>
    );
    
  })

  const renderCommittees = props.committees.map(committee => {
    return <List.Item key={committee.id}>
      {committee.name}
    </List.Item>
  })


  return (
    <Modal
      basic
      closeIcon
      trigger={
        <Button compact floated="right" size="mini">
          Profile
        </Button>
      }
    >
      <Modal.Header>{`${props.chamber === "Senate" ? "Sen." : "Assemb."} ${
        props.name
      } (${props.party === "Democratic" ? "D-" : "R-"}${
        props.district
      })`}</Modal.Header>
      <Modal.Content image scrolling>
        <Image circular wrapped size="medium" src={props.image} />
        <Modal.Description>
          <Grid >
            <Grid.Row id="contactsAndCommittees">
              <Header inverted color='green' >Contact Information</Header>
            </Grid.Row>
            <Grid.Row columns="equal">{renderContactInfos}</Grid.Row>
            <Grid.Row>
              <Header inverted color='green'>Committees</Header>
            </Grid.Row>
            <Grid.Row>
              <List bulleted>{renderCommittees}</List>
            </Grid.Row>
            <Grid.Row columns="1">
              <Header icon color='green' >
                Twitter
                  {/* <Icon inverted name="twitter" /> */}
                </Header>
            </Grid.Row>
            <Grid.Row id="twitter" columns="1">
                <TwitterEmbed {...props} />
            </Grid.Row>
          </Grid>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

const mapStateToProps = state => {
  return {
    legislatorDataLoaded: state.legislatorDataLoaded
  }
}

export default connect(mapStateToProps)(LegislatorModal);