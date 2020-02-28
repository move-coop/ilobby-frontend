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
  currentUser: { 
    id: 1, 
    password_digest: "$2a$12$O4NTR9IaambgLm20pQkj5.lP4d.c8SglnunhTnuT.8d0piAxWBx7G", 
    email: "jas.schaffer@gmail.com", 
    created_at: "2020-02-26T20:54:06.690Z", 
    updated_at: "2020-02-26T20:54:06.690Z" 
  },

  campaigns: [],
  actions: [],
  legislatorActions: [],
  callLists: [],
  calls: [],

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

      case "ADD_TA_RESPONSE_TO_STORE":
        console.log("addTAResponseToStore", action.payload)
        return {
          ...prevState,
          callLists: [...prevState.callLists, action.payload.callList],
          calls: [...prevState.calls, ...action.payload.calls],
          actions: [...prevState.actions, ...action.payload.actions],
          legislatorActions: [...prevState.legislatorActions, ...action.payload.legislatorActions]
        }
      
      // case "ADD_CAMPAIGN":
      //   // post request
      //   // add to campaign options
      //   return {...prevState, campaignSelection: action.payload}
      
    default:
      return prevState;
  }
};

