import { RESIZE_WINDOW } from "../actionTypes";

const initialState = {
  width: 0,
  height: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESIZE_WINDOW: {
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
      };
    }
    default:
      return state;
  }
}
