import { SHOW_INFOBLOCK, HIDE_INFOBLOCK } from "../actionTypes";

const initialState = {
  isShow: false,
  id: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_INFOBLOCK: {
      return {
        ...state,
        isShow: true,
        id: action.payload.id,
      };
    }
    case HIDE_INFOBLOCK: {
      return {
        ...state,
        ...initialState,
      };
    }
    default:
      return state;
  }
}
