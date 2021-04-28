import { Dispatch } from "redux";
import * as apiCollection from "api/collection";
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
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const openNotification = (type: string, message: string) => {
  notification[type]({
    message,
  });
};

const refreshState = (dispatch) => {
  apiCollection
    .getCollectionList()
    .then((res: any) => {
      const collectionList = res.data.data.map((item: any, index: number) => {
        return {
          stt: index + 1,
          key: item.id,
          categoryId: item.attributes.categoryId,
          title: item.attributes.title,
          description: item.attributes.description,
          createTime: item.meta.createdAt,
        };
      });
      const pagination = res.data.meta;
      dispatch({
        type: GET_COLLECTIONES_SUCCESS,
        payload: { collectionList, pagination },
      });
    })
    .catch((err: any) =>
      dispatch({ type: GET_COLLECTIONES_ERROR, payload: err })
    );
};

const createActionGetCollectiones = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiCollection
      .getCollectionList()
      .then((res: any) => {
        const collectionList = res.data.data.map((item: any, index: number) => {
          return {
            stt: index + 1,
            key: item.id,
            categoryId: item.attributes.categoryId,
            title: item.attributes.title,
            description: item.attributes.description,
            createTime: item.meta.createdAt,
          };
        });
        const pagination = res.data.meta;
        dispatch({
          type: GET_COLLECTIONES_SUCCESS,
          payload: { collectionList, pagination },
        });
      })
      .catch((err: any) =>
        dispatch({ type: GET_COLLECTIONES_ERROR, payload: err })
      );
  };
};

const createActionGetCollection = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    apiCollection
      .getCollectionById(payload)
      .then((res: any) => dispatch({ type, payload: res.data }))
      .catch((err: any) => console.log(err));
  };
};

const createActionAddCollection = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiCollection
      .postCollection(payload)
      .then((res: any) => {
        dispatch({ type: ADD_COLLECTION_SUCCESS, payload: res.data });
        openNotification("success", "Add successful!");
        refreshState(dispatch);
      })
      .catch((err: any) => {
        dispatch({ type: ADD_COLLECTION_ERROR, payload: err });
        openNotification("error", "Add error!");
      });
  };
};

const createActionEditCollection = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiCollection
      .editCollection(payload)
      .then((res: any) => {
        dispatch({ type: EDIT_COLLECTION_SUCCESS, payload: res.data });
        openNotification("success", "Update successful!");
        refreshState(dispatch);
      })
      .catch((err: any) => {
        dispatch({ type: EDIT_COLLECTION_ERROR, payload: err });
        openNotification("error", "Update error!");
      });
  };
};

const createActionRemoveCollection = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiCollection
      .deleteCollection(payload)
      .then((res: any) => {
        dispatch({ type: REMOVE_COLLECTION_SUCCESS, payload: res.data });
        openNotification("success", "Delete successful!");
        refreshState(dispatch);
      })
      .catch((err: any) => {
        dispatch({ type: REMOVE_COLLECTION_ERROR, payload: err });
        openNotification("error", "Delete error!");
      });
  };
};

//collection
export const getCollectiones = createActionGetCollectiones(GET_COLLECTIONES);
export const getCollection = createActionGetCollection(GET_COLLECTION);
export const addCollection = createActionAddCollection(ADD_COLLECTION);
export const editCollection = createActionEditCollection(EDIT_COLLECTION);
export const removeCollection = createActionRemoveCollection(REMOVE_COLLECTION);
