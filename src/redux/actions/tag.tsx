import { Dispatch } from "redux";
import * as apiTag from "api/tag";
import {
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_ERROR,
  GET_TAG,
  ADD_TAG,
  ADD_TAG_SUCCESS,
  ADD_TAG_ERROR,
  EDIT_TAG,
  REMOVE_TAG,
  GET_CATE_COLLECTION,
  EDIT_TAG_SUCCESS,
  EDIT_TAG_ERROR,
  REMOVE_TAG_SUCCESS,
  REMOVE_TAG_ERROR,
} from "constant";
import { notification } from "antd";

const openNotification = (type: string, message: string) => {
  notification[type]({
    message,
  });
};

const refreshState = (dispatch) => {
  apiTag
    .getTagList()
    .then((res: any) => {
      const tagList = res.data.data.map((item: any, index: number) => {
        return {
          index: index + 1,
          key: item.id,
          name: item.attributes.name,
          color: item.attributes.color,
          createTime: item.meta.createdAt,
        };
      });
      const pagination = res.data.meta;
      dispatch({
        type: GET_TAGS_SUCCESS,
        payload: { tagList, pagination },
      });
    })
    .catch((err: any) => dispatch({ type: GET_TAGS_ERROR, payload: err }));
};

const createActionGetTags = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiTag
      .getTagList()
      .then((res: any) => {
        const tagList = res.data.data.map((item: any, index: number) => {
          return {
            index: index + 1,
            key: item.id,
            name: item.attributes.name,
            color: item.attributes.color,
            createTime: item.meta.createdAt,
          };
        });
        const pagination = res.data.meta;
        dispatch({
          type: GET_TAGS_SUCCESS,
          payload: { tagList, pagination },
        });
      })
      .catch((err: any) => dispatch({ type: GET_TAGS_ERROR, payload: err }));
  };
};

const createActionGetTag = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    apiTag
      .getTagById(payload)
      .then((res: any) => dispatch({ type, payload: res.data }))
      .catch((err: any) => console.log(err));
  };
};

const createActionAddTag = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiTag
      .postTag(payload)
      .then((res: any) => {
        dispatch({ type: ADD_TAG_SUCCESS, payload: res.data });
        openNotification("success", "Add successful!");
        refreshState(dispatch);
      })
      .catch((err: any) => {
        dispatch({ type: ADD_TAG_ERROR, payload: err });
        openNotification("error", "Add error!");
      });
  };
};

const createActionEditTag = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiTag
      .editTag(payload)
      .then((res: any) => {
        dispatch({ type: EDIT_TAG_SUCCESS, payload: res.data });
        openNotification("success", "Update successful!");
        refreshState(dispatch);
      })
      .catch((err: any) => {
        dispatch({ type: EDIT_TAG_ERROR, payload: err });
        openNotification("error", "Update error!");
      });
  };
};

const createActionRemoveTag = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiTag
      .deleteTag(payload)
      .then((res: any) => {
        dispatch({ type: REMOVE_TAG_SUCCESS, payload: res.data });
        openNotification("success", "Delete successful!");
        refreshState(dispatch);
      })
      .catch((err: any) => {
        dispatch({ type: REMOVE_TAG_ERROR, payload: err });
        openNotification("error", "Delete error!");
      });
  };
};

const createActionGetCollection = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    apiTag
      .getCateCollection(payload)
      .then((res: any) => dispatch({ type, payload: res.data }))
      .catch((err: any) => console.log(err));
  };
};

//tag
export const getTags = createActionGetTags(GET_TAGS);
export const getTag = createActionGetTag(GET_TAG);
export const addTag = createActionAddTag(ADD_TAG);
export const editTag = createActionEditTag(EDIT_TAG);
export const removeTag = createActionRemoveTag(REMOVE_TAG);
export const getCateCollection = createActionGetCollection(GET_CATE_COLLECTION);
