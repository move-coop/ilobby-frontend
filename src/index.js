import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// IF YOU WISH TO USE REACT ROUTER uncomment lines 7,19,21
import { BrowserRouter as Router } from 'react-router-dom';

// Provider is a react component which wraps your app and 'provides' your redux store to the rest of your application
import { Provider } from 'react-redux'

//function which returns store
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { reducer } from "./reducers/reducer";

import firebase from 'firebase';


const store = createStore(reducer, applyMiddleware(thunk))
// console.log('store', store)
// console.log('state', store.getState())

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
