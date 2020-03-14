import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import ChangePasswordModal from './ChangePasswordModal';
import ChangeAvatarModal from './ChangeAvatarModal';
import ConfirmDeleteAccountModal from './ConfirmDeleteAccountModal';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class AccountModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePasswordModalIsOpen: false,
            changeAvatarModalIsOpen: false,
            deleteAccountConfirmModalIsOpen: false
        };
    }

    openChangePasswordModal = () => {
        this.setState({ changePasswordModalIsOpen: true });
    };

    closeChangePasswordModal = () => {
        this.setState({ changePasswordModalIsOpen: false });
    };

    openChangeAvatarModal = () => {
        this.setState({ changeAvatarModalIsOpen: true });
    };

    closeChangeAvatarModal = () => {
        this.setState({ changeAvatarModalIsOpen: false });
    };

    openDeleteAccountConfirmModal = () => {
        this.setState({ deleteAccountConfirmModalIsOpen: true });
    };

    closeDeleteAccountConfirmModal = () => {
        this.setState({ deleteAccountConfirmModalIsOpen: false });
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
                                <span className="label">School:</span>
                                <span className="value">
                                    {this.props.schoolName}
                                </span>
                            </div>
                            <div className="separator" />
                            <div className="account-row">
                                <span className="label">Contact:</span>
                                <span className="value">
                                    {this.props.fullName}
                                </span>
                            </div>
                            <div className="separator" />
                            <div className="account-row">
                                <span className="label">Email:</span>
                                <span className="value">
                                    {this.props.email}
                                </span>
                            </div>
                            <div className="separator" />
                            <div className="account-row">
                                <span className="label">Avatar:</span>
                                <img
                                    src={`${s3URL}${this.props.avatar}`}
                                    alt=""
                                />
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
                            onClick={this.openChangeAvatarModal}
                            className="button"
                        >
                            Change Avatar
                        </button>
                        <button
                            type="button"
                            onClick={this.openDeleteAccountConfirmModal}
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
                <ChangeAvatarModal
                    modalIsOpen={this.state.changeAvatarModalIsOpen}
                    closeModal={this.closeChangeAvatarModal}
                />
                <ConfirmDeleteAccountModal
                    modalIsOpen={this.state.deleteAccountConfirmModalIsOpen}
                    closeModal={this.closeDeleteAccountConfirmModal}
                />
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    email: state.auth.email,
    fullName: state.auth.fullName,
    schoolName: state.auth.schoolName,
    avatar: state.auth.avatar
});

export default connect(mapStateToProps)(AccountModal);
