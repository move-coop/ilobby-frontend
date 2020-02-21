// a reducer is a PURE function that takes the previous state and an action as arguments and returns new state based on the action.type
// import { /* your type here, CHANGE_MESSAGE */ } from '../actions/types'


const initialState = {
  currentUser: true
}

export const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "TOGGLE":
      console.log("toggling!")
      return {
        ...prevState,
        currentUser: !prevState.currentUser
      }

    default:
      return prevState;
  }
};

