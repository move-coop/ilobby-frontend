// a reducer is a PURE function that takes the previous state and an action as arguments and returns new state based on the action.type
// import { /* your type here, CHANGE_MESSAGE */ } from '../actions/types'

// const API = "http://localhost:3000/legislators"

const chamberOptions = [
  {
    key: 'Senate',
    text: 'Senate',
    value: 'Senate',
    icon: 'angle double up'
  },
  {
    key: 'Assembly',
    text: 'Assembly',
    value: 'Assembly',
    icon: 'angle double down'
  }
]

const partyOptions = [
  {
    key: 'Democratic',
    text: 'Democratic',
    value: 'Democratic',
    icon: "thumbs up"
  },
  {
    key: 'Republican',
    text: 'Republican',
    value: 'Republican',
    icon: "thumbs down"
  }
]

const committeeOptions = [
  {
    key: 'Labor',
    text: 'Labor',
    value: 'Labor',
  },
  {
    key: 'Codes',
    text: 'Codes',
    value: 'Codes',
  },
  {
    key: 'Judiciary',
    text: 'Judiciary',
    value: 'Judiciary',
  }
]

const campaignOptions = [
  {
    key: '1',
    text: 'Bail Reform',
    value: '1'
  },
  {
    key: '2',
    text: 'Greenlight NYC',
    value: '2'
  },
  {
    key: '3',
    text: 'Single Payer Healthcare',
    value: '3'
  }
]

const actionTypeOptions = [
  {
    key: '1',
    text: 'Create Call List',
    value: '1'
  },
  {
    key: '2',
    text: 'Send Email',
    value: '2',
    disabled: true
  },
  {
    key: '3',
    text: 'Track Stances',
    value: '3',
    disabled: true
  }
]

const outcomeOptions = [
  {
    key: '1',
    text: "Left Message",
    value: 'Left Message'
  },
  {
    key: '2',
    text: "No Answer",
    value: 'No Answer'
  },
  {
    key: '3',
    text: "Spoke with Staff",
    value: 'Spoke with Staff'
  },
  {
    key: '4',
    text: "Spoke with Elected",
    value: 'Spoke with Elected'
  }
]

const commitmentOptions = [
  {
    key: '1',
    text: "Yes",
    value: 'Yes'
  },
  {
    key: '2',
    text: "No",
    value: 'No'
  },
  {
    key: '3',
    text: "Non-commital",
    value: 'Non-commital'
  }
]

const initialState = {
  currentUser: { 
    id: 1, 
    password_digest: "$2a$12$O4NTR9IaambgLm20pQkj5.lP4d.c8SglnunhTnuT.8d0piAxWBx7G", 
    email: "jas.schaffer@gmail.com", 
    created_at: "2020-02-26T20:54:06.690Z", 
    updated_at: "2020-02-26T20:54:06.690Z" 
  },

  legislatorDataLoaded: false,
  userDataLoaded: false,

  campaigns: [],
  actions: [],
  callLists: [],
  calls: [],

  campaignOptions: campaignOptions,
  campaignSelection: "",
  actionTypeOptions: actionTypeOptions,
  actionTypeSelection: "",
  actionNameInput: "",
  outcomeOptions: outcomeOptions,
  commitmentOptions: commitmentOptions,

  searchFilter: "",
  chamberFilter: "Senate",
  partyFilter: "",
  committeeFilter: [],
  
  chamberOptions: chamberOptions,
  partyOptions: partyOptions,
  committeeOptions: committeeOptions,
  
  legislators: [],
  // displayLegislators: [],
  // selectionCount: 0,

  cardView: false,

  campaignSearchInput: "",
  actionSearchInput: "",
  callListSearchInput: "",

  campaignNameInput: ""


}

const updateDisplayLegislators = (newState) => {
  const { legislators, searchFilter, chamberFilter, partyFilter, committeeFilter } = newState

  // apply 4 filers
  let displayLegislators = legislators.map(legislator => {
    if ((
      legislator.name.toLowerCase().includes(searchFilter.toLowerCase())
      || legislator.district.toString().includes(searchFilter)
    ) && (
      legislator.chamber.includes(chamberFilter) &&
      legislator.party.includes(partyFilter) &&
      
      // every() will result in showing legislators on ALL of the committeeFilter selections
      // every() defaults to true if committeeFilter is blank
      // some() will result in showing legislators on ANY of the committeeFilter selections
      // some() defaults to false if committeeFilter is blank
      (committeeFilter.length === 0 ? true : 
        committeeFilter.some( (element) => {
          return !!legislator.committees.find( committee => committee.name === element)
        })
      ) 
      
    )) {
      return {...legislator, display: true}
    } else {
      return {...legislator, display: false}
    }

  })
  // console.log("updateDisplayLegislators", displayLegislators)
  return displayLegislators
}

