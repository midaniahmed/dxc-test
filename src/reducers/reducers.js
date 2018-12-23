import { routerReducer as routing } from "react-router-redux";
import { combineReducers } from "redux";

import products from "./productsReducer";
import notifications from "./notificationsReducer";

const appReducer = combineReducers({
  products,
  notifications,
  routing,
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
