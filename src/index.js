import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase/app";
import "firebase/auth";
import {firebaseConfig} from './firebaseConfig'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { reducer } from "./reducers/reducer";

const store = createStore(reducer, applyMiddleware(thunk))
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
