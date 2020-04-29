import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import { Row, Col, Button } from 'react-bootstrap';
import {
    prevRouteStep,
    nextRouteStep
  } from '../../../../redux/actions';
import "./styles.css";

class WayRouter extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {

    const currentRoute = this.props.route.data[this.props.route.stepToView];

    let currentBuild = "";

    if(currentRoute !== undefined){
      currentBuild = _.find(this.props.allBuilds, (o) => {
        return o.id === currentRoute.route.properties.build_id;
      });
    }

    if(currentRoute === undefined){
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <div>
        <Row>
          <Col className="router_build">
            {currentBuild.name}
          </Col>
          <Col className="router_floor">
            {currentRoute.route.properties.floor} этаж
          </Col>
        </Row>
        <Row className="router_buttons-wrap">
          <Col>
            {this.props.route.stepToView !== 0 &&
              <Button variant="primary" onClick={() => this.props.prevRouteStep()}>Назад</Button>
            }
          </Col>
          <Col>
            {(this.props.route.stepToView + 1) !== _.size(this.props.route.data) &&
              <Button variant="primary" onClick={() => this.props.nextRouteStep()}>Далее</Button>
            }
          </Col>
        </Row>
        <Row className="router_caption">
          <Col>
            Маршрут строится от главного входа
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    route: state.mapbox.route,
    allBuilds: state.mapbox.builds.data,
  };
};

export default connect(
  mapStateToProps,
  {
    prevRouteStep,
    nextRouteStep
  },
)(WayRouter);