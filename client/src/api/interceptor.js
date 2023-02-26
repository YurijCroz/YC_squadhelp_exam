import axios from "axios";
import CONSTANTS from "../constants";
import history from "../browserHistory";
import {
  checkToken,
  refreshTokenHandler,
  equalsUrlToRefresh,
  notSignTokenForRequest,
} from "../utils/utils";

const instance = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const isRefresh = equalsUrlToRefresh(config.url);
    const accessToken = window.localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
    const tokenIsValid = accessToken ? checkToken(accessToken) : null;
    if (notSignTokenForRequest(config.url)) {
      return config;
    }
    if (accessToken && !isRefresh && !tokenIsValid) {
      const newAccessToken = await refreshTokenHandler();
      config.headers = { ...config.headers, authorization: newAccessToken };
    }
    if (refreshToken && isRefresh) {
      config.headers = { ...config.headers, authorization: refreshToken };
    }
    if (accessToken && !isRefresh && tokenIsValid) {
      config.headers = { ...config.headers, authorization: accessToken };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.tokensPair) {
      window.localStorage.setItem(
        CONSTANTS.ACCESS_TOKEN,
        response.data.tokensPair.accessToken
      );
      window.localStorage.setItem(
        CONSTANTS.REFRESH_TOKEN,
        response.data.tokensPair.refreshToken
      );
    }
    return response;
  },
  (err) => {
    if (
      err.response.status === 408 &&
      history.location.pathname !== "/login" &&
      history.location.pathname !== "/registration" &&
      history.location.pathname !== "/"
    ) {
      history.replace("/login");
    }
    return Promise.reject(err);
  }
);

export default instance;
