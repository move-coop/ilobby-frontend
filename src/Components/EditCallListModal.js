import React, { useState } from "react";
import { Divider, Dropdown, Header, Icon, Input, Label, Modal, Button } from "semantic-ui-react";
import { connect } from "react-redux";

const EditCallListModal = props => {
  
  const [getModalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    const callList = currentCallList()
    const campaign = currentCampaign()
    props.updateCallListNameInput(callList.name);

    let option = props.campaignOptions.find(option => option.value === campaign.id)

    props.editCampaignSelection(option)
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    props.updateCallListNameInput("");
  };

  const handleSave = () => {
    const url = `${process.env.REACT_APP_ILOBBY_API}/call_lists/${props.match.params.id}`;
    const token = localStorage.token;
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Accepts': "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        call_list: {
          // id: props.match.params.id,
          name: props.callListNameInput,
          campaign_id: props.campaignSelection
        }
      })
    };

    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {
      props.editCallList({
        id: json.id,
        campaign_id: json.campaign.id,
        name: json.name,
        created_at: json.created_at,
        updated_at: json.updated_at
      });
    })
    .catch(err => {
      alert('Edit Call List: fetch error')
      console.log(err)
    });

    handleClose();
  };

  const handleDelete = () => {
    const url = `${process.env.REACT_APP_ILOBBY_API}/call_lists/${props.id}`;
    const token = localStorage.token;
    const configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        "Authorization": token
      }
    };

    console.log(url);
    console.log(configObj);
    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {
      console.log(json);
    })
    .catch(err => {
      alert('Delete Call List: fetch error')
      console.log(err)
    });

    props.deleteCallList(props.id);
    handleClose();
  };

    const currentCallList = () =>
      props.callLists.find(
        list => list.id === parseInt(props.match.params.id)
      );
    const currentCampaign = () =>
      props.campaigns.find(
        campaign => campaign.id === currentCallList().campaign_id
      );  


  return (
    <Modal
      basic
      closeIcon
      open={getModalOpen}
      onClose={handleClose}
      trigger={
        <Button basic compact onClick={handleOpen} icon size="small">
          <Icon name="pencil" />
        </Button>
      }
    >
      <Modal.Header>Edit Call List</Modal.Header>
      <Modal.Content>
        <Header size="tiny" inverted>
          Call List Name:
        </Header>
        <Input
          fluid
          inverted
          value={props.callListNameInput}
          onChange={e => props.updateCallListNameInput(e.target.value)}
        />
        <Divider hidden />
        <Header size="tiny" inverted>
          Campaign:
        </Header>
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
      </Modal.Content>
      <Modal.Actions>
        {/* DISABLING CAMPAIGN DELETE FUNCTIONALITY FOR NOW. 
       * IT TOUCHES SO MANY PIECES AND IT"S NOT CLEAR HOW ESSENTIAL IT IS ANYHOW */}

        {/* <Button color="red" inverted onClick={handleDelete}>
          <Icon name="delete" /> Delete
        </Button> */}
        <Button 
          color="green" 
          inverted 
          disabled={!(props.campaignSelection !== "" && props.callListNameInput !== "")}
          onClick={handleSave}>
          <Icon name="angle double right" /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    callListNameInput: state.callListNameInput,
    // campaignNameInput: state.campaignNameInput,
    campaignOptions: state.campaignOptions,
    campaignSelection: state.campaignSelection
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCallListNameInput: value => {
      dispatch({ type: "UPDATE_CALL_LIST_NAME_INPUT", payload: value });
    },
    editCallList: callList => {
      dispatch({ type: "EDIT_CALL_LIST", payload: callList });
    },
    deleteCallList: id => {
      dispatch({ type: "DELETE_CALL_LIST", payload: id });
    },
    editCampaignSelection: (valueObj) => {
      console.log("editCampaignSelection", valueObj.value)
      dispatch({ type: "CAMPAIGN_SELECTION", payload: valueObj.value });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCallListModal);
