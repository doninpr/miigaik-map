import { SHOW_MODAL, HIDE_MODAL } from "../actionTypes";

const initialState = {
  isShown: false,
  header: '',
  content: '',
  props: {},
  size: 'lg',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      return {
        ...initialState,
        isShown: true,
        ...action.payload,
      };
    }
    case HIDE_MODAL: {
      return {
        ...state,
        isShown: false,
      };
    }
    default:
      return state;
  }
}
