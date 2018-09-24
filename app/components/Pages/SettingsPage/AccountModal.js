import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import { deleteAccountRequest } from '../../../actions/auth';
import ChangePasswordModal from './ChangePasswordModal';

export class AccountModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePasswordModalIsOpen: false
        };
    }

    openChangePasswordModal = () => {
        this.setState({ changePasswordModalIsOpen: true });
    };

    closeChangePasswordModal = () => {
        this.setState({ changePasswordModalIsOpen: false });
    };

    handleDeleteAccount = () => {
        this.props.closeModal();
        this.props.showLoader();
        this.props.deleteAccountRequest();
    };

    render() {
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                className="modal"
                overlayClassName="overlay"
                ariaHideApp={false}
            >
                <div className="modal-wrapper">
                    <div className="modal-header">
                        <span>Account</span>
                        <button
                            type="button"
                            onClick={this.props.closeModal}
                            className="close-modal-button"
                        >
                            ✖
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-content">
                            <div className="account-row">
                                <span className="label">Admin Name:</span>
                                <span className="value">
                                    {this.props.fullName}
                                </span>
                            </div>
                            <div className="separator" />
                            <div className="account-row">
                                <span className="label">Admin Email:</span>
                                <span className="value">
                                    {this.props.email}
                                </span>
                            </div>
                            <div className="separator" />
                            <div className="account-row">
                                <span className="label">Username:</span>
                                <span className="value">
                                    {this.props.schoolName}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer two-buttons">
                        <button
                            type="button"
                            onClick={this.openChangePasswordModal}
                            className="button"
                        >
                            Change Password
                        </button>
                        <button
                            type="button"
                            onClick={this.handleDeleteAccount}
                            className="cancel-button"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
                <ChangePasswordModal
                    modalIsOpen={this.state.changePasswordModalIsOpen}
                    closeModal={this.closeChangePasswordModal}
                />
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    email: state.auth.email,
    fullName: state.auth.fullName,
    schoolName: state.auth.schoolName
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    deleteAccountRequest: () => dispatch(deleteAccountRequest())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountModal);
