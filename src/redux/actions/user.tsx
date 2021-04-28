import { Dispatch } from "redux";
import * as apiUser from "api/user";
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_INFO,
  LOGOUT_USER,
  GET_USER_INFO,
  GET_USER_LIST,
} from "constant";
import { save, remove } from "services/localStorage";
import swal from "sweetalert";

const createActionLoginUser = (type: string) => {
  return (payload?: any, history?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiUser
      .loginUser(payload)
      .then((res: any) => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data.payload });
        save("accessToken", res.data.token);
        console.log(res.data.payload);
        if (res.data.payload.userType == "Admin") {
          history.push("/");
        } else {
          history.push("/article");
        }
      })
      .catch((err: any) => {
        dispatch({ type: LOGIN_USER_ERROR, payload: err.message });
        swal({
          title: "Login error",
          icon: "error",
          timer: 1500,
        });
      });
  };
};

const createActionLoginInfo = (type: string) => {
  return () => (dispatch: Dispatch) => {
    apiUser
      .getLoginInfo()
      .then((res) => dispatch({ type, payload: res.data }))
      .catch((err) => console.log(err.message));
  };
};

const createActionLogoutUser = (type: string) => {
  return () => (dispatch: Dispatch) => {
    remove("accessToken");
    dispatch({ type });
  };
};

export const loginUser = createActionLoginUser(LOGIN_USER);
export const getLoginInfo = createActionLoginInfo(LOGIN_USER_INFO);
export const logoutUser = createActionLogoutUser(LOGOUT_USER);
