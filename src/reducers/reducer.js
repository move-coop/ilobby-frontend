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

const initialState = {
  currentUser: false,

  campaignOptions: campaignOptions,
  campaignSelection: "",
  actionTypeOptions: actionTypeOptions,
  actionTypeSelection: "",
  actionNameInput: "",

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

  cardView: false

}

const updateDisplayLegislators = (newState) =>{
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

const createNewAction = (payload, userId) => {
  // hard coding for call list creation and therefore not making user of payload.actionTypeId

  // create 1 Call list
  const callListId = createCallList(payload.actionName, payload.campaignId)
  
  // for each legislator selected (7)...
  payload.legislators.forEach(legislator => {
  
    // create action with user_id and campaign_id. type, status=backlog
    const actionId = createAction(userId, payload.campaignId)
    // create legislator action. one for each action id and one for each legislator id
    createLegislatorAction(actionId, legislator.id)
    // create call. one for each action id. Eachwith call_list_id
    createCall(actionId, callListId)
    
  });
  
  // these last ones might go back in the main reducer function?
    // clear store values for:
    // campaignSelection: state.campaignSelection,
    // actionTypeSelection: state.actionTypeSelection,
    // actionNameInput: state.actionNameInput
  // redirect to calllists/:id

}

const createCallList = (name, campaignId) => {
  // fetch post request
  // return callListId
}

const createAction = (userId, campaignId, type) => {
  // fetch post request
  // return actionId
}

const createLegislatorAction = (actionId, legislatorId) => {
  // fetch post request
}

const createCall = (actionId, callListId) => {
  // fetch post request
}



export const reducer = (prevState = initialState, action) => {
  let displayLegislators
  let newState

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

      case "CREATE_NEW_ACTION":
        console.log("create new action", action.payload)
        // createNewAction(payload, prevState.currentUser.id)
        return {...prevState}
      
      // case "ADD_CAMPAIGN":
      //   // post request
      //   // add to campaign options
      //   return {...prevState, campaignSelection: action.payload}
      
    default:
      return prevState;
  }
};
