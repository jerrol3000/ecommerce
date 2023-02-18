import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import history from "./history";

const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <BrowserRouter history={history}>
    <Provider store={store}>
      <App tab="home" />
    </Provider>
  </BrowserRouter>
);
