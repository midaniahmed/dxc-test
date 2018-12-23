import axios from "axios";
import { dispatchAlert } from "./notificationActions";

const API_URL = "https://www.mocky.io/v2/5c02903f3000004f00bb9352?mocky-delay=3000ms";

export const LOADING_PRODUCTS = "products:loading";
export const PRODUCTS_LOADED = "products:loaded";
export const PRODUCTS_LOADING_FAILED = "products:loading:failed";

export function loadProducts() {
  return dispatch => {
    dispatch({ type: LOADING_PRODUCTS, payload: true });
    axios
      .get(API_URL)
      .then(({ data }) => {
        dispatch({ type: LOADING_PRODUCTS, payload: false });
        dispatch({ type: PRODUCTS_LOADED, payload: data.data });
      })
      .catch(error => {
        dispatch({ type: PRODUCTS_LOADING_FAILED, payload: error });
        dispatchAlert(dispatch, {
          message: `Loading products failed`,
          type: "danger",
          title: "Error"
        });
      });
  };
}
