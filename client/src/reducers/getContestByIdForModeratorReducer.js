import ACTION from '../actions/actionTypes';
import CONTANTS from '../constants';

const initialState = {
  isFetching: true,
  contestData: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_CONTEST_BY_ID_FOR_MODERATOR_REQUEST: {
      return {
        ...state,
        isFetching: true,
        contestData: null,
        error: null,
      };
    }
    case ACTION.GET_CONTEST_BY_ID_FOR_MODERATOR_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        contestData: action.data.contestData,
        error: null,
      };
    }
    case ACTION.GET_CONTEST_BY_ID_FOR_MODERATOR_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    case ACTION.CLEAR_CONTEST_BY_ID_FOR_MODERATOR: {
      return {
        ...state,
        error: null,
        contestData: null,
        isFetching: true,
      }
    }
    default:
      return state;
  }
}
