import { combineReducers } from "redux";
import { IAppState } from "redux/store/types";
import { LOGOUT_USER } from "constant";
import tag from "./tag";
import collection from "./collection";
import article from "./articles";
import user from "./users";
import pageUser from "./pageUser";

// Combine all reducers.
const appReducer = combineReducers<IAppState>({
  tag,
  collection,
  article,
  user,
  pageUser,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
