import React from 'react'
import { Divider, Form, Icon, Image, Input, List, Modal, Grid, Button, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import TwitterEmbed from './TwitterEmbed'

const LegislatorModal = (props) => {
  const [note, setNote] = React.useState('')
  
  React.useEffect(() => {
    setNote(props.note.contents)
  }, [props.note.contents])

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

  const handleNoteChange = (event) => {
    setNote(event.target.value)
  }

  const updateNote = () => {
    const token = localStorage.token;
    const url = `${process.env.REACT_APP_ILOBBY_API}/notes/${props.note.id}`
    const configObj = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
        "Authorization": token
      },
      body: JSON.stringify({
        note: {
          contents: note
        }
      })
    }
  
    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {
      console.log('this is the updated note:', json)
      props.editNote(json)
    })
    .catch(err => {
      alert('Update Note: fetch error')
      console.log(err)
    })

  }

  const createNote = () => {
    const token = localStorage.token;
    const url = `${process.env.REACT_APP_ILOBBY_API}/notes`
    const configObj = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
        "Authorization": token
      },
      body: JSON.stringify({
        note: {
          contents: note,
          legislator_id: props.id,
          user_id: props.user_id
        }
      })
    }
  
    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {
      console.log('this is the new note:', json)
      props.createNote(json)
    })
    .catch(err => {
      alert('Create Note: fetch error')
      console.log(err)
    })

  }
  
  const handleNoteSave = () => {
    console.log('save note', note)

    if (!!props.note.id) {
      updateNote()
    } else {
      createNote()
    }
  }

  const formStyle = {
    width: '100%'
  };

  const formatDate = (dateStr) => {
    if (dateStr) {
      const date = new Date(dateStr)
      const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago', timeZoneName: 'short' }
      return date.toLocaleString('en-US', options)
    } else {
      return 'never'
    }
  }


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
            <Grid.Row columns="equal">
              <Grid.Column>
                <Grid>
                  <Grid.Row>
                    <Header inverted color='green'>Committees</Header>
                  </Grid.Row>
                  <Grid.Row>
                    <List bulleted>{renderCommittees}</List>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row>
                    <Header inverted color='red'>
                      Notes
                      <Header.Subheader>
                        {`Updated: ${formatDate(props.note.updated_at)}`}
                      </Header.Subheader>
                    </Header>
                  </Grid.Row>
                  <Grid.Row>
                    <Form style={formStyle}>
                      <Form.TextArea value={note} onChange={handleNoteChange} onBlur={handleNoteSave} />
                    </Form>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="1">
              <Header icon color='green' >
                Twitter
                  {/* <Icon inverted name="twitter" /> */}
                </Header>
            </Grid.Row>
            <Grid.Row id="twitter" columns="1">
                {props.twitter ? <TwitterEmbed {...props} /> : `${props.chamber === "Senate" ? "Sen." : "Assemb."} ${props.name} seems not to use Twitter`}
            </Grid.Row>
          </Grid>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

const mapStateToProps = state => {
  return {
    user_id: state.id,
    legislatorDataLoaded: state.legislatorDataLoaded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editNote: (note) => {
      dispatch({ type: "EDIT_NOTE", payload: note })
    },
    createNote: (note) => {
      dispatch({ type: "CREATE_NOTE", payload: note })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LegislatorModal);