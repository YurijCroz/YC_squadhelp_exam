import ACTION from "../actions/actionTypes";

const initialState = {
  isFetching: true,
  contestData: null,
  error: null,
  backPage: false,
};

function getContestByIdForModeratorReducer(state = initialState, action) {
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
        backPage: false,
      };
    }
    case ACTION.MODERATION_CONTEST_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ACTION.MODERATION_CONTEST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        backPage: true,
      };
    }
    case ACTION.MODERATION_CONTEST_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    case ACTION.BACK_TO_MODERATION_LIST: {
      return {
        ...state,
        backPage: true,
      };
    }
    default:
      return state;
  }
}

export default getContestByIdForModeratorReducer;
