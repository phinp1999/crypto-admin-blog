import api from "services/api";

const endPointAuth = "/auth";
const endPointUser = "/users";

export const loginUser = (params: any) => {
  return api.post(`${endPointAuth}/login`, params);
};

export const getLoginInfo = () => {
  return api.get(`${endPointAuth}/me`);
};

export const getUserInfo = (params: any) => {
  const { id } = params;
  return api.get(`${endPointUser}/${id}`);
};
