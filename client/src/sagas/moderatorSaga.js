import { put } from "redux-saga/effects";
import ACTION from "../actions/actionTypes";
import * as restController from "../api/rest/restController";

export function* moderatorContestsSaga(action) {
  yield put({ type: ACTION.GET_MODERATION_ACTION_REQUEST });
  try {
    const { data } = yield restController.getModeratorContests(action.data);
    yield put({ type: ACTION.GET_MODERATION_ACTION_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.GET_MODERATION_ACTION_ERROR, error: e.response });
  }
}

export function* moderatorOffersSaga(action) {
  yield put({ type: ACTION.GET_MODERATION_ACTION_REQUEST });
  try {
    const { data } = yield restController.getModeratorOffers(action.data);
    yield put({ type: ACTION.GET_MODERATION_ACTION_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.GET_MODERATION_ACTION_ERROR, error: e.response });
  }
}

export function* getContestByIdForModeratorSaga(action) {
  yield put({ type: ACTION.GET_CONTEST_BY_ID_FOR_MODERATOR_REQUEST });
  try {
    const { data } = yield restController.getContestByIdForModerator(action.data);
    yield put({ type: ACTION.GET_CONTEST_BY_ID_FOR_MODERATOR_SUCCESS, data: { contestData: data } });
  } catch (e) {
    yield put({ type: ACTION.GET_CONTEST_BY_ID_FOR_MODERATOR_ERROR, error: e.response });
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
    yield put({ type: ACTION.GET_OFFERS_FOR_MODERATOR });
  } catch (e) {
    yield put({ type: ACTION.MODERATION_OFFER_ERROR, error: e.response });
  }
}
