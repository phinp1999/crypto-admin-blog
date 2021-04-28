import { IAction } from "interfaces";
import {
  GET_COLLECTIONES,
  GET_COLLECTIONES_SUCCESS,
  GET_COLLECTIONES_ERROR,
  GET_COLLECTION,
  ADD_COLLECTION,
  ADD_COLLECTION_SUCCESS,
  ADD_COLLECTION_ERROR,
  EDIT_COLLECTION,
  REMOVE_COLLECTION,
  REFRESH,
  EDIT_COLLECTION_SUCCESS,
  EDIT_COLLECTION_ERROR,
  REMOVE_COLLECTION_SUCCESS,
  REMOVE_COLLECTION_ERROR,
} from "constant";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isAdding: false,
  isEditing: false,
  isRemoving: false,
  isActing: false,
  collectionList: [],
  collectionItem: {},
  pagination:{},
  isRefreshing: false,

};

const Collection = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_COLLECTIONES:
      return _.assign({}, state, { isLoading: true });
    case GET_COLLECTIONES_SUCCESS:
      return _.assign({}, state, { isLoading: false, isRefreshing: false ,collectionList: action.payload.collectionList,pagination: action.payload.pagination});
    case GET_COLLECTIONES_ERROR:
      return _.assign({}, state, { isLoading: false });
    case GET_COLLECTION:
      return _.assign({}, state, { collectionItem: action.payload });
    case ADD_COLLECTION:
      return _.assign({}, state, { isActing: true });
    case ADD_COLLECTION_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case ADD_COLLECTION_ERROR:
      return _.assign({}, state, { isActing: false });
    case REMOVE_COLLECTION:
      return _.assign({}, state, { isActing: true });
    case REMOVE_COLLECTION_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case REMOVE_COLLECTION_ERROR:
      return _.assign({}, state, { isActing: false });
    case EDIT_COLLECTION:
      return _.assign({}, state, { isActing: true });
    case EDIT_COLLECTION_SUCCESS:
      return _.assign({}, state, { isActing: false,isRefreshing: true });
    case EDIT_COLLECTION_ERROR:
      return _.assign({}, state, { isActing: false });

    default:
      return state;
  }
}

export default Collection;