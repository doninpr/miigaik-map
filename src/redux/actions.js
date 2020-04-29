import {
	MAPBOX_READY,
	RESIZE_WINDOW,
	MAPBOX_VIEWPORT_CHANGE,
  CHANGE_FLOOR,
  SHOW_INFOBLOCK,
  HIDE_INFOBLOCK,
  API_START_BUILDS,
  API_GET_BUILDS,
  API_END_BUILDS,
  API_START_FLOORS,
  API_GET_FLOORS,
  API_END_FLOORS,
  API_START_ROOMS,
  API_GET_ROOMS,
  API_END_ROOMS,
  API_START_ROUTE,
  API_GET_ROUTE,
  API_END_ROUTE,
  CLOSE_BUILD_LAYERS,
  API_START_ENTERS,
  API_GET_ENTERS,
  API_END_ENTERS,
  ADD_BUILDS_TO_MAP,
  ADD_FLOORS_TO_MAP,
  ADD_ROOMS_TO_MAP,
  ADD_ENTERS_TO_MAP,
  ADD_ROUTE_TO_MAP,
  FILTERS_CHANGED,
  HIDE_MODAL,
  SHOW_MODAL,
  API_START_ROOM,
  API_GET_ROOM,
  API_END_ROOM,
  SET_BUILD_TO_VIEW,
  ADD_ROOM_TO_MAP,
  CLOSE_CURRENT_ROOM,
  CLOSE_ROUTER,
  NEXT_ROUTE_STEP,
  PREV_ROUTE_STEP,
  START_SEARCH,
  GET_SEARCH,
  END_SEARCH,
  CLOSE_SEARCH,
} from "./actionTypes";
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import _ from "lodash";

export const mapboxReady = () => ({
  type: MAPBOX_READY,
  payload: {}
});

export const mapboxViewportChange = (viewport) => ({
  type: MAPBOX_VIEWPORT_CHANGE,
  payload: {
    viewport
  }
});

export const changeWindowSize = (width, height) => ({
  type: RESIZE_WINDOW,
  payload: {
  	width,
  	height
  }
});

export const changeCurrentFloor = (floor) => ({
  type: CHANGE_FLOOR,
  payload: {
    floor
  }
});

export const showInfoblock = (id) => ({
  type: SHOW_INFOBLOCK,
  payload: {
    id
  }
});

export const hideInfoblock = () => ({
  type: HIDE_INFOBLOCK,
  payload: {}
});

export const startFetchBuilds = () => ({
  type: API_START_BUILDS,
  payload: {}
});

export const getFetchBuilds = (result) => ({
  type: API_GET_BUILDS,
  payload: {
    result
  }
});

export const endFetchBuilds = () => ({
  type: API_END_BUILDS,
  payload: {}
});

export const startFetchFloors = () => ({
  type: API_START_FLOORS,
  payload: {}
});

export const getFetchFloors = (result) => ({
  type: API_GET_FLOORS,
  payload: {
    result
  }
});

export const endFetchFloors = () => ({
  type: API_END_FLOORS,
  payload: {}
});

export const startFetchRooms = () => ({
  type: API_START_ROOMS,
  payload: {}
});

export const getFetchRooms = (result) => ({
  type: API_GET_ROOMS,
  payload: {
    result
  }
});

export const endFetchRooms = () => ({
  type: API_END_ROOMS,
  payload: {}
});

export const startFetchRoute = () => ({
  type: API_START_ROUTE,
  payload: {}
});

export const getFetchRoute = (result) => ({
  type: API_GET_ROUTE,
  payload: {
    result
  }
});

export const endFetchRoute = () => ({
  type: API_END_ROUTE,
  payload: {}
});

export const closeBuildLayers = () => ({
  type: CLOSE_BUILD_LAYERS,
  payload: {}
});

export const startFetchEnters = () => ({
  type: API_START_ENTERS,
  payload: {}
});

export const getFetchEnters = (result) => ({
  type: API_GET_ENTERS,
  payload: {
    result
  }
});

export const endFetchEnters = () => ({
  type: API_END_ENTERS,
  payload: {}
});

export const addBuildsToMap = () => ({
  type: ADD_BUILDS_TO_MAP,
  payload: {}
});

export const addFloorsToMap = () => ({
  type: ADD_FLOORS_TO_MAP,
  payload: {}
});

export const addRoomsToMap = () => ({
  type: ADD_ROOMS_TO_MAP,
  payload: {}
});

export const addEntersToMap = () => ({
  type: ADD_ENTERS_TO_MAP,
  payload: {}
});

export const addRouteToMap = () => ({
  type: ADD_ROUTE_TO_MAP,
  payload: {}
});

export const filtersChanged = () => ({
  type: FILTERS_CHANGED,
  payload: {}
});

export const hideModal = () => ({
  type: HIDE_MODAL,
  payload: {}
});

