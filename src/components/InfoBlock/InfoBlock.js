import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import { hideInfoblock } from '../../redux/actions';
import "./styles.css";

class FloorSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div>
        {this.props.isShow &&
          <div id="infoblock">
            <div class="close-button" onClick={() => this.props.hideInfoblock()}>x</div>
            <div class="infoblock-inner">
              <div>Заголовок</div>
              <div>Текст с описанием</div>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  	isShow: state.infoBlock.isShow,
  };
};

export default connect(
  mapStateToProps,
  { hideInfoblock },
)(FloorSwitcher);