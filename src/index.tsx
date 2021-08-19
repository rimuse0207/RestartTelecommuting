import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { AnyAction, applyMiddleware, createStore } from 'redux';
import persistReducer from "./models"
import { composeWithDevTools } from 'redux-devtools-extension';
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist";
import store, { persistor } from "./models/Store";


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} ></PersistGate>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
