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

const initialState = {
  currentUser: true,

  searchFilter: "",
  chamberFilter: "Senate",
  partyFilter: "",
  committeeFilter: [],
  
  chamberOptions: chamberOptions,
  partyOptions: partyOptions,
  committeeOptions: committeeOptions,
  
  legislators: [],
  displayLegislators: [],
  selectionCount: 0

}

// const fetchActionCreator = () => {
//   return (dispatch) => {
//     fetch(API)
//       .then(res => res.json())
//       .then(data => dispatch({ type: STORE_LEGISLATORS, payload: data }))
//   }
// }

const updateDisplayLegislators = (newState) =>{
  const { legislators, searchFilter, chamberFilter, partyFilter, committeeFilter } = newState

  // apply 4 filers
  let displayLegislators = legislators.filter(legislator => (
    (
      legislator.name.toLowerCase().includes(searchFilter.toLowerCase())
      || legislator.district.toString().includes(searchFilter)
    ) && (
      legislator.chamber.includes(chamberFilter) &&
      legislator.party.includes(partyFilter)
      // include committees once that is serialized from the backend
    )
  ))
  console.log("updateDisplayLegislators", displayLegislators)
  return displayLegislators
}


export const reducer = (prevState = initialState, action) => {
  let displayLegislators
  let newState

  switch (action.type) {
    case "TOGGLE":
      console.log("toggling!")
      return { ...prevState, currentUser: !prevState.currentUser }

    case "STORE_LEGISLATORS":
      console.log("reducer legislators", action.payload)
      newState =  { ...prevState, legislators: action.payload }
      displayLegislators = updateDisplayLegislators(newState)
      return { ...newState, displayLegislators: displayLegislators }

    case "UPDATE_DISPLAY_LEGISLATORS":
      if (prevState.displayLegislators !== action.payload) {
        return { ...prevState, displayLegislators: action.payload }
      } else {
        return prevState;
      }

    case "SEARCH_FILTER":
      console.log("search filtering!")
      newState = { ...prevState, searchFilter: action.payload }
      displayLegislators = updateDisplayLegislators(newState)
      return { ...newState, displayLegislators: displayLegislators}

    case "CHAMBER_FILTER":
      console.log("chamber filtering!")
      newState = { ...prevState, chamberFilter: action.payload }
      displayLegislators = updateDisplayLegislators(newState)
      return { ...newState, displayLegislators: displayLegislators}

    case "PARTY_FILTER":
      console.log("party filtering!", action.payload)
      newState = { ...prevState, partyFilter: action.payload }
      displayLegislators = updateDisplayLegislators(newState)
      return { ...newState, displayLegislators: displayLegislators}

    case "COMMITTEE_FILTER":
      console.log("committee filtering!")
      newState = { ...prevState, committeeFilter: action.payload }
      displayLegislators = updateDisplayLegislators(newState)
      return { ...newState, displayLegislators: displayLegislators}

    default:
      return prevState;
  }
};

