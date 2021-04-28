import { IAction } from "interfaces";
import {
  GET_ARTICLES,GET_ARTICLESV1, ADD_ARTICLE_VERIFY,GET_ARTICLESV1_SUCCESS,
  ADD_ARTICLE_VERIFY_SUCCESS,GET_ARTICLESV1_ERROR,
  ADD_ARTICLE_VERIFY_ERROR, GET_ARTICLES_SUCCESS, GET_ARTICLES_ERROR, GET_ARTICLE, GET_ARTICLE_SUCCESS, GET_ARTICLE_ERROR, ADD_ARTICLE, ADD_ARTICLE_SUCCESS, ADD_ARTICLE_ERROR, EDIT_ARTICLE, EDIT_ARTICLE_SUCCESS, EDIT_ARTICLE_ERROR, REMOVE_ARTICLE, REMOVE_ARTICLE_SUCCESS, REMOVE_ARTICLE_ERROR, ADD_ARTICLE_VERSION, ADD_ARTICLE_VERSION_SUCCESS, ADD_ARTICLE_VERSION_ERROR, CLEAR_ARTICLE_ITEM, ADD_ARTICLE_REQUEST, ADD_ARTICLE_REQUEST_SUCCESS, ADD_ARTICLE_REQUEST_ERROR, ADD_ARTICLE_REQUEST_SUCCESS_V1, ADD_ARTICLE_REQUEST_V1, ADD_ARTICLE_REQUEST_ERROR_V1
} from "constant";
import _ from "lodash";

const initialState = {
  isLoading: false,
  isAdding: false,
  isEditing: false,
  isRemoving: false,
  isActing: false,
  isRefreshing: false,
  articleList: [],
  pagination: {},
  articleItem: {}
};

const Article = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_ARTICLES:
      return _.assign({}, state, { isLoading: true });
    case GET_ARTICLES_SUCCESS:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, articleList: action.payload.articleList, pagination: action.payload.pagination });
    case GET_ARTICLES_ERROR:
      return _.assign({}, state, { isLoading: false });
    case GET_ARTICLESV1:
      return _.assign({}, state, { isLoading: true });
    case GET_ARTICLESV1_SUCCESS:
      return _.assign({}, state, { isLoading: false, isRefreshing: false, articleList: action.payload.articleList, pagination: action.payload.pagination });
    case GET_ARTICLESV1_ERROR:
      return _.assign({}, state, { isLoading: false });
    case GET_ARTICLE:
      return _.assign({}, state, { isLoading: true });
    case GET_ARTICLE_SUCCESS:
      return _.assign({}, state, { isLoading: false, articleItem: action.payload });
    case GET_ARTICLE_ERROR:
      return _.assign({}, state, { isLoading: false });
    case ADD_ARTICLE:
      return _.assign({}, state, { isActing: true });
    case ADD_ARTICLE_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case ADD_ARTICLE_ERROR:
      return _.assign({}, state, { isActing: false });
    case EDIT_ARTICLE:
      return _.assign({}, state, { isActing: true });
    case EDIT_ARTICLE_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case EDIT_ARTICLE_ERROR:
      return _.assign({}, state, { isActing: false });
    case REMOVE_ARTICLE:
      return _.assign({}, state, { isActing: true });
    case REMOVE_ARTICLE_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case REMOVE_ARTICLE_ERROR:
      return _.assign({}, state, { isActing: false });
    case ADD_ARTICLE_VERSION:
      return _.assign({}, state, { isActing: true });
    case ADD_ARTICLE_VERSION_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case ADD_ARTICLE_VERSION_ERROR:
      return _.assign({}, state, { isActing: false });
    case ADD_ARTICLE_VERIFY:
      return _.assign({}, state, { isActing: true });
    case ADD_ARTICLE_VERIFY_SUCCESS:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case ADD_ARTICLE_VERIFY_ERROR:
      return _.assign({}, state, { isActing: false });
    case ADD_ARTICLE_REQUEST:
      return _.assign({}, state, { isEditing: true });
    case ADD_ARTICLE_REQUEST_SUCCESS:
      return _.assign({}, state, { isEditing: false, isRefreshing: true });
    case ADD_ARTICLE_REQUEST_ERROR:
      return _.assign({}, state, { isEditing: false });
    case ADD_ARTICLE_REQUEST_V1:
      return _.assign({}, state, { isActing: true });
    case ADD_ARTICLE_REQUEST_SUCCESS_V1:
      return _.assign({}, state, { isActing: false, isRefreshing: true });
    case ADD_ARTICLE_REQUEST_ERROR_V1:
      return _.assign({}, state, { isActing: false });
    case CLEAR_ARTICLE_ITEM:
      return _.assign({}, state, { articleItem: {} });

    default:
      return state;
  }
}

export default Article;