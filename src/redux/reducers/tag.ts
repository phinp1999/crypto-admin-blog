import { IAction } from "interfaces";
import { GET_TAGS, GET_TAGS_SUCCESS, GET_TAGS_ERROR, GET_TAG, ADD_TAG, ADD_TAG_SUCCESS, ADD_TAG_ERROR, EDIT_TAG, EDIT_TAG_SUCCESS, EDIT_TAG_ERROR, REMOVE_TAG, REMOVE_TAG_SUCCESS, REMOVE_TAG_ERROR, GET_CATE_COLLECTION } from "constant";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isAdding: false,
  isEditing: false,
  isRemoving: false,
  isActing: false,
  isRefreshing: false,
  tagList: [],
  pagination: {},
  tagItem: {}
};

const Tag = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_TAGS:
      return _.assign({}, state, { isLoading: true });
    case GET_TAGS_SUCCESS:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, tagList: action.payload.tagList, pagination: action.payload.pagination });
    case GET_TAGS_ERROR:
      return _.assign({}, state, { isLoading: false });
    case GET_TAG:
      return _.assign({}, state, { tagItem: action.payload });
    case ADD_TAG:
      return _.assign({}, state, { isActing: true });
    case ADD_TAG_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case ADD_TAG_ERROR:
      return _.assign({}, state, { isActing: false });
    case EDIT_TAG:
      return _.assign({}, state, { isActing: true });
    case EDIT_TAG_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case EDIT_TAG_ERROR:
      return _.assign({}, state, { isActing: false });
    case REMOVE_TAG:
      return _.assign({}, state, { isActing: true });
    case REMOVE_TAG_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case REMOVE_TAG_ERROR:
      return _.assign({}, state, { isActing: false });
    case GET_CATE_COLLECTION:
      return _.assign({}, state, { tagItem: action.payload });

    default:
      return state;
  }
}

export default Tag;