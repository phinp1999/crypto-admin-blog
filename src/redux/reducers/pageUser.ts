import { IAction } from "interfaces";
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
  GET_USER_ERROR
} from "constant";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isAdding: false,
  isEditing: false,
  isRemoving: false,
  isActing: false,
  userList: [],
  userItem: {},
  pagination: {},
  isRefreshing: false,

};

const pageUser = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_USERS:
      return _.assign({}, state, { isLoading: true });
    case GET_USERS_SUCCESS:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, userList: action.payload.userList, pagination: action.payload.pagination });
    case GET_USERS_ERROR:
      return _.assign({}, state, { isLoading: false });
    case GET_USER:
      return _.assign({}, state, { isLoading: true });
    case GET_USER_SUCCESS:
      return _.assign({}, state, { isLoading: false, userItem: action.payload });
    case GET_USER_ERROR:
      return _.assign({}, state, { isLoading: false });
    case ADD_USER:
      return _.assign({}, state, { isActing: true });
    case ADD_USER_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case ADD_USER_ERROR:
      return _.assign({}, state, { isActing: false });
    case REMOVE_USER:
      return _.assign({}, state, { isActing: true });
    case REMOVE_USER_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case REMOVE_USER_ERROR:
      return _.assign({}, state, { isActing: false });
    case EDIT_USER:
      return _.assign({}, state, { isActing: true });
    case EDIT_USER_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case EDIT_USER_ERROR:
      return _.assign({}, state, { isActing: false });
    case ACTIVE_USER:
      return _.assign({}, state, { isActing: true });
    case ACTIVE_USER_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case ACTIVE_USER_ERROR:
      return _.assign({}, state, { isActing: false });

    default:
      return state;
  }
}

export default pageUser;