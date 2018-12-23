import React from "react";
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  Redirect,
} from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import MainLayout from "./components/app/MainLayout";
import ProductsContext from "./components/products/ProductsContext";

export default function(store) {
  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <Router history={history}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={ProductsContext} />
      </Route>
      <Redirect from="*" to="/" />
    </Router>
  );
}
