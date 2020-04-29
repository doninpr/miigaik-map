import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import { Row, Col } from 'react-bootstrap';
import { showModal } from '../../redux/actions';
import searchImg from './images/search.png';
import infoImg from './images/info.png';
import ModalSearchContent from '../Modals/ModalContents/Search/Search';
import ModalInfoContent from '../Modals/ModalContents/Info/Info';
import "./styles.css";

class BottomBar extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div id="bottomBar">
        <div className="bottom-bar_inner">
          <Row>
            <Col>
              <a className="bottom-bar_button" onClick={() => this.props.showModal({ header: "Поиск", content: ModalSearchContent })}>
                <div>
                  <img src={searchImg} />
                </div>
                <p>
                  Поиск
                </p>
              </a>
            </Col>
            <Col>
            
            </Col>
            <Col>
            
            </Col>
            <Col>
              <a className="bottom-bar_button" onClick={() => this.props.showModal({ header: "О проекте", content: ModalInfoContent })}>
                <div>
                  <img src={infoImg} />
                </div>
                <p>
                  Info
                </p>
              </a>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(
  mapStateToProps,
  { showModal },
)(BottomBar);