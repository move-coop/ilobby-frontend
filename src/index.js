import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// IF YOU WISH TO USE REACT ROUTER uncomment lines 7,19,21
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Provider is a react component which wraps your app and 'provides' your redux store to the rest of your application
import { Provider } from 'react-redux'

//function which returns store
import { createStore } from "redux";
import { reducer } from "./reducers/reducer";

const store = createStore(reducer)
// console.log('store', store)
// console.log('state', store.getState())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
