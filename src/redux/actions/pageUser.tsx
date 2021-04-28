import { Dispatch } from "redux";
import * as apiUser from "api/pageUser";
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  GET_USER,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  EDIT_USER,
  REMOVE_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_ERROR,
  ACTIVE_USER,
  ACTIVE_USER_SUCCESS,
  ACTIVE_USER_ERROR,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from "constant";
import { notification } from "antd";

const openNotification = (type: string, message: string) => {
  notification[type]({
    message,
  });
};

const refreshState = (dispatch) => {
  apiUser
    .getUserList()
    .then(async (res: any) => {
      let userList = await res.data.data.flatMap((item: any, index: number) => {
        return {
          stt:index+1,
          key: item.id,
          userType: item.attributes.userType,
          email: item.attributes.email,
          avatarUrl: item.attributes.avatarUrl,
          createTime: item.meta.createdAt,
          fullName: item.attributes.fullName,
          status: item.attributes.status,
        };
      });
      const pagination = res.data.meta;
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: { userList, pagination },
      });
    })
    .catch((err: any) => dispatch({ type: GET_USERS_ERROR, payload: err }));
};

const createActionGetUsers = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiUser
      .getUserList()
      .then(async (res: any) => {
        let userList = await res.data.data.flatMap(
          (item: any, index: number) => {
            return {
              stt:index+1,
              key: item.id,
              userType: item.attributes.userType,
              email: item.attributes.email,
              avatarUrl: item.attributes.avatarUrl,
              createTime: item.meta.createdAt,
              fullName: item.attributes.fullName,
              status: item.attributes.status,
            };
          }
        );
        const pagination = res.data.meta;
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: { userList, pagination },
        });
      })
      .catch((err: any) => dispatch({ type: GET_USERS_ERROR, payload: err }));
  };
};

const createActionGetUser = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiUser
      .getUserById(payload)
      .then((res: any) =>
        dispatch({ type: GET_USER_SUCCESS, payload: res.data })
      )
      .catch((err: any) => dispatch({ type: GET_USER_ERROR, payload: err }));
  };
};

const createActionAddUser = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiUser
      .postUser(payload.dataCreate)
      .then((res: any) => {
        dispatch({ type: ADD_USER_SUCCESS, payload: res.data });
        openNotification("success", "Add successful!");
        refreshState(dispatch);
        setTimeout(() => {
          payload.toggleModalVisible(false);
        }, 500);
        setTimeout(() => {
          payload.onShowPassword(res.data.attributes._password);
        }, 1500);
      })
      .catch((err: any) => {
        dispatch({ type: ADD_USER_ERROR, payload: err });
        openNotification("error", "Add error!");
      });
  };
};

const createActionEditUser = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiUser
      .editUser(payload)
      .then((res: any) => {
        dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
        openNotification("success", "Update successful!");
        refreshState(dispatch);
      })
      .catch((err: any) => {
        dispatch({ type: EDIT_USER_ERROR, payload: err });
        openNotification("error", "Update error!");
      });
  };
};

const createActionRemoveUser = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiUser
      .deleteUser(payload)
      .then((res: any) => {
        dispatch({ type: REMOVE_USER_SUCCESS, payload: res.data });
        openNotification("success", "Delete successful!");
        refreshState(dispatch);
      })
      .catch((err: any) => {
        dispatch({ type: REMOVE_USER_ERROR, payload: err });
        openNotification("error", "Delete error!");
      });
  };
};

const createActionActiveUser = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiUser
      .activeUser(payload)
      .then((res: any) => {
        dispatch({ type: ACTIVE_USER_SUCCESS, payload: res.data });
        openNotification("success", "Update successful!");
        refreshState(dispatch);
      })
      .catch((err: any) => {
        dispatch({ type: ACTIVE_USER_ERROR, payload: err });
        openNotification("error", "Update error!");
      });
  };
};

//User
export const getUsers = createActionGetUsers(GET_USERS);
export const getUser = createActionGetUser(GET_USER);
export const addUser = createActionAddUser(ADD_USER);
export const editUser = createActionEditUser(EDIT_USER);
export const removeUser = createActionRemoveUser(REMOVE_USER);
export const activeUser = createActionActiveUser(ACTIVE_USER);
