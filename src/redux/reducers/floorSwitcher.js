import { CHANGE_FLOOR } from "../actionTypes";

const initialState = {
  currentFloor: 2,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FLOOR: {
      return {
        ...state,
        currentFloor: action.payload.floor,
      };
    }
    default:
      return state;
  }
}
