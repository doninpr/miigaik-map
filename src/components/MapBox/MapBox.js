import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapboxViewportChange, mapboxReady, showInfoblock } from '../../redux/actions';
import { floorsGeometry } from '../../datasets/floors';

class MapBox extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this._map = React.createRef();
  }

  updateViewport = viewport => {
  	this.props.mapboxViewportChange(viewport);
    this.setState({viewport});
  };

  _onClick(event) {
    const targetLayer = event.features[0] && event.features[0].source;
    
    if(targetLayer === "floor-data"){
      this.props.showInfoblock(event.features[0].properties.id);
    }
  }

  render() {
    //this._map <= use this to get map object

    const currentFloor = this.props.currentFloor;

    return (
      <ReactMapGL
        ref={ map => this._map = map }
        mapboxApiAccessToken = { this.props.mapboxApiAccessToken }
        { ...this.props.viewport }
        onViewportChange={ (viewport) => this.updateViewport(viewport) }
        onLoad={ () => this.props.mapboxReady() }
        onClick={event => this._onClick(event)}
      >
        <Source id="outer-data" type="geojson" data={floorsGeometry.main[currentFloor].outer}>
          <Layer
            id="outer"
            type="fill"
            paint={
              {
                'fill-color': '#fff',
                'fill-outline-color': "hsl(0, 100%, 100%)",
              }
            }
          />
        </Source>
        <Source id="floor-data" type="geojson" data={floorsGeometry.main[currentFloor].indoor}>
          <Layer
            id="floor"
            type="fill"
            paint={
              {
                'fill-color': '#007cbf',
                'fill-outline-color': "hsl(0, 51%, 40%)",
              }
            }
          />
        </Source>
        <Source id="points-data" type="geojson" data={floorsGeometry.main[currentFloor].points}>
          <Layer
            id="points"
            type="symbol"
            paint={
              {
                "text-color": "#000",
                "text-halo-color": "#fff",
                "text-halo-width": 1
              }
            }
            layout={
              {
                "text-field": [
                    "to-string",
                    ["get", "id"]
                  ],
                "text-size": 10,
              }
            }
          />
        </Source>
      </ReactMapGL>
    );
  }
}

const mapStateToProps = state => {
  return {
  	viewport: state.mapbox.viewport,
    currentFloor: state.floorSwitcher.currentFloor,
  };
};

export default connect(
  mapStateToProps,
  { mapboxViewportChange, mapboxReady, showInfoblock },
)(MapBox);