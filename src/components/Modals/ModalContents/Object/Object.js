import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import { Row, Col, Button } from 'react-bootstrap';
import ModalWayRouterContent from '../WayRouter/WayRouter';
import { fetchRouteByEnterId, showModal } from '../../../../redux/actions';
import "./styles.css";

class ObjectRoom extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    // onClick={() => this.props.showModal({ header: "Как пройти: Ауд. 301", content: ModalWayRouterContent, className: "modal-small" })}
    // onClick={() => this.props.action(this.props.currentRoom.id)}

    let currentBuild = { name: "" };

    if(this.props.currentRoom !== null){
      currentBuild = _.find(this.props.allBuilds, (o) => {
        return o.id === this.props.currentRoom.build_id;
      });
    }

    return (
      <div>
        <Row>
          <Col className="object-build">
            {currentBuild.name}
          </Col>
          <Col className="object-floor">
            {this.props.currentRoom !== null && this.props.currentRoom.floor} этаж
          </Col>
        </Row>
        <Row className="object_buttons-wrap">
          <Col>
            <Button variant="primary" onClick={() => {
              this.props.fetchRouteByEnterId(this.props.currentRoom.enter_id);
              this.props.showModal({ header: "Как пройти: Ауд. " + this.props.currentRoom.numb, content: ModalWayRouterContent, className: "modal-small", isMapboxObject: true });
            }
            }>Как пройти?</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isMapboxReady: state.mapbox.isMapboxReady,
    currentRoom: state.mapbox.currentRoom.data,
    allBuilds: state.mapbox.builds.data,
  };
};

export default connect(
  mapStateToProps,
  { fetchRouteByEnterId, showModal },
)(ObjectRoom);