import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { hideAlert } from '../actions/alert';

export class Alert extends Component {
    render() {
        const { show, message, hideAlert } = this.props;
        return show ? (
            <Modal
                isOpen={show}
                className="modal modal-alert"
                overlayClassName="overlay"
                ariaHideApp={false}
            >
                <div className="modal-wrapper">
                    <div className="modal-header">
                        <span>Alert</span>
                    </div>
                    <div className="modal-body">
                        <p className="message">{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            onClick={hideAlert}
                            className="cancel-button"
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </Modal>
        ) : (
            <span />
        );
    }
}

const mapStateToProps = state => ({
    show: state.alert.show,
    message: state.alert.message
});

const mapDispatchToProps = dispatch => ({
    hideAlert: () => dispatch(hideAlert())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alert);
