import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import { updateAvatarRequest } from '../../../actions/auth';
import defaultAvatar from '../../../images/default_avatar.png';

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class ChangeAvatarModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            filePreview: ''
        };
    }

    updateAvatar = () => {
        if (this.state.file === null) {
            this.props.showAlert('Avatar file is required.');
        } else {
            this.props.showLoader();
            this.props.updateAvatarRequest(this.state);
        }
    };

    handleFileChange = event => {
        const file = event.target.files[0];
        const extension = file.name
            .substr(file.name.lastIndexOf('\\') + 1)
            .split('.')[1];
        if (!imageExtensions.includes(extension)) {
            this.props.showAlert(
                'There was a problem with your image format. For best results use a square .jpg or .png image file.'
            );
        } else {
            this.setState({
                file,
                filePreview: URL.createObjectURL(file)
            });
        }
    };

    render() {
        const imageSource = this.state.filePreview
            ? this.state.filePreview
            : this.props.avatar
            ? `${s3URL}${this.props.avatar}`
            : defaultAvatar;
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                className="modal"
                overlayClassName="overlay"
                ariaHideApp={false}
            >
                <div className="modal-wrapper">
                    <div className="modal-header">
                        <span>Change Avatar</span>
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
                                <div
                                    className="avatar"
                                    style={{
                                        backgroundImage: `url('${imageSource}')`
                                    }}
                                />
                            </div>
                            <div className="input-row">
                                <label htmlFor="avatar">Avatar:</label>
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    onChange={this.handleFileChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer two-buttons">
                        <button
                            type="button"
                            onClick={this.updateAvatar}
                            className="button"
                        >
                            Save
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

const mapStateToProps = state => ({
    avatar: state.auth.avatar
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    showAlert: message => dispatch(showAlert(message)),
    updateAvatarRequest: school => dispatch(updateAvatarRequest(school))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAvatarModal);
