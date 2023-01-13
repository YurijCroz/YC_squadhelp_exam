import ACTION from "../actions/actionTypes";
import CONSTANTS from "../constants";

const initialState = {
  isFetching: true,
  error: null,
  moderData: [],
  haveMore: true,
  moderatorFilter: CONSTANTS.MODER_STATUS_CONTESTS,
  filterStatus: CONSTANTS.STATUS_MODERATION.INSPECTION,
  isShowOnFull: false,
  imagePath: null,
  refresh: false,
};

function getModeratorReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_MODERATION_ACTION_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
        refresh: false,
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
        filterStatus: state.filterStatus,
      };
    }
    case ACTION.SET_STATUS_MODERATION_FILTER: {
      return {
        ...state,
        filterStatus: action.filter,
      };
    }
    case ACTION.CHANGE_SHOW_IMAGE: {
      return {
        ...state,
        isShowOnFull: action.data.isShowOnFull,
        imagePath: action.data.imagePath,
      };
    }
    case ACTION.MODERATION_OFFER_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
        moderData: [],
      };
    }
    case ACTION.MODERATION_LIST_REFRESH: {
      return {
        ...state,
        refresh: true,
      };
    }
    default:
      return state;
  }
}

export default getModeratorReducer;