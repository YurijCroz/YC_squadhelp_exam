import ACTION from "../actions/actionTypes";

const initialState = {
  events: null,
  isLoadingEvents: false,
};

function eventReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.SET_LOCAL_STORAGE_EVENTS:
      return {
        ...state,
        events: action.data,
      };
    case ACTION.GET_LOCAL_STORAGE_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.data,
        isLoadingEvents: true,
      };
    default:
      return state;
  }
}

export default eventReducer;
