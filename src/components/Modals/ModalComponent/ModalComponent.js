import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import { Modal, Button } from 'react-bootstrap';
import { hideModal, closeCurrentRoom, closeRouter } from '../../../redux/actions';
import "./styles.css";

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.closeClicked = this.closeClicked.bind(this);
  }

  closeClicked() {
    this.props.hideModal();
    if(this.props.isMapboxObject){
      this.props.closeCurrentRoom();
      this.props.closeRouter();
    }
  }

  render() {
    const ModalContent = this.props.content;
    const params = this.props.params;

    return (
        <Modal
          className={this.props.className ? this.props.className : "modal-full"}
          show={this.props.isShown}
          onHide={this.closeClicked}
          size={this.props.size || "lg"}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.header}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {ModalContent &&
              <ModalContent params={params} />
            }
          </Modal.Body>
        </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    isShown: state.modal.isShown,
    header: state.modal.header,
    isMapboxObject: state.modal.isMapboxObject,
    className: state.modal.className,
    content: state.modal.content,
    size: state.modal.size,
    params: state.modal.params,
  };
};

export default connect(
  mapStateToProps,
  { hideModal, closeCurrentRoom, closeRouter },
)(ModalComponent);