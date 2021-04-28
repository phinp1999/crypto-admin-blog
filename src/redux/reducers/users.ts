import { IAction } from "interfaces";
import { IUserState } from "redux/store/types";
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_INFO,
  LOGOUT_USER,
  GET_USER_INFO,
  GET_USER_LIST,
} from "constant";
import _ from "lodash";

const initialState: IUserState = {
  isLoading: false,
  loginSuccess: false,
  id: "",
  userType: "",
  email: "",
  userList: [],
}

const User = (state = initialState, action: IAction) => {
  switch (action.type) {
    case LOGIN_USER:
      return _.assign({}, state, { isLoading: true });
    case LOGIN_USER_SUCCESS:
      return _.assign({}, state, { isLoading: false, loginSuccess: true, ...action.payload });
    case LOGIN_USER_ERROR:
      return _.assign({}, state, { isLoading: false, loginSuccess: false });
    case LOGIN_USER_INFO:
      return _.assign({}, state, { loginSuccess: true, ...action.payload })
    default:
      return state;
  }
}

export default User