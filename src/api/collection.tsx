import api from "../services/api";

const endPoint = "/collections";

export const getCollectionList = (params: any = null) => {
  return api.get(`${endPoint}`, params);
};

export const getCollectionById = (params: any) => {
  //const { categoryId } = params;
  return api.get(`${endPoint}/${params}`);
};

export const postCollection = (params: any) => {
  return api.post(`${endPoint}`, params);
};

export const editCollection = (params: any) => {
  const { id } = params;
  return api.patch(`${endPoint}/${id}`, params);
};

export const deleteCollection = (params: any) => {
  //const { categoryId } = params;
  const url = [endPoint, params].join("/");
  return api.delete(url);
};
