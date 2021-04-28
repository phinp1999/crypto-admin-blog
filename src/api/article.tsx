import api from "../services/api";

const endPoint = "/articles";
const endPointVersion = "versions";
const endPointVerify = "verify";
const endPointRequest = "request";


export const getArticleList = (params: any = null) => {
  return api.get(`${endPoint}`, params);
};



export const getArticleById = (params: any) => {
  return api.get(`${endPoint}/${params}`);
};

export const postArticle = (params: any) => {
  return api.post(`${endPoint}`, params);
};

export const postArticleVersion = (params: any) => {
  const { id } = params;
  return api.post(`${endPoint}/${id}/${endPointVersion}`, params);
};
export const editArticleVerify = (params: any) => {
  const { id } = params;
  return api.patch(`${endPoint}/${id}/${endPointVerify}`, params);
};
export const editArticleRequestV1 = (params: any) => {
  return api.patch(`${endPoint}/${params}/${endPointRequest}`);
};

export const editArticleRequest = (params: any) => {
  return api.patch(`${endPoint}/${params}/${endPointRequest}`);
};

export const editArticle = (params: any) => {
  const { id } = params;
  return api.patch(`${endPoint}/${id}`, params);
};

export const deleteArticle = (params: any) => {
  const url = [endPoint, params].join("/");
  return api.delete(url);
};
