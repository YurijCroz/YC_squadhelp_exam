import { put } from "redux-saga/effects";
import ACTION from "../actions/actionTypes";
import * as restController from "../api/rest/restController";
import CONSTANTS from "../constants";

export function* privateSaga() {
  yield put({ type: ACTION.GET_USER_REQUEST });
  try {
    const { data } = localStorage.getItem(CONSTANTS.ACCESS_TOKEN)
      ? yield restController.getUser()
      : null;
    yield put({ type: ACTION.GET_USER_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.GET_USER_ERROR, error: e.response });
  }
}

export function* notAuthorizeSaga(action) {
  yield put({ type: ACTION.GET_USER_REQUEST });
  try {
    const { data } = localStorage.getItem(CONSTANTS.ACCESS_TOKEN)
      ? yield restController.getUser()
      : null;
    action.replace("/");
    yield put({ type: ACTION.GET_USER_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.GET_USER_ERROR, error: e });
  }
}

export function* updateUserData(action) {
  try {
    const { data } = yield restController.updateUser(action.data);
    yield put({ type: ACTION.UPDATE_USER_DATA_SUCCESS, data });
    yield put({ type: ACTION.CHANGE_EDIT_MODE_ON_USER_PROFILE, data: false });
  } catch (e) {
    yield put({ type: ACTION.UPDATE_USER_DATA_ERROR, error: e.response });
  }
}

export function* headerRequest() {
  yield put({ type: ACTION.GET_USER_REQUEST });
  try {
    const { data } = localStorage.getItem(CONSTANTS.ACCESS_TOKEN)
      ? yield restController.getUser()
      : null;
    yield put({ type: ACTION.GET_USER_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.GET_USER_ERROR, error: e.response });
  }
}