const updateDisplayCampaigns = (newState) => {
  const { campaignSearchInput, campaigns } = newState

  const displayCampaigns = campaigns.map(campaign => {
    if (campaign.name.toLowerCase().includes(campaignSearchInput.toLowerCase())) {
      return {...campaign, display: true}
    } else {
      return {...campaign, display: false}
    }
  }) 

  return displayCampaigns

}

const updateDisplayActions = (newState) => {
  const { actionSearchInput, campaigns, actions, legislators } = newState
  
  // belongs to one of the selected campaigns
  const displayCampaigns = campaigns.filter(campaign => campaign.display === true)
  const displayCampaignIds = displayCampaigns.map(campaign => campaign.id)
  
  const displayActions = actions.map(action => {

    // actionSearchInput is included in related legislator name or district
    const legislator = legislators.find(legislator => legislator.id === action.legislator_id)
    // debugger
    if (displayCampaignIds.includes(action.campaign_id) && (legislator.name.toLowerCase().includes(actionSearchInput.toLowerCase()) || legislator.district.toString().includes(actionSearchInput))) {
      return {...action, display: true}
    } else {
      return {...action, display: false}
    }
  })

return displayActions
}

const updateDisplayCallLists = (newState) => {
  const { callListSearchInput, callLists, campaigns } = newState

  const displayCampaigns = campaigns.filter(campaign => campaign.display === true)
  const displayCampaignIds = displayCampaigns.map(campaign => campaign.id)

  const displayCallLists = callLists.map(list => {
    if (displayCampaignIds.includes(list.campaign_id) && list.name.toLowerCase().includes(callListSearchInput.toLowerCase())) {
      return { ...list, display: true }
    } else {
      return { ...list, display: false }
    }
  })
  return displayCallLists
}

