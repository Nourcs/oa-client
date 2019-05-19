import { combineReducers } from "redux";
import authReducer from "./Modules/Auth/auth";

export default combineReducers({
  currentUser: authReducer
});
