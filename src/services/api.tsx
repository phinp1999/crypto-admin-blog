import axios from "axios";
import { get } from "./localStorage";

const instance = axios.create({
  baseURL: "https://api.twp.asia/api/",
});

instance.interceptors.request.use(
  (config) => {
    const token = get("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => err
);

export default instance;
