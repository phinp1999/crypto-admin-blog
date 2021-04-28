import api from "../services/api";
const endPoint = "/users";

export const getUserList = (params: any = null) => {
  return api.get(`${endPoint}`, params);
};

export const getUserById = (params: any) => {
  return api.get(`${endPoint}/${params}`);
};

export const postUser = (params: any) => {
  return api.post(`${endPoint}`, params);
};

export const editUser = (params: any) => {
  const { id } = params;
  return api.put(`${endPoint}/${id}`, params);
};

export const deleteUser = (params: any) => {
  const url = [endPoint, params].join("/");
  return api.delete(url);
};

export const activeUser = (params: any) => {
  const { id, status } = params;
  return api.patch(`${endPoint}/${id}/${status}`);
};
