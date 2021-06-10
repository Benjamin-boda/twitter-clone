import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from "react-redux";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import configureStore from "./store/store";
import { setTweets } from "./actions/tweets";
import { setHomepageTweets } from "./actions/tweets";
import "./styles/styles.scss";

axios.defaults.withCredentials = true;

const store = configureStore()

const jsx = (
  <Provider store={store}>
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById("root"));
        hasRendered = true;
    }
};

if ( localStorage.getItem("token") === "true") {
    store.dispatch(setTweets())
    console.log(store.getState().tweets)
    renderApp();
} else {
    store.dispatch(setHomepageTweets())
    renderApp();
}

window.onbeforeunload = function() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  return '';
};