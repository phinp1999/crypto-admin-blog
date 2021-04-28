import { Dispatch } from "redux";
import * as apiArticle from "api/article";
import { getUserList } from "api/pageUser";
import { get } from "services/localStorage";
import {
  GET_ARTICLES,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_ERROR,
  GET_ARTICLE,
  ADD_ARTICLE,
  ADD_ARTICLE_SUCCESS,
  ADD_ARTICLE_ERROR,
  EDIT_ARTICLE,
  REMOVE_ARTICLE,
  EDIT_ARTICLE_SUCCESS,
  EDIT_ARTICLE_ERROR,
  REMOVE_ARTICLE_SUCCESS,
  REMOVE_ARTICLE_ERROR,
  ADD_ARTICLE_VERSION,
  ADD_ARTICLE_VERSION_SUCCESS,
  ADD_ARTICLE_VERSION_ERROR,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_ERROR,
  CLEAR_ARTICLE_ITEM,
  ADD_ARTICLE_VERIFY,
  ADD_ARTICLE_VERIFY_SUCCESS,
  ADD_ARTICLE_VERIFY_ERROR,
  ADD_ARTICLE_REQUEST,
  ADD_ARTICLE_REQUEST_SUCCESS,
  ADD_ARTICLE_REQUEST_ERROR,
  ADD_ARTICLE_REQUEST_V1,
  ADD_ARTICLE_REQUEST_ERROR_V1,
  ADD_ARTICLE_REQUEST_SUCCESS_V1,
  //
  GET_ARTICLESV1,
  GET_ARTICLESV1_SUCCESS,
  GET_ARTICLESV1_ERROR,
  //
} from "constant";
import { notification } from "antd";

const openNotification = (type: string, message: string) => {
  notification[type]({
    message,
  });
};

const refreshState = (dispatch) => {
  apiArticle
    .getArticleList()
    .then(async (res: any) => {
      let userList = [];
      await getUserList().then((res: any) => {
        userList = res.data.data;
      });

      let articleList = res.data.data.map((item: any, index: number) => {
        let user: any = userList.find(
          (user: any) => item.attributes.userId === user.id
        );

        if (user) {
          return {
            index: index + 1,
            key: item.id,
            createTime: item.meta.createdAt,
            userName: user.attributes.fullName,
            ...item.attributes,
          };
        }
      });

      const pagination = res.data.meta;
      dispatch({
        type: GET_ARTICLES_SUCCESS,
        payload: { articleList, pagination },
      });
    })
    .catch((err: any) => dispatch({ type: GET_ARTICLES_ERROR, payload: err }));
};

//
const refreshStateV1 = (dispatch) => {
  apiArticle
    .getArticleList()
    .then((res: any) => {
      const articleList = res.data.data.map((item: any, index: number) => {
        return {
          index: index + 1,
          key: item.id,
          userName: "",
          createTime: item.meta.createdAt,
          ...item.attributes,
        };
      });
      const pagination = res.data.meta;
      dispatch({
        type: GET_ARTICLESV1_SUCCESS,
        payload: { articleList, pagination },
      });
    })
    .catch((err: any) =>
      dispatch({ type: GET_ARTICLESV1_ERROR, payload: err })
    );
};

const createActionGetArticlesV1 = (type: string) => {
  console.log("test");
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiArticle
      .getArticleList()
      .then((res: any) => {
        const articleList = res.data.data.map((item: any, index: number) => {
          return {
            index: index + 1,
            key: item.id,
            userName: "",
            createTime: item.meta.createdAt,
            ...item.attributes,
          };
        });
        const pagination = res.data.meta;
        dispatch({
          type: GET_ARTICLESV1_SUCCESS,
          payload: { articleList, pagination },
        });
      })
      .catch((err: any) =>
        dispatch({ type: GET_ARTICLESV1_ERROR, payload: err })
      );
  };
};

//

const createActionGetArticles = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiArticle
      .getArticleList()
      .then(async (res: any) => {
        let userList = [];
        await getUserList().then((res: any) => {
          userList = res.data.data;
        });

        let articleList = res.data.data.map((item: any, index: number) => {
          let user: any = userList.find(
            (user: any) => item.attributes.userId === user.id
          );

          if (user) {
            return {
              index: index + 1,
              key: item.id,
              createTime: item.meta.createdAt,
              userName: user.attributes.fullName,
              ...item.attributes,
            };
          }
        });

        const pagination = res.data.meta;
        dispatch({
          type: GET_ARTICLES_SUCCESS,
          payload: { articleList, pagination },
        });
      })
      .catch((err: any) =>
        dispatch({ type: GET_ARTICLES_ERROR, payload: err })
      );
  };
};

const createActionGetArticle = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiArticle
      .getArticleById(payload)
      .then((res: any) =>
        dispatch({ type: GET_ARTICLE_SUCCESS, payload: res.data })
      )
      .catch((err: any) => dispatch({ type: GET_ARTICLE_ERROR, payload: err }));
  };
};

const createActionAddArticle = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiArticle
      .postArticle(payload.dataCreate)
      .then((res: any) => {
        dispatch({ type: ADD_ARTICLE_SUCCESS, payload: res.data });
        openNotification("success", "Add successful!");
        get("type") == "Admin"
          ? refreshState(dispatch)
          : refreshStateV1(dispatch);
        setTimeout(() => {
          payload.toggleModalVisible(false);
        }, 1000);
        /* setTimeout(() => {
          payload.showConfirm(
            {
              id: res.data.id,
              userId: res.data.attributes.userId,
              tagIdArray: res.data.atributes.tagIdArray,
            },
            "create"
          );
        }, 2000); */
      })
      .catch((err: any) => {
        dispatch({ type: ADD_ARTICLE_ERROR, payload: err });
        openNotification("error", "Add error!");
      });
  };
};

