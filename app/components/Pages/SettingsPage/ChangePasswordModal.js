import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import { changePasswordRequest } from '../../../actions/auth';

export class ChangePasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            old_password: '',
            new_password: '',
            confirm_new_password: ''
        };
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleChangePassword = () => {
        if (
            this.state.old_password === '' ||
            this.state.new_password === '' ||
            this.state.confirm_new_password === ''
        ) {
            this.props.showAlert('All fields are required.');
        } else if (
            this.state.new_password !== this.state.confirm_new_password
        ) {
            this.props.showAlert('Passwords must match.');
        } else {
            this.props.showLoader();
            this.props.changePasswordRequest(
                this.state.old_password,
                this.state.new_password
            );
        }
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
                        <span>Change Password</span>
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
                            <div className="input-row">
                                <label htmlFor="old_password">
                                    Old Password
                                </label>
                                <input
                                    type="password"
                                    id="old_password"
                                    name="old_password"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="input-row">
                                <label htmlFor="new_password">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="new_password"
                                    name="new_password"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="input-row">
                                <label htmlFor="confirm_new_password">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirm_new_password"
                                    name="confirm_new_password"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer two-buttons">
                        <button
                            type="button"
                            onClick={this.handleChangePassword}
                            className="button"
                        >
                            Change Password
                        </button>
                        <button
                            type="button"
                            onClick={this.props.closeModal}
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    showAlert: message => dispatch(showAlert(message)),
    changePasswordRequest: (oldPassword, newPassword) =>
        dispatch(changePasswordRequest(oldPassword, newPassword))
});

export default connect(
    undefined,
    mapDispatchToProps
)(ChangePasswordModal);
