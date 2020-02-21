import { combineReducers } from 'redux';
import reducer from "./reducer";
//import top level reducers

const rootReducer = combineReducers({
  //your reducers here
  reducer: reducer
});

export default rootReducer;