const createActionAddArticleVersion = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiArticle
      .postArticleVersion(payload)
      .then((res: any) => {
        dispatch({ type: ADD_ARTICLE_VERSION_SUCCESS, payload: res.data });
        get("type") == "Admin"
          ? refreshState(dispatch)
          : refreshStateV1(dispatch);
        openNotification("success", "Publish successful!");
      })
      .catch((err: any) => {
        dispatch({ type: ADD_ARTICLE_VERSION_ERROR, payload: err });
        openNotification("error", "Publish error!");
      });
  };
};

const createActionAddArticleVerify = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiArticle
      .editArticleVerify(payload)
      .then((res: any) => {
        dispatch({ type: ADD_ARTICLE_VERIFY_SUCCESS, payload: res.data });
        get("type") == "Admin"
          ? refreshState(dispatch)
          : refreshStateV1(dispatch);
        openNotification("success", "Verify successful!");
      })
      .catch((err: any) => {
        dispatch({ type: ADD_ARTICLE_VERIFY_ERROR, payload: err });
        openNotification("error", "Verify error!");
      });
  };
};

const createActionAddArticleRequestV1 = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiArticle
      .editArticleRequestV1(payload)
      .then((res: any) => {
        dispatch({ type: ADD_ARTICLE_REQUEST_SUCCESS_V1, payload: res.data });
        get("type") == "Admin"
          ? refreshState(dispatch)
          : refreshStateV1(dispatch);
        openNotification("success", "Request successful!");
        if (payload.modalDialog) {
          payload.modalDialog("success", "Request successful!", true);
        }
      })
      .catch((err: any) => {
        dispatch({ type: ADD_ARTICLE_REQUEST_ERROR_V1, payload: err });
        openNotification("error", "Request error!");
        if (payload.modalDialog) {
          payload.modalDialog("error", "Request error!");
        }
      });
  };
};

const createActionAddArticleRequest = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiArticle
      .editArticleRequest(payload.data)
      .then((res: any) => {
        dispatch({ type: ADD_ARTICLE_REQUEST_SUCCESS, payload: res.data });
        get("type") == "Admin"
          ? refreshState(dispatch)
          : refreshStateV1(dispatch);
        if (payload.modalDialog) {
          payload.modalDialog("success", "Request successful!", true);
        }
      })
      .catch((err: any) => {
        dispatch({ type: ADD_ARTICLE_REQUEST_ERROR, payload: err });
        if (payload.modalDialog) {
          payload.modalDialog("error", "Request error!");
        }
      });
  };
};

const createActionEditArticle = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiArticle
      .editArticle(payload.data)
      .then((res: any) => {
        dispatch({ type: EDIT_ARTICLE_SUCCESS, payload: res.data });
        if (payload.notify) {
          openNotification("success", "Update successful!");
        }
        if (payload.refresh) {
          get("type") == "Admin"
            ? refreshState(dispatch)
            : refreshStateV1(dispatch);
          setTimeout(() => {
            payload.toggleModalVisible(false);
          }, 1000);
          /*           setTimeout(() => {
            payload.showConfirm(
              {
                id: res.data.id,
                userId: res.data.attributes.userId,
                tagIdArray: res.data.attributes.tagIdArray,
              },
              "update"
            );
          }, 2000); */
        }
        if (payload.toggleSaved) {
          payload.toggleSaved(true);
        }
      })
      .catch((err: any) => {
        dispatch({ type: EDIT_ARTICLE_ERROR, payload: err });
        if (payload.notify) {
          openNotification("error", "Update error!");
        }
        if (payload.toggleSaved) {
          payload.toggleSaved(false);
        }
      });
  };
};

const createActionRemoveArticle = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiArticle
      .deleteArticle(payload)
      .then((res: any) => {
        dispatch({ type: REMOVE_ARTICLE_SUCCESS, payload: res.data });
        openNotification("success", "Delete successful!");
        get("type") == "Admin"
          ? refreshState(dispatch)
          : refreshStateV1(dispatch);
      })
      .catch((err: any) => {
        dispatch({ type: REMOVE_ARTICLE_ERROR, payload: err });
        openNotification("error", "Delete error!");
      });
  };
};

const createActionClearArticle = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
  };
};

export const getArticles = createActionGetArticles(GET_ARTICLES);
export const getArticlesV1 = createActionGetArticlesV1(GET_ARTICLESV1);
export const getArticle = createActionGetArticle(GET_ARTICLE);
export const addArticle = createActionAddArticle(ADD_ARTICLE);
export const editArticle = createActionEditArticle(EDIT_ARTICLE);
export const removeArticle = createActionRemoveArticle(REMOVE_ARTICLE);
export const addArticleRequestV1 = createActionAddArticleRequestV1(
  ADD_ARTICLE_REQUEST_V1
);
export const addArticleVersion = createActionAddArticleVersion(
  ADD_ARTICLE_VERSION
);
export const addArticleVerify = createActionAddArticleVerify(
  ADD_ARTICLE_VERIFY
);
export const addArticleRequest = createActionAddArticleRequest(
  ADD_ARTICLE_REQUEST
);

export const clearArticleItem = createActionClearArticle(CLEAR_ARTICLE_ITEM);
