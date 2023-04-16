import { call, put } from "redux-saga/effects";
import ACTION from "../actions/actionTypes";
import CONSTANTS from "../constants";

export function* setLocalStorageEventsSaga(action) {
  try {
    if (action.data.length > 0) {
      yield call(
        [localStorage, "setItem"],
        CONSTANTS.EVENT_KEY,
        JSON.stringify(action.data)
      );
    } else {
      yield call([localStorage, "removeItem"], CONSTANTS.EVENT_KEY);
    }
  } catch (error) {
    console.error("Error while setting data to local storage: ", error);
  }
}

export function* getLocalStorageEventsSaga() {
  try {
    const events =
      JSON.parse(localStorage.getItem(CONSTANTS.EVENT_KEY)) || null;
    yield put({
      type: ACTION.GET_LOCAL_STORAGE_EVENTS_SUCCESS,
      data: events,
    });
  } catch (error) {
    console.error("Error while setting data to local storage: ", error);
  }
}
