import firebase from "../../../Config/firebase";
const FETCH_USER = "fetch_user";

export const fetchUser = () => dispatch => {
  firebase.auth().onAuthStateChanged(function(res) {
    if (res) {
      let { uid, photoURL, displayName } = res;
      let firstName = displayName.split(" ")[0];
      let lastName =
        displayName.split(" ").length === 2
          ? displayName.split(" ")[1]
          : displayName.split(" ")[2];

      dispatch({
        type: FETCH_USER,
        payload: { uid, photoURL, firstName, lastName, displayName }
      });
    } else {
      return dispatch({ type: FETCH_USER });
    }
  });
};

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
