import axios from "axios";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import store from "../store/index";
const url = {
  baseUrl: "https://food-shop-api.000webhostapp.com/api",
  login: "/login",
  majors: "/majors",
  products: "/products",
  categories: "/categories",
  students: "/students",
};

const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use((request) => {
  const state = store.getState();
  // if (state.auth.token) {
  //   request.headers.Authorization = `Bearer ${state.auth.token}`;
  // }
  // store.dispatch(showLoading());
  return request;
});

instance.interceptors.response.use(
  (response) => {
    // setTimeout(() => store.dispatch(hideLoading()), 100);
    console.log(response);
    return response.data;
  },
  (err) => {
    // setTimeout(() => store.dispatch(hideLoading()), 100);
    console.log(err);
    if (err.code === "ERR_NERWORK") {
      window.location.href = "/network-error";
    } else {
      switch (err.response.status) {
        case 401:
          window.location.href = "/login";
          break;
        case 403:
          window.location.href = "/no-permission";
          break;
        default:
          break;
      }
      return Promise.reject(err);
    }
  }
);
const api = {
  url,
  instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};

export default api;
