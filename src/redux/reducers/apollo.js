import {
	API_START_BUILDS,
	API_END_BUILDS,
	API_START_FLOORS,
	API_END_FLOORS,
	API_START_ROOMS,
	API_END_ROOMS,
	API_START_ROUTE,
	API_END_ROUTE,
	API_START_ENTERS,
	API_END_ENTERS,
	ADD_BUILDS_TO_MAP,
	ADD_FLOORS_TO_MAP,
	ADD_ROOMS_TO_MAP,
	ADD_ENTERS_TO_MAP,
	ADD_ROUTE_TO_MAP,
	CLOSE_BUILD_LAYERS,
  API_START_ROOM,
  API_GET_ROOM,
  API_END_ROOM,
  ADD_ROOM_TO_MAP,
  CLOSE_CURRENT_ROOM,
  CLOSE_ROUTER,
  NEXT_ROUTE_STEP,
  PREV_ROUTE_STEP,
  START_SEARCH,
  GET_SEARCH,
  END_SEARCH,
} from "../actionTypes";

const initialState = {
  isApolloStarted: false,
  builds: {
  	isLoading: false,
  	isFinished: false,
  	isOnMap: false,
  },
  floors: {
  	isLoading: false,
  	isFinished: false,
  	isOnMap: false,
  },
  rooms: {
  	isLoading: false,
  	isFinished: false,
  	isOnMap: false,
  },
  enters: {
  	isLoading: false,
  	isFinished: false,
  	isOnMap: false,
  },
  route: {
  	isLoading: false,
  	isFinished: false,
  	isOnMap: false,
  },
  currentRoom: {
    isLoading: false,
    isFinished: false,
    isOnMap: false,
  },
  search: {
    isLoading: false,
    isFinished: false,
    results: [],
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case API_START_BUILDS: {
      return {
        ...state,
        isApolloStarted: true,
        builds: {
        	...state.builds,
        	isLoading: true,
  			  isFinished: false,
  			  isOnMap: false,
        }
      };
    }
    case API_END_BUILDS: {
      return {
        ...state,
        builds: {
        	...state.builds,
        	isLoading: false,
  			  isFinished: true,
        }
      };
    }
    case API_START_FLOORS: {
      return {
        ...state,
        floors: {
        	...state.floors,
        	isLoading: true,
  			  isFinished: false,
  			  isOnMap: false,
        }
      };
    }
    case API_END_FLOORS: {
      return {
        ...state,
        floors: {
        	...state.floors,
        	isLoading: false,
  			  isFinished: true,
        }
      };
    }
    case API_START_ROOMS: {
      return {
        ...state,
        rooms: {
        	...state.rooms,
        	isLoading: true,
  			  isFinished: false,
  			  isOnMap: false,
        }
      };
    }
    case API_END_ROOMS: {
      return {
        ...state,
        rooms: {
        	...state.rooms,
        	isLoading: false,
  			  isFinished: true,
        }
      };
    }
    case API_START_ROUTE: {
      return {
        ...state,
        route: {
        	...state.route,
        	isLoading: true,
  			  isFinished: false,
  			  isOnMap: false,
        }
      };
    }
    case API_END_ROUTE: {
      return {
        ...state,
        route: {
        	...state.route,
        	isLoading: false,
  			  isFinished: true,
        }
      };
    }
    case API_START_ENTERS: {
      return {
        ...state,
        enters: {
        	...state.enters,
        	isLoading: true,
  			  isFinished: false,
  			  isOnMap: false,
        }
      };
    }
    case API_END_ENTERS: {
      return {
        ...state,
        enters: {
        	...state.enters,
        	isLoading: false,
  			  isFinished: true,
        }
      };
    }
    case ADD_BUILDS_TO_MAP: {
    	return {
	        ...state,
	        builds: {
	        	...state.builds,
	        	isOnMap: true,
	        }
	    };
    }
    case ADD_FLOORS_TO_MAP: {
    	return {
	        ...state,
	        floors: {
	        	...state.floors,
	        	isOnMap: true,
	        }
	    };
    }
    case ADD_ROOMS_TO_MAP: {
    	return {
	        ...state,
	        rooms: {
	        	...state.rooms,
	        	isOnMap: true,
	        }
	    };
    }
    case ADD_ENTERS_TO_MAP: {
    	return {
	        ...state,
	        enters: {
	        	...state.enters,
	        	isOnMap: true,
	        }
	    };
    }
    case ADD_ROUTE_TO_MAP: {
    	return {
	        ...state,
	        route: {
	        	...state.route,
	        	isOnMap: true,
	        }
	    };
    }
    case CLOSE_BUILD_LAYERS: {
    	return {
    		...state,
			floors: {
				...state.floors,
				isOnMap: false,
			},
			rooms: {
				...state.rooms,
				isOnMap: false,
			},
			enters: {
				...state.enters,
				isOnMap: false,
			},
			route: {
				...state.route,
				isOnMap: false,
			}
    	};
    }
    case API_START_ROOM: {
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          isLoading: true,
          isFinished: false,
          isOnMap: false,
        }
      };
    }
    case API_END_ROOM: {
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          isLoading: false,
          isFinished: true,
          isOnMap: false,
        }
      };
    }
    case ADD_ROOM_TO_MAP: {
      return {
          ...state,
          currentRoom: {
            ...state.currentRoom,
            isOnMap: true,
          }
      };
    }
    case CLOSE_CURRENT_ROOM: {
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          isLoading: false,
          isFinished: true,
          isOnMap: false,
        }
      };
    }
    case CLOSE_ROUTER: {
      return {
        ...state,
        route: {
          ...state.route,
          isLoading: false,
          isFinished: true,
          isOnMap: false,
        }
      };
    }
    case NEXT_ROUTE_STEP:
    case PREV_ROUTE_STEP: {
      return {
        ...state,
        route: {
          ...state.route,
          isLoading: false,
          isFinished: true,
          isOnMap: false,
        },
      };
    }
    case START_SEARCH: {
      return {
        ...state,
        search: {
          ...state.search,
          isLoading: true,
          isFinished: false,
        }
      };
    }
    case GET_SEARCH: {
      return {
        ...state,
        search: {
          ...state.search,
          results: action.payload.result,
        }
      };
    }
    case END_SEARCH: {
      return {
        ...state,
        search: {
          ...state.search,
          isLoading: false,
          isFinished: true,
        }
      };
    }
    default:
      return state;
  }
}
