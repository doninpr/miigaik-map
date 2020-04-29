import {
  MAPBOX_READY, RESIZE_WINDOW, MAPBOX_VIEWPORT_CHANGE,
  API_GET_BUILDS,
  API_GET_FLOORS,
  API_GET_ROOMS,
  CHANGE_FLOOR,
  API_GET_ROUTE,
  CLOSE_BUILD_LAYERS,
  API_GET_ENTERS,
  FILTERS_CHANGED,
  SET_BUILD_TO_VIEW,
  API_GET_ROOM,
  CLOSE_CURRENT_ROOM,
  CLOSE_ROUTER,
  NEXT_ROUTE_STEP,
  PREV_ROUTE_STEP,
} from "../actionTypes";
import { MAPBOX } from "../../constants";

const initialState = {
  isMapboxReady: false,
  isFiltersChanged: false,
  viewport: {
    ...MAPBOX.VIEWPORT,
  },
  builds: {
    buildToView: undefined,
    data: [],
  },
  floors: {
    floorToView: undefined,
    data: [],
  },
  rooms: {
    data: [],
  },
  enters: {
    data: [],
  },
  route: {
    stepToView: undefined,
    data: [],
  },
  currentRoom: {
    data: null,
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FILTERS_CHANGED: {
      return {
        ...state,
        isFiltersChanged: false,
      };
    }
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
    case API_GET_BUILDS: {
      return {
        ...state,
        builds: {
          buildToView: undefined,
          data: {
            ...action.payload.result,
          },
        },
      };
    }
    case API_GET_FLOORS: {
      return {
        ...state,
        isFiltersChanged: true,
        builds: {
          ...state.builds,
          buildToView: action.payload.result[0].build_id,
        },
        floors: {
          ...state.floors,
          floorToView: state.floors.floorToView ? state.floors.floorToView : 2,
          data: {
            ...action.payload.result,
          },
        }
      };
    }
    case API_GET_ROOMS: {
      return {
        ...state,
        isFiltersChanged: true,
        rooms: {
          ...state.rooms,
          data: {
            ...action.payload.result,
          },
        }
      };
    }
    case API_GET_ROUTE: {
      return {
        ...state,
        isFiltersChanged: true,
        route: {
          ...state.route,
          stepToView: 0,
          data: {
            ...action.payload.result,
          },
        },
        floors: {
          ...state.floors,
          floorToView: action.payload.result[0].route.properties.floor,
        },
        builds: {
          ...state.builds,
          buildToView: action.payload.result[0].route.properties.build_id,
        }
      };
    }
    case API_GET_ENTERS: {
      return {
        ...state,
        isFiltersChanged: true,
        enters: {
          ...state.route,
          data: {
            ...action.payload.result,
          },
        }
      };
    }
    case CHANGE_FLOOR: {
      return {
        ...state,
        isFiltersChanged: true,
        floors: {
          ...state.floors,
          floorToView: action.payload.floor,
        }
      };
    }
    case API_GET_ROOM: {
      return {
        ...state,
        isFiltersChanged: true,
        currentRoom: {
          ...state.currentRoom,
          data: action.payload.result,
        },
        floors: {
          ...state.floors,
          floorToView: action.payload.result.floor,
        },
        builds: {
          ...state.builds,
          buildToView: action.payload.result.build_id,
        }
      };
    }
    case SET_BUILD_TO_VIEW: {
      return {
        ...state,
        isFiltersChanged: true,
        builds: {
          ...state.builds,
          buildToView: action.payload.build_id,
        },
        floors: {
          ...state.floors,
          floorToView: undefined,
        }
      };
    }
    case CLOSE_BUILD_LAYERS: {
      return {
        ...state,
        isFiltersChanged: true,
        builds: {
          ...state.builds,
          buildToView: undefined,
        },
        floors: {
          ...initialState.floors,
        },
        rooms: {
          ...initialState.rooms,
        },
        enters: {
          ...initialState.enters,
        },
        route: {
          ...initialState.route,
        },
        currentRoom: {
          ...initialState.currentRoom,
        }
      };
    }
    case CLOSE_CURRENT_ROOM: {
      return {
        ...state,
        isFiltersChanged: true,
        currentRoom: {
          ...initialState.currentRoom,
        }
      };
    }
    case CLOSE_ROUTER: {
      return {
        ...state,
        isFiltersChanged: true,
        route: {
          ...initialState.route,
        }
      };
    }
    case NEXT_ROUTE_STEP: {
      return {
        ...state,
        isFiltersChanged: true,
        route: {
          ...state.route,
          stepToView: state.route.stepToView + 1,
        },
        floors: {
          ...state.floors,
          floorToView: state.route.data[state.route.stepToView + 1].route.properties.floor,
        },
        builds: {
          ...state.builds,
          buildToView: state.route.data[state.route.stepToView + 1].route.properties.build_id,
        }
      };
    }
    case PREV_ROUTE_STEP: {
      return {
        ...state,
        isFiltersChanged: true,
        route: {
          ...state.route,
          stepToView: state.route.stepToView - 1,
        },
        floors: {
          ...state.floors,
          floorToView: state.route.data[state.route.stepToView - 1].route.properties.floor,
        },
        builds: {
          ...state.builds,
          buildToView: state.route.data[state.route.stepToView - 1].route.properties.build_id,
        }
      };
    }
    default:
      return state;
  }
}
