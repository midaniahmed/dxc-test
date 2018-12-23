import {
  LOADING_PRODUCTS,
  PRODUCTS_LOADED,
  PRODUCTS_LOADING_FAILED,
} from "../actions/productActions";

const initialState = {
  all: [],
  loading: false,
  error: null,
};

function sortProducts(products) {
  return products.sort(
    (a, b) =>
      new Date(a.offerTime) > new Date(b.offerTime)
        ? -1
        : new Date(b.offerTime) > new Date(a.offerTime) ? 1 : 0
  );
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return {
        ...state,
        loading: action.payload,
        error: null,
        all: [],
      };

    case PRODUCTS_LOADED:
      return {
        ...state,
        all: action.payload.products
          ? sortProducts(action.payload.products)
          : [],
      };

    case PRODUCTS_LOADING_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
