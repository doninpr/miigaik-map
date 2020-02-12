import { MAPBOX_READY, RESIZE_WINDOW, MAPBOX_VIEWPORT_CHANGE } from "../actionTypes";
import { MAPBOX } from "../../constants";

const initialState = {
  isMapboxReady: false,
  viewport: {
    ...MAPBOX.VIEWPORT,
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MAPBOX_READY: {
      return {
        ...state,
        isMapboxReady: true,
      };
    }
    case RESIZE_WINDOW: {
      return {
        ...state,
        viewport: {
          ...state.viewport,
          width: action.payload.width,
          height: action.payload.height,
        }
      };
    }
    case MAPBOX_VIEWPORT_CHANGE: {
      return {
        ...state,
        viewport: {
          ...state.viewport,
          ...action.payload.viewport,
        }
      };
    }
    default:
      return state;
  }
}
