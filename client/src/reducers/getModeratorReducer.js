import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';

const initialState = {
  isFetching: true,
  error: null,
  moderData: [],
  haveMore: true,
  moderatorFilter: CONSTANTS.MODER_STATUS_CONTESTS,
  isShowOnFull: false,
  imagePath: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_MODERATION_ACTION_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.GET_MODERATION_ACTION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        moderData: [...state.moderData, ...action.data.moderData],
        haveMore: action.data.haveMore,
      };
    }
    case ACTION.GET_MODERATION_ACTION_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
        moderData: [],
      };
    }
    case ACTION.CLEAR_MODERATION_LIST: {
      return {
        ...state,
        error: null,
        moderData: [],
      };
    }
    case ACTION.SET_NEW_MODERATION_FILTER: {
      return {
        ...initialState,
        isFetching: false,
        moderatorFilter: action.filter,
      };
    }
    case ACTION.CHANGE_SHOW_IMAGE: {
      return {
        ...state,
        isShowOnFull: action.data.isShowOnFull,
        imagePath: action.data.imagePath,
      };
    }
    default:
      return state;
  }
}
