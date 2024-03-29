import { put } from "redux-saga/effects";
import ACTION from "../actions/actionTypes";
import { objectToQueryString } from "../utils/utils";
import * as restController from "../api/rest/restController";

export function* moderatorGetContestsSaga(action) {
  yield put({ type: ACTION.GET_MODERATION_ACTION_REQUEST });
  try {
    const query = objectToQueryString(action.data)
    const { data } = yield restController.getModeratorContests(query);
    yield put({ type: ACTION.GET_MODERATION_ACTION_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.GET_MODERATION_ACTION_ERROR, error: e.response });
  }
}

export function* moderatorGetOffersSaga(action) {
  yield put({ type: ACTION.GET_MODERATION_ACTION_REQUEST });
  try {
    const query = objectToQueryString(action.data)
    const { data } = yield restController.getModeratorOffers(query);
    yield put({ type: ACTION.GET_MODERATION_ACTION_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.GET_MODERATION_ACTION_ERROR, error: e.response });
  }
}

export function* getContestByIdForModeratorSaga(action) {
  yield put({ type: ACTION.GET_CONTEST_BY_ID_FOR_MODERATOR_REQUEST });
  try {
    const { data } = yield restController.getContestByIdForModerator(
      action.data
    );
    yield put({
      type: ACTION.GET_CONTEST_BY_ID_FOR_MODERATOR_SUCCESS,
      data: { contestData: data },
    });
  } catch (e) {
    yield put({
      type: ACTION.GET_CONTEST_BY_ID_FOR_MODERATOR_ERROR,
      error: e.response,
    });
  }
}

export function* moderationContestSaga(action) {
  yield put({ type: ACTION.MODERATION_CONTEST_REQUEST });
  try {
    const { data } = yield restController.moderationContest(action.data);
    yield put({ type: ACTION.MODERATION_CONTEST_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.MODERATION_CONTEST_ERROR, error: e.response });
  }
}

export function* moderationOfferSaga(action) {
  try {
    yield restController.moderationOffer(action.data);
    yield put({ type: ACTION.CLEAR_MODERATION_LIST });
    yield put({ type: ACTION.MODERATION_LIST_REFRESH });
  } catch (e) {
    yield put({ type: ACTION.MODERATION_OFFER_ERROR, error: e.response });
  }
}
