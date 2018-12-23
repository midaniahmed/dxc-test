import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import routes from "./routes";

import "./assets/styles/default.scss";

const store = applyMiddleware(reduxThunk)(createStore)(reducers);

const app = (
  <div>
    <Provider store={store}>{routes(store)}</Provider>
  </div>
);
ReactDOM.render(app, document.getElementById("root"));
