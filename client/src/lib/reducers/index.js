import { combineReducers } from "redux";
import contracts from "./contracts";
import articles from "./articles";

export default combineReducers({
  articles,
  contracts,
  /* additional reducers here */
});
