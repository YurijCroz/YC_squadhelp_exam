import ACTION from "../actions/actionTypes";
import CONSTANTS from "../constants";

const initialState = {
  events: JSON.parse(localStorage.getItem(CONSTANTS.EVENT_KEY)) || null,
};

function eventReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.SET_LOCAL_STORAGE_DATA:
      return {
        ...state,
        events: action.data,
      };
    default:
      return state;
  }
}

export default eventReducer;
