import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { Header } from '../../Header';
import { insertTeamRequest } from '../../../actions/teams';
import { showLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';

import avatar1 from '../../../images/team_01.jpg';
import avatar2 from '../../../images/team_02.jpg';
import avatar3 from '../../../images/team_03.jpg';
import avatar4 from '../../../images/team_04.jpg';
import avatar5 from '../../../images/team_05.jpg';

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

const defaultAvatars = [
    {
        name: 'team_01.jpg',
        file: avatar1
    },
    {
        name: 'team_02.jpg',
        file: avatar2
    },
    {
        name: 'team_03.jpg',
        file: avatar3
    },
    {
        name: 'team_04.jpg',
        file: avatar4
    },
    {
        name: 'team_05.jpg',
        file: avatar5
    }
];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export class AddTeamForm extends Component {
    constructor(props) {
        super(props);
        const defaultAvatar = defaultAvatars[getRandomInt(5)];
        this.state = {
            name: '',
            file: null,
            filePreview: '',
            defaultAvatar,
            default_avatar: defaultAvatar.name
        };
    }

    insertTeam = () => {
        if (this.state.name === '') {
            this.props.showAlert('All fields are required.');
        } else {
            this.props.showLoader();
            this.props.insertTeamRequest(this.state);
        }
    };

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleFileChange = event => {
        const file = event.target.files[0];
        const extension = file.name
            .substr(file.name.lastIndexOf('\\') + 1)
            .split('.')[1];
        if (!imageExtensions.includes(extension)) {
            this.props.showAlert('Invalid image format.');
        } else {
            this.setState({
                file,
                filePreview: URL.createObjectURL(file)
            });
        }
    };

    render() {
        return (
            <div>
                <Header
                    leftButton={<Link to="/teams">Cancel</Link>}
                    rightButton={
                        <button type="button" onClick={this.insertTeam}>
                            Create
                        </button>
                    }
                />
                <div className="team-form">
                    <form action="">
                        <div className="left-side">
                            <div className="avatar">
                                <img
                                    src={
                                        this.state.filePreview
                                            ? this.state.filePreview
                                            : this.state.defaultAvatar.file
                                    }
                                    alt="avatar"
                                />
                            </div>
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
                                <label
                                    htmlFor="name"
                                    className="form-label required"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    id="name"
                                    name="name"
                                    autoComplete="off"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    insertTeamRequest: team => dispatch(insertTeamRequest(team)),
    showLoader: () => dispatch(showLoader()),
    showAlert: message => dispatch(showAlert(message))
});

export default connect(
    undefined,
    mapDispatchToProps
)(AddTeamForm);
