export const CLEAR_ALERT = "notifications:alert:clear";
export const DISPATCH_ALERT = "notifications:alert:display";

function showAlert(data) {
  return { type: DISPATCH_ALERT, payload: data };
}
function hideAlert() {
  return { type: CLEAR_ALERT };
}

export function dispatchAlert(dispatch, data) {
  dispatch(showAlert(data));
  setTimeout(() => {
    dispatch(hideAlert());
  }, 4000);
}

export function clearAlert() {
  return dispatch => {
    dispatch(hideAlert());
  };
}
