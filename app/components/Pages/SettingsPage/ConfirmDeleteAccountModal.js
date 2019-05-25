import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import { deleteAccountRequest } from '../../../actions/auth';

export class ConfirmDeleteAccountModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ''
        };
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleDelete = () => {
        if (this.state.password === '') {
            this.props.showAlert('Please enter a valid password.');
        } else {
            this.props.showLoader();
            this.props.closeModal();
            this.props.deleteAccountRequest(this.state.password);
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
                        <span>Confirm Password</span>
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
                            <p>
                                This will permanently delete your account.
                                Consider exporting your data before doing this.
                            </p>
                            <div className="input-row">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer two-buttons">
                        <button
                            type="button"
                            onClick={this.handleDelete}
                            className="button"
                        >
                            Delete
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
    deleteAccountRequest: password => dispatch(deleteAccountRequest(password))
});

export default connect(
    undefined,
    mapDispatchToProps
)(ConfirmDeleteAccountModal);
