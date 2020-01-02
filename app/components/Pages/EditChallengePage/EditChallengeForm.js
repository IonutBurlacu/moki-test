import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { Header } from '../../Header';
import { updateChallengeRequest } from '../../../actions/challenges';
import { showLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import defaultAvatar from '../../../images/default_avatar.png';

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class EditChallengeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            ...props.challenge,
            file: null,
            filePreview: ''
        };
    }

    updateChallenge = () => {
        if (this.state.name === '' || this.state.target_steps === '') {
            this.props.showAlert('Please complete all the required fields.');
        } else {
            this.props.showLoader();
            this.props.updateChallengeRequest(this.state, this.props.id);
        }
    };

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
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
            : this.state.avatar
            ? `${s3URL}${this.state.avatar}`
            : defaultAvatar;
        return (
            <div>
                <Header
                    leftButton={
                        <Link to={`/challenges/view/${this.props.id}`}>
                            Cancel
                        </Link>
                    }
                    rightButton={
                        <button onClick={this.updateChallenge}>Save</button>
                    }
                />
                <div className="challenge-form">
                    <form action="">
                        <div className="left-side">
                            <div
                                className="avatar"
                                style={{
                                    backgroundImage: `url('${imageSource}')`
                                }}
                            />
                            <label
                                htmlFor="avatar"
                                className="edit-photo-button"
                            >
                                Edit Photo
                            </label>
                            <input
                                type="file"
                                className="edit-photo-input"
                                id="avatar"
                                onChange={this.handleFileChange}
                            />
                        </div>
                        <div className="right-side">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-input"
                                    id="name"
                                    name="name"
                                    autoComplete="off"
                                    onChange={this.handleInputChange}
                                    value={this.state.name}
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="name"
                                    className="form-label required"
                                >
                                    Name
                                </label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    className="form-input"
                                    id="targetSteps"
                                    name="target_steps"
                                    autoComplete="off"
                                    onChange={this.handleInputChange}
                                    value={this.state.target_steps}
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="targetSteps"
                                    className="form-label required"
                                >
                                    Steps
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    challenge: state.challenges.challenge
});

const mapDispatchToProps = dispatch => ({
    updateChallengeRequest: (challenge, id) =>
        dispatch(updateChallengeRequest(challenge, id)),
    deleteChallengeRequest: id => dispatch(deleteChallengeRequest(id)),
    showLoader: () => dispatch(showLoader()),
    showAlert: message => dispatch(showAlert(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditChallengeForm);
