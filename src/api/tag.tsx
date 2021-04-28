import api from "../services/api";

const endPoint = "/tags";
const endPoint_Collection = "/collections";

export const getTagList = (params: any = null) => {
  return api.get(`${endPoint}`, params);
};

export const getTagById = (params: any) => {
  return api.get(`${endPoint}/${params}`);
};

export const postTag = (params: any) => {
  return api.post(`${endPoint}`, params);
};

export const editTag = (params: any) => {
  const { id } = params;
  return api.patch(`${endPoint}/${id}`, params);
};

export const deleteTag = (params: any) => {
  const url = [endPoint, params].join("/");
  return api.delete(url);
};

export const getCateCollection = (params: any) => {
  return api.get(`${endPoint}/${params}/${endPoint_Collection}`);
};
