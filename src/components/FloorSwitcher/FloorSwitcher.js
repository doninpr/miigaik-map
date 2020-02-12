import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import { changeCurrentFloor } from '../../redux/actions';
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

    const floors = [
      2,3,4,5,6
    ];

    return (
      <div id="floorSwitcher">
        <div class="floor-switcher-inner">
          <div class="floor-buttons">
          {
            _.map(floors, (floor) => {
              return (
                <div class={cx("floor-element", { 'current-floor': (this.props.currentFloor === floor) })} data-floor={floor} onClick={(event) => this.floorClick(+event.target.dataset.floor)}>
                  {floor}
                </div>
              );
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  	currentFloor: state.floorSwitcher.currentFloor,
  };
};

export default connect(
  mapStateToProps,
  { changeCurrentFloor },
)(FloorSwitcher);