export const showModal = (props) => ({
  type: SHOW_MODAL,
  payload: {
    ...props
  }
});

export const setBuildToView = (build_id) => ({
  type: SET_BUILD_TO_VIEW,
  payload: {
    build_id
  }
});

export const startFetchRoomById = () => ({
  type: API_START_ROOM,
  payload: {}
});

export const getFetchRoomById = (result) => ({
  type: API_GET_ROOM,
  payload: {
    result
  }
});

export const endFetchRoomById = () => ({
  type: API_END_ROOM,
  payload: {}
});

export const addCurrentRoomToMap = () => ({
  type: ADD_ROOM_TO_MAP,
  payload: {}
});

export const closeCurrentRoom = () => ({
  type: CLOSE_CURRENT_ROOM,
  payload: {}
});

export const closeRouter = () => ({
  type: CLOSE_ROUTER,
  payload: {}
});

export const nextRouteStep = () => ({
  type: NEXT_ROUTE_STEP,
  payload: {}
});

export const prevRouteStep = () => ({
  type: PREV_ROUTE_STEP,
  payload: {}
});


export const startSearch = () => ({
  type: START_SEARCH,
  payload: {}
});
export const getSearch = (result) => ({
  type: GET_SEARCH,
  payload: {
    result
  }
});
export const endSearch = () => ({
  type: END_SEARCH,
  payload: {}
});
export const closeSearch = () => ({
  type: CLOSE_SEARCH,
  payload: {}
});

///////////////////////

const client = new ApolloClient({
  uri: 'http://176.57.215.25:8080/v1/graphql',
});

export const fetchSearch = (query) => {
  return dispatch => {
    dispatch(startSearch());
    client
      .query({
        query: gql`
          query MyQuery {
            room_search(args: {search: "${query}"}, limit: 10) {
              id
              name
              numb
              type
              floor
              build_id
            }
          }

        `
      })
      .then(result => {
        dispatch(getSearch(result.data.room_search));
        dispatch(endSearch());
      });
  }
}

export const fetchRoomById = (id) => {
  return dispatch => {
    dispatch(startFetchRoomById());
    client
      .query({
        query: gql`
          query MyQuery {
            api_room(where: {id: {_eq: ${id}}}) {
              build_id
              enter_id
              floor
              id
              name
              numb
              type
              geom
            }
          }
        `
      })
      .then(result => {
        dispatch(getFetchRoomById(result.data.api_room[0]));
        dispatch(endFetchRoomById());
      });
  }
}

export const fetchBuilds = () => {
  return dispatch => {
    dispatch(startFetchBuilds());
    client
      .query({
        query: gql`
          query MyQuery {
            api_build {
              name
              id
              geom
              addr
            }
          }
        `
      })
      .then(result => {
        dispatch(getFetchBuilds(result.data.api_build));
        dispatch(endFetchBuilds());
      });
  }
}

export const fetchFloorsByBuildId = (id) => {
  return dispatch => {
    dispatch(startFetchFloors());
    client
      .query({
        query: gql`
          query MyQuery {
            api_floor(where: {build_id: {_eq: ${id}}}) {
              floor
              build_id
              id
              geom
            }
          }
        `
      })
      .then(result => {
        dispatch(getFetchFloors(result.data.api_floor));
        dispatch(endFetchFloors());
      });
  }
}

export const fetchRoomsByBuildId = (id) => {
  return dispatch => {
    dispatch(startFetchRooms());
    client
      .query({
        query: gql`
          query MyQuery {
            api_room(where: {build_id: {_eq: ${id}}}) {
              id
              floor
              build_id
              name
              numb
              enter_id
              geom
            }
          }
        `
      })
      .then(result => {
        dispatch(getFetchRooms(result.data.api_room));
        dispatch(endFetchRooms());
      });
  }
}

export const fetchEntersByBuildId = (id) => {
  return dispatch => {
    dispatch(startFetchEnters());
    client
      .query({
        query: gql`
          query MyQuery {
            api_enter(where: {build_id: {_eq: ${id}}}) {
              floor
              id
              unite_id
              v_id
              name
              build_id
              numb
              geom
            }
          }
        `
      })
      .then(result => {
        dispatch(getFetchEnters(result.data.api_enter));
        dispatch(endFetchEnters());
      });
  }
}

export const fetchRouteByEnterId = (id) => {
  return dispatch => {
    dispatch(startFetchRoute());
    new ApolloClient({
      uri: 'http://176.57.215.25:8080/v1/graphql',
    })
      .query({
        query: gql`
          query MyQuery {
            build_route(args: {point_from: 53, point_to: ${id}}) {
              id
              route
            }
          }
        `
      })
      .then(result => {
        dispatch(getFetchRoute(result.data.build_route));
        dispatch(endFetchRoute());
      });
  }
}












