import CONSTANTS from "../constants";
import { refreshTokenRequest } from "../api/rest/restController";
const {
  MIN_LIFE_TIME_TOKEN,
  URL_REGISTRATION,
  URL_LOGIN,
  URL_REFRESH_TOKEN,
  URL_DATA_FOR_CONTEST,
} = CONSTANTS;

export const checkToken = (token) => {
  const tokenInfo = token.split(".")[1];
  const tokenInfoDecoded = window.atob(tokenInfo);
  const { exp } = JSON.parse(tokenInfoDecoded);
  const tokenLeftTime = exp - getUnixTime();
  return tokenLeftTime > MIN_LIFE_TIME_TOKEN;
};

const getUnixTime = () => Math.round(+new Date() / 1000);

export const refreshTokenHandler = async () => {
  try {
    const data = await refreshTokenRequest();
    return data.data.tokensPair.accessToken;
  } catch (error) {
    console.error(error.response);
  }
};

export const equalsUrlToRefresh = (url) => url === URL_REFRESH_TOKEN;

const urlNotForSign = [URL_REGISTRATION, URL_LOGIN, URL_DATA_FOR_CONTEST];

export const notSignTokenForRequest = (urlReq) =>
  urlNotForSign.some((url) => urlReq === url);
