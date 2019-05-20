import firebase from "../../../Config/firebase";
import axios from "axios";
import keys from "../../../Config/keys";

const FETCH_USER = "fetch_user";

export const fetchUser = () => dispatch => {
  firebase.auth().onAuthStateChanged(function(res) {
    if (res) {
      let { email, uid, photoURL, displayName } = res;
      let firstName = displayName.split(" ")[0];
      let lastName =
        displayName.length === 2
          ? displayName.split(" ")[1]
          : displayName.split(" ")[2];
      photoURL = photoURL
        ? photoURL
        : "https://profile.actionsprout.com/default.jpeg";
      axios
        .post(`${keys.baseURL}/BRXIArWSf2sCHprS2bQ4/newUser`, {
          email,
          uid,
          photoURL,
          displayName,
          firstName,
          lastName
        })
        .then(response => {
          let user = response.data;
          dispatch({
            type: FETCH_USER,
            payload: user
          });
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
