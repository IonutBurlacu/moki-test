import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { hideConfirm } from '../actions/confirm';

export class Confirm extends Component {
    render() {
        const { show, message, hideConfirm, doConfirm } = this.props;
        return show ? (
            <Modal
                isOpen={show}
                className="modal modal-confirm"
                overlayClassName="overlay"
                ariaHideApp={false}
            >
                <div className="modal-wrapper">
                    <div className="modal-header">
                        <span>Confirm</span>
                    </div>
                    <div className="modal-body">
                        <p className="message">{message}</p>
                    </div>
                    <div className="modal-footer two-buttons">
                        <button
                            type="button"
                            onClick={doConfirm}
                            className="cancel-button"
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={hideConfirm}
                            className="no-button"
                        >
                            No
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
    show: state.confirm.show,
    message: state.confirm.message,
    doConfirm: state.confirm.doConfirm
});

const mapDispatchToProps = dispatch => ({
    hideConfirm: () => dispatch(hideConfirm())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Confirm);
