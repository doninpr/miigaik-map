import {
	MAPBOX_READY,
	RESIZE_WINDOW,
	MAPBOX_VIEWPORT_CHANGE,
  CHANGE_FLOOR,
  SHOW_INFOBLOCK,
  HIDE_INFOBLOCK
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



///////////////////////