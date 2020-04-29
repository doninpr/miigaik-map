import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import { changeCurrentFloor, closeBuildLayers } from '../../redux/actions';
import { Button } from 'react-bootstrap';
import closeImg from '../FloorSwitcher/images/close.png';
import "./styles.css";

class FloorSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }


  floorClick = floor => {
    this.props.changeCurrentFloor(floor);
  };

  render() {
    const floors = _.map(this.props.floorsList, (floor) => {
      return floor.floor;
    }).sort().reverse();

    return (
      <div id="floorSwitcher">
        <div className={"floor-switcher-outer"}>
          <div className={"floor-switcher-inner"}>
            <div className={"floor-buttons"}>
            {
              _.map(floors, (floor, key) => {
                return (
                  <div key={key} className={cx("floor-element", { 'current-floor': (this.props.currentFloor === floor) })} data-floor={floor} onClick={(event) => this.floorClick(+event.target.dataset.floor)}>
                    {floor}
                  </div>
                );
              })
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  	currentFloor: state.mapbox.floors.floorToView,
    floorsList: state.mapbox.floors.data,
  };
};

export default connect(
  mapStateToProps,
  { changeCurrentFloor, closeBuildLayers },
)(FloorSwitcher);