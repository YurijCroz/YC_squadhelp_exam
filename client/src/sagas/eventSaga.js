import { call } from "redux-saga/effects";
import CONSTANTS from "../constants"

export function* setLocalStorageDataSaga(action) {
  try {
    yield call(
      [localStorage, "setItem"],
      CONSTANTS.EVENT_KEY,
      JSON.stringify(action.data)
    );
  } catch (error) {
    console.error("Error while setting data to local storage: ", error);
  }
}
