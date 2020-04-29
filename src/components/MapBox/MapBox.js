import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import turf from 'turf';
import ReactMapGL, { Source, Layer, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ModalObjectContent from '../Modals/ModalContents/Object/Object';
import stairsImg from '../MapBox/images/stairs.png';
import wcImg from '../MapBox/images/wc.png';

import {
  mapboxViewportChange,
  mapboxReady,
  showInfoblock,
  fetchBuilds,
  fetchFloorsByBuildId,
  fetchRoomsByBuildId,
  fetchRouteByEnterId,
  closeBuildLayers,
  fetchEntersByBuildId,
  addBuildsToMap,
  addFloorsToMap,
  addRoomsToMap,
  addEntersToMap,
  addRouteToMap,
  filtersChanged,
  fetchRoomById,
  showModal,
  setBuildToView,
  addCurrentRoomToMap,
} from '../../redux/actions';
import "./styles.css";

class MapBox extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this._map = React.createRef();
    this.viewFloorsByCenter = this.viewFloorsByCenter.bind(this);
    this.getPaintByLayer = this.getPaintByLayer.bind(this);
  }

  updateViewport = viewport => {
  	this.props.mapboxViewportChange(viewport);
    this.setState({viewport});
  };

  getPaintByLayer = id => {
    switch (id) {
      case "builds":
        return {
            "fill-extrusion-color": "hsl(60, 0%, 77%)",
            "fill-extrusion-height": 20,
            "fill-extrusion-opacity": 0.8,
            };
        break;
      case "floors":
        return {
          'fill-color': '#fcfcfc',
        };
        break;
      case "rooms_fill":
        return {
            "fill-color": [
                "match",
                ["get", "status"],
                ["false"],
                "#BDBDBD",
                "#408DD2"
              ],
            "fill-opacity": 0.2
          };
        break;
      case "enters":
        return {
          "text-color": "#000",
          "text-halo-width": 1.5,
          "text-halo-color": "#ffffff",
          "text-halo-blur": 0.5,
        }
        break;
      case "route":
        return {
          "line-color": "#138900",
          "line-width": 2,
        }
        break;
      case "rooms_outline":
        return {
          "line-color": "#408DD2",
          "line-width": 1,
        }
        break;
      case "currentRoom":
        return {
            "fill-color": [
                "match",
                ["get", "status"],
                ["false"],
                "#BDBDBD",
                "#408DD2"
              ],
            "fill-opacity": 0.8
          };
        break;
      default:
        return null;
        break;
    }
  }

  getGeojson = list => {
    return {
      "type": "FeatureCollection",
      "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
      "features": _.map(list, (obj) => {
        return { "type": "Feature", "properties": { ...obj, geom: undefined }, "geometry": obj.geom };
      }),
    };
  }

  getRouteGeojson = list => {
    return {
      "type": "FeatureCollection",
      "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
      "features": _.map(list, (route) => {
        return route.route;
      }),
    };
  }

  viewFloorsByCenter(e) {
    if(e.target.transform._zoom > 17.5){
      const currentLayer = e.target.queryRenderedFeatures(e.target.transform.centerPoint, { layers: ["builds"] });
      if(currentLayer[0] && this.props.mapbox.builds.buildToView !== currentLayer[0].properties.id){
        this.props.fetchFloorsByBuildId(currentLayer[0].properties.id);
        this.props.fetchRoomsByBuildId(currentLayer[0].properties.id);
        this.props.fetchEntersByBuildId(currentLayer[0].properties.id);
      }
    }
  }

  mapboxReady() {
    this.props.mapboxReady();

    this._map.getMap().on('moveend', this.viewFloorsByCenter);
  }

  _onClick(event) {
    const targetLayer = event.features[0] && event.features[0].source;

    if(targetLayer === "builds_source"){
      this.props.setBuildToView(event.features[0].properties.id);
    }

    if(targetLayer === "rooms_source" && event.features[0].properties.status !== "false"){
      this.props.fetchRoomById(event.features[0].properties.id);
      this.props.showModal({ header: ("Ауд. " + event.features[0].properties.numb), content: ModalObjectContent, className: "modal-small" });
      //this.props.fetchRouteByEnterId(event.features[0].properties.enter_id);
    }

    if(targetLayer === "composite") {
      this.clearBuildLayers();
    }
  }

  addLayer({ id, data, paint, layout, type, source, beforeId}) {
    if(!this._map.getMap().getSource(id+'_source')){
      if(!this._map.getMap().getSource(source)){
        this._map.getMap().addSource(id+'_source', {
          'type': 'geojson',
          'data': data,
        });
      }
      
      this._map.getMap().addLayer({
        'id': id,
        'type': type || 'fill',
        'source': source || id+'_source',
        'paint': paint,
        'layout': layout || {}
      }, (this._map.getMap().getLayer(beforeId) ? beforeId : undefined));
    }
  }

  clearBuildLayers() {
    this.props.closeBuildLayers();
  }

  getImageName(numb) {
    switch (numb) {
      case "stairs":
        return "stairs";
        break;
      case "stair":
        return "stairs";
        break;
      case "men's toilet":
        return "wc";
        break;
      case "women's toilet":
        return "wc";
        break;
      case "room service":
        return "";
        break;
      default:
        return "none";
        break;
    }
  }

  addPointIcon = (img, name) => {
    const those = this;
    this._map.getMap().loadImage(img, function(error, image) {
      if (error) throw error;
      if (!those._map.getMap().hasImage(name)) those._map.getMap().addImage(name, image);
    });
  }

  setBuildFilters(id = -1) {
    this._map.getMap().setFilter('builds', ['!=', 'id', id]);
    //this._map.getMap().setPaintProperty('builds', 'fill-opacity', id === -1 ? 1 : 0.5);
  }

  setCurrentRoomFilters(build_id, floor) {
    if(this._map.getMap().getLayer('currentRoom') && floor && build_id){
      this._map.getMap().setFilter('currentRoom', [
        'all',
        ['==', 'floor', floor],
        ['==', 'build_id', build_id]
      ]);
    }
  }

  setFiltersByFloor(floor = -9999) {
    if(this._map.getMap().getLayer('floors')){
      this._map.getMap().setFilter('floors', ['==', 'floor', floor]);
    }
    if(this._map.getMap().getLayer('rooms')){
      this._map.getMap().setFilter('rooms', ['==', 'floor', floor]);
    }
    if(this._map.getMap().getLayer('rooms')){
      this._map.getMap().setFilter('rooms_outline', ['==', 'floor', floor]);
    }
    if(this._map.getMap().getLayer('enters')){
      this._map.getMap().setFilter('enters', ['==', 'floor', floor]); 
    }
  }

  setRouteFilters(build = -9999, floor = -9999) {
    if(this._map.getMap().getLayer('route')){
      this._map.getMap().setFilter('route', ['all', ['==', 'build_id', build], ['==', 'floor', floor]]);
    }
  }

  render() {
    //this._map <= use this to get map object
    if(this.props.isMapboxReady && !this.props.isApolloStarted){
      this.props.fetchBuilds();
    }

    if(
      (this.props.mapbox.builds.buildToView !== (this.props.mapbox.floors.data[0] && this.props.mapbox.floors.data[0].build_id)) &&
      !(this.props.apollo.floors.isLoading || this.props.apollo.rooms.isLoading || this.props.apollo.enters.isLoading)
    ){
      this.props.fetchFloorsByBuildId(this.props.mapbox.builds.buildToView);
      this.props.fetchRoomsByBuildId(this.props.mapbox.builds.buildToView);
      this.props.fetchEntersByBuildId(this.props.mapbox.builds.buildToView);
    }

    //BUILDS
    if(this.props.apollo.builds.isFinished && !this.props.apollo.builds.isOnMap){
      if(!this._map.getMap().getSource('builds_source')){
        this.addLayer({
          id: 'builds',
          type: 'fill-extrusion',
          data: this.getGeojson(this.props.mapbox.builds.data),
          paint: this.getPaintByLayer('builds'),
        });
      }
      this.props.addBuildsToMap();
    }

    //FLOORS
    if(this.props.apollo.floors.isFinished && !this.props.apollo.floors.isOnMap){
      if(!this._map.getMap().getSource('floors_source')){
        this.addLayer({
          id: 'floors',
          data: this.getGeojson(this.props.mapbox.floors.data),
          paint: this.getPaintByLayer('floors'),
          beforeId: 'currentRoom'
        });
      } else {
        this._map.getMap().getSource('floors_source').setData(this.getGeojson(this.props.mapbox.floors.data));
      }
      this.props.addFloorsToMap();
    }

    //CURRENT ROOM
    if(this.props.apollo.currentRoom.isFinished && !this.props.apollo.currentRoom.isOnMap){
      const geojson_array = this.props.mapbox.currentRoom.data === null ? [] : [this.props.mapbox.currentRoom.data];
      if(!this._map.getMap().getSource('currentRoom_source')){
        this.addLayer({
          id: 'currentRoom',
          data: this.getGeojson(geojson_array),
          paint: this.getPaintByLayer('currentRoom'),
          beforeId: 'currentRoom',
        });
      } else {
        this._map.getMap().getSource('currentRoom_source').setData(this.getGeojson(geojson_array));
      }

      if(this.props.mapbox.currentRoom.data !== null){
        const turf_bbox = turf.bbox(this.props.mapbox.currentRoom.data.geom);
        const newCameraTransform = this._map.getMap().cameraForBounds([[turf_bbox[0],turf_bbox[1]],[turf_bbox[2],turf_bbox[3]]], {
          padding: {top: 50, bottom:50, left: 15, right: 15}
        });

        this.props.mapboxViewportChange({
          zoom: newCameraTransform.zoom > 18.5 ? 18.5 : newCameraTransform.zoom,
          longitude: newCameraTransform.center.lng,
          latitude: newCameraTransform.center.lat,
        });
      }
      this.props.addCurrentRoomToMap();
    }

    //ROOMS
    if(this.props.apollo.rooms.isFinished && !this.props.apollo.rooms.isOnMap && this._map.getMap().getLayer('floors')){
      if(!this._map.getMap().getSource('rooms_source')){
        this.addLayer({
          id: 'rooms',
          data: this.getGeojson(_.map(this.props.mapbox.rooms.data, (element) => {
            element.status = element.numb === null ? "false" : element.numb;
            return element;
          })),
          paint: this.getPaintByLayer('rooms_fill'),
        });
        if(this._map.getMap().getSource('rooms_source')){
          this.addLayer({
            id: 'rooms_outline',
            type: 'line',
            data: this.getGeojson(this.props.mapbox.rooms.data),
            paint: this.getPaintByLayer('rooms_outline'),
            source: 'rooms_source',
          });
        }
      } else {
        this._map.getMap().getSource('rooms_source').setData(this.getGeojson(_.map(this.props.mapbox.rooms.data, (element) => {
            element.status = element.numb === null ? "false" : "true";
            return element;
          })));
      }
      this.props.addRoomsToMap();
    }

    //ENTERS
    if(this.props.apollo.enters.isFinished && !this.props.apollo.enters.isOnMap && this._map.getMap().getLayer('rooms')){
      if(!this._map.getMap().getSource('enters_source')){

        this.addPointIcon(stairsImg, 'stairs');
        this.addPointIcon(wcImg, 'wc');

        this.addLayer({
          id: 'enters',
          data: this.getGeojson(_.map(this.props.mapbox.enters.data, (element) => {
            element.image = this.getImageName(element.numb);
            return element;
          })),
          paint: this.getPaintByLayer('enters'),
          layout: {
              "text-size": 12,
              'icon-image': ["get", "image"],
              "text-field": [
                "match",
                ["get", "image"],
                ["none"],
                ["get", "numb"],
                ""
              ],
              "icon-size": 0.7,
              "text-offset": [0, 0.75],
            },
          type: "symbol",
        });
      } else {
        this._map.getMap().getSource('enters_source').setData(this.getGeojson(_.map(this.props.mapbox.enters.data, (element) => {
          element.image = this.getImageName(element.numb);
          return element;
        })));
      }
      this.props.addEntersToMap();
    }

    //ROUTE
    if(this.props.apollo.route.isFinished && !this.props.apollo.route.isOnMap){
      if(!this._map.getMap().getSource('route_source')){

        this.addLayer({
          id: 'route',
          data: this.getRouteGeojson(this.props.mapbox.route.data),
          paint: this.getPaintByLayer('route'),
          type: "line",
        });
        this.setRouteFilters(this.props.mapbox.builds.buildToView, this.props.currentFloor);
      } else {
        this._map.getMap().getSource('route_source').setData(this.getRouteGeojson(this.props.mapbox.route.data));
      }

      const currentRoute = this.props.mapbox.route.data[this.props.mapbox.route.stepToView];

      if(currentRoute !== undefined){
        const turf_bbox = turf.bbox(currentRoute.route.geometry);
        const newCameraTransform = this._map.getMap().cameraForBounds([[turf_bbox[0],turf_bbox[1]],[turf_bbox[2],turf_bbox[3]]], {
          padding: {top: 15, bottom:150, left: 15, right: 15}
        });

        this.props.mapboxViewportChange({
          zoom: newCameraTransform.zoom > 18.5 ? 18.5 : newCameraTransform.zoom - 1,
          longitude: newCameraTransform.center.lng,
          latitude: newCameraTransform.center.lat,
          bearing: newCameraTransform.bearing,
        });
      }

      this.props.addRouteToMap();
    }

    //SET FILTERS
    if(this.props.mapbox.isFiltersChanged){
      this.setBuildFilters(this.props.mapbox.builds.buildToView);

      this.setFiltersByFloor(this.props.currentFloor);

      this.setCurrentRoomFilters(this.props.mapbox.builds.buildToView, this.props.currentFloor);

      this.setRouteFilters(this.props.mapbox.builds.buildToView, this.props.currentFloor);

      if(this.props.apollo.floors.isOnMap && this.props.apollo.rooms.isOnMap && this.props.apollo.enters.isOnMap){
        this.props.filtersChanged();
      }
    }

    return (
      <ReactMapGL
        ref={ map => this._map = map }
        mapboxApiAccessToken = { this.props.mapboxApiAccessToken }
        { ...this.props.viewport }
        onViewportChange={ (viewport) => this.updateViewport(viewport) }
        onLoad={ () => this.mapboxReady() }
        onClick={event => this._onClick(event)}
      >
        <div class="navControl">
          <NavigationControl />
        </div>
      </ReactMapGL>
    );
  }
}

const mapStateToProps = state => {
  return {
  	viewport: state.mapbox.viewport,
    currentFloor: state.mapbox.floors.floorToView,
    isMapboxReady: state.mapbox.isMapboxReady,
    mapbox: state.mapbox,
    isApolloStarted: state.apollo.isApolloStarted,
    apollo: state.apollo,
  };
};

export default connect(
  mapStateToProps,
  {
    mapboxViewportChange,
    mapboxReady,
    showInfoblock,
    fetchBuilds,
    fetchFloorsByBuildId,
    fetchRoomsByBuildId,
    fetchRouteByEnterId,
    closeBuildLayers,
    fetchEntersByBuildId,
    addBuildsToMap,
    addFloorsToMap,
    addRoomsToMap,
    addEntersToMap,
    addRouteToMap,
    filtersChanged,
    fetchRoomById,
    showModal,
    setBuildToView,
    addCurrentRoomToMap,
  },
)(MapBox);