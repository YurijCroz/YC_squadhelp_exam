import ACTION from "../actions/actionTypes";

const initialState = {
  isRenderHeader: true,
  isRenderFooter: true,
};

function renderComponentReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.SET_IS_RENDER_HEADER:
      return {
        ...state,
        isRenderHeader: action.data,
      };
    case ACTION.SET_IS_RENDER_FOOTER:
      return {
        ...state,
        isRenderFooter: action.data,
      };
    default:
      return state;
  }
}

export default renderComponentReducer;