export const reducer = (prevState = initialState, action) => {
  let displayLegislators
  let newState
  let secondNewState
  let thirdNewState
  let newCalls
  let call
  let newActions
  let displayCampaigns
  let displayActions
  let displayCallLists
  let newCampaign

  switch (action.type) {
    case "SET_USER":
      console.log("SET USER:", action.payload.user)
      localStorage.token = action.payload.token  
      return { 
          ...prevState, 
          currentUser: action.payload.user
        }

    case "LOGOUT":
      return { ...prevState, currentUser: false }

  
    case "TOGGLE_CARDVIEW":
      console.log("toggling cardview !")
      return { ...prevState, cardView: !prevState.cardView }

    // case "TOGGLE":
    //   console.log("toggling!")
    //   return { ...prevState, currentUser: !prevState.currentUser }

    case "STORE_LEGISLATORS":
      // console.log("reducer legislators", action.payload)
      newState =  { ...prevState, legislators: action.payload }
      displayLegislators = updateDisplayLegislators(newState)
      return { ...newState, legislators: displayLegislators }
      
    case "STORE_USER_DATA":
      // console.log("reducer legislators", action.payload)
      const { campaigns, actions, call_lists, calls } = action.payload
      newState = {
        ...prevState, 
        campaigns,
        actions, 
        callLists: call_lists,
        calls
      }
      displayCampaigns = updateDisplayCampaigns(newState)
      displayActions = newState.actions.map(action => {
        return {...action, display: true}
      })
      displayCallLists = newState.callLists.map(list => {
        return {...list, display: true}
      })
      return {
        ...newState, 
        campaigns: displayCampaigns,
        actions: displayActions,
        callLists: displayCallLists
      }
      
    case "SEARCH_FILTER":
        console.log("search filtering!")
      newState = { ...prevState, searchFilter: action.payload }
      displayLegislators = updateDisplayLegislators(newState)
      return { ...newState, legislators: displayLegislators}
      
    case "CHAMBER_FILTER":
      console.log("chamber filtering!")
      newState = { ...prevState, chamberFilter: action.payload }
      displayLegislators = updateDisplayLegislators(newState)
      return { ...newState, legislators: displayLegislators}
      
    case "PARTY_FILTER":
      console.log("party filtering!", action.payload)
      newState = { ...prevState, partyFilter: action.payload }
      displayLegislators = updateDisplayLegislators(newState)
      return { ...newState, legislators: displayLegislators}
      
      case "COMMITTEE_FILTER":
        console.log("committee filtering!")
        newState = { ...prevState, committeeFilter: action.payload }
        displayLegislators = updateDisplayLegislators(newState)
        return { ...newState, legislators: displayLegislators}
      
      case "TOGGLE_ONE_SELECTION":
        console.log("toggle one selection", action.payload)
        let updatedLegislators = prevState.legislators.map(legislator => {
          if (legislator.id === parseInt(action.payload)){
            console.log(legislator.id)
            return { ...legislator, selected: !legislator.selected}
          } else {
            return legislator
          }
        })
        return {...prevState, legislators: updatedLegislators}

      case "TOGGLE_ALL_SELECTION":
        
        // get array of legislators currently displayed
        displayLegislators = prevState.legislators.filter(legislator => legislator.display === true)
        
        //  if there are any displayed legislators that are not selectd, then select them all
        console.log(displayLegislators.find(legislator => legislator.selected !== true), "leg !== true")
        if (!!displayLegislators.find(legislator => legislator.selected !== true)) {
          
          // map through legislators changing those currently displayed to selected = true
          let updatedLegislators = prevState.legislators.map(legislator => {
            if (legislator.display === true) {
              return {...legislator, selected: true}
            } else {
              return legislator
            }
          })
          return {...prevState, legislators: updatedLegislators }
        } else {
          // otherwise, map through legislators changing those currently displayed to selected = false
          let updatedLegislators = prevState.legislators.map(legislator => {
            if (legislator.display === true) {
              return {...legislator, selected: false}
            } else {
              return legislator
            }
          })
          return {...prevState, legislators: updatedLegislators }
        }

      case "CAMPAIGN_SELECTION":
        return {...prevState, campaignSelection: action.payload}
      
      case "ACTION_TYPE_SELECTION":
        return {...prevState, actionTypeSelection: action.payload}
      
      case "EDIT_ACTION_NAME":
        return {...prevState, actionNameInput: action.payload}

      case "ADD_TA_RESPONSE_TO_STORE":
        console.log("addTAResponseToStore", action.payload)
        debugger
        return {
          ...prevState,
          callLists: [...prevState.callLists, action.payload.callList],
          calls: [...prevState.calls, ...action.payload.calls],
          actions: [...prevState.actions, ...action.payload.actions]
        }

      case "USER_DATA_LOADED":
        return {...prevState, userDataLoaded: true}
      
      case "LEGISLATOR_DATA_LOADED":
        return {...prevState, legislatorDataLoaded: true}

      case "UPDATE_CALL_OUTCOME":
        console.log("update call outcome", action.payload)
        newCalls = prevState.calls.map(call => {
          if (call.id === action.payload.id) {
            return {...call, outcome: action.payload.value, changed: true}
          } else {
            return call
          }
        })
        return {...prevState, calls: newCalls }

      case "UPDATE_CALL_COMMITMENT":
        console.log("update call commitment", action.payload)
        newCalls = prevState.calls.map(call => {
          if (call.id === action.payload.id) {
            return { ...call, commitment: action.payload.value, changed: true }
          } else {
            return call
          }
        })
        return { ...prevState, calls: newCalls }

      case "UPDATE_CALL_NOTES":
        console.log("update call notes", action.payload)
        newCalls = prevState.calls.map(call => {
          if (call.id === action.payload.id) {
            return {...call, notes: action.payload.value, changed: true}
          } else {
            return call
          }
        })
        return {...prevState, calls: newCalls }

      case "UPDATE_CALL_DURATION":
        console.log("update call duration", action.payload)
        newCalls = prevState.calls.map(call => {
          if (call.id === action.payload.id) {
            return { ...call, duration: action.payload.value, changed: true }
          } else {
            return call
          }
        })
        return { ...prevState, calls: newCalls }

      case "RESET_CALL_CHANGED":
        console.log("hitting1")
        newCalls = prevState.calls.map(call => {
          if (call.id === action.payload.id) {
            console.log("hitting2")
            return { ...call, changed: false }
          } else {
            return call
          }
        })
        return { ...prevState, calls: newCalls }


      case "UPDATE_ACTION_COMPLETE":
        call = prevState.calls.find(call => call.id === action.payload.id)  
        newActions = prevState.actions.map(act => {
          if (act.id === call.action_id && !!call.outcome && !!call.duration && !!call.notes && call.commitment) {
            return { ...act, complete: true }
          } else {
            return act
          }
        })
        return { ...prevState, actions: newActions }
      
      case "CHANGE_CAMPAIGN_INPUT":
        newState = { ...prevState, campaignSearchInput: action.payload}
        displayCampaigns = updateDisplayCampaigns(newState)
        
        secondNewState = {...newState, campaigns: displayCampaigns}
        displayActions = updateDisplayActions(secondNewState)
        
        thirdNewState = {...secondNewState, actions: displayActions}
        displayCallLists = updateDisplayCallLists(thirdNewState)
        return {...thirdNewState, callLists: displayCallLists}
      

      case "CHANGE_ACTION_INPUT":
        newState = { ...prevState, actionSearchInput: action.payload }
        displayActions = updateDisplayActions(newState)
        return { ...newState, actions: displayActions }
        
      case "CHANGE_CALL_LIST_INPUT":
        newState = { ...prevState, callListSearchInput: action.payload}
        displayCallLists = updateDisplayCallLists(newState)
        return { ...newState, callLists: displayCallLists }

      case "UPDATE_CAMPAIGN_NAME_INPUT":
        console.log("UPDATE_CAMPAIGN_NAME_INPUT", action.payload)
        return { ...prevState, campaignNameInput: action.payload}
    
      case "ADD_CAMPAIGN":
        newCampaign = {
          ...action.payload,
          display: true
        }
        return { ...prevState, campaigns: [...prevState.campaigns, newCampaign]}
      
    default:
      return prevState;
  }
};

