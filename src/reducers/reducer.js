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
  chamberOptions: chamberOptions,
  partyFilter: "",
  partyOptions: partyOptions,
  committeeFilter: [],
  committeeOptions: committeeOptions,
  legislators: []

}

// const fetchActionCreator = () => {
//   return (dispatch) => {
//     fetch(API)
//       .then(res => res.json())
//       .then(data => dispatch({ type: FETCH_LEGISLATORS, payload: data }))
//   }
// }


export const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "TOGGLE":
      console.log("toggling!")
      return { ...prevState, currentUser: !prevState.currentUser }

    case "FETCH_LEGISLATORS":
      console.log("reducer legislators", action.payload)
      return { ...prevState, legilators: action.payload }

    case "SEARCH_FILTER":
      console.log("search filtering!")
      return { ...prevState, searchFilter: action.payload }

    case "CHAMBER_FILTER":
      console.log("chamber filtering!")
      return { ...prevState, chamberFilter: action.payload }

    case "PARTY_FILTER":
      console.log("party filtering!", action.payload)
      return { ...prevState, partyFilter: action.payload }

    case "COMMITTEE_FILTER":
      console.log("committee filtering!")
      return { ...prevState, committeeFilter: action.payload }

    default:
      return prevState;
  }
};

