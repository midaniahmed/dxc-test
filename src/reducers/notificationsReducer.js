import { CLEAR_ALERT, DISPATCH_ALERT } from "../actions/notificationActions";

const initialState = {
  alert: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ALERT:
      return {
        ...state,
        alert: state.alert ? { ...state.alert, isOpen: false } : null,
      };

    case DISPATCH_ALERT:
      return {
        ...state,
        alert: { ...action.payload, isOpen: true },
      };

    default:
      return state;
  }
}
