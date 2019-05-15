import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { Header } from '../../Header';
import { insertChallengeRequest } from '../../../actions/challenges';
import { showLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import TeamsList from './TeamsList';
import PlayersList from './PlayersList';

import avatar1 from '../../../images/challenge_01.jpg';
import avatar2 from '../../../images/challenge_02.jpg';
import avatar3 from '../../../images/challenge_03.jpg';
import avatar4 from '../../../images/challenge_04.jpg';
import avatar5 from '../../../images/challenge_05.jpg';

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

const defaultAvatars = [
    {
        name: 'challenge_01.jpg',
        file: avatar1
    },
    {
        name: 'challenge_02.jpg',
        file: avatar2
    },
    {
        name: 'challenge_03.jpg',
        file: avatar3
    },
    {
        name: 'challenge_04.jpg',
        file: avatar4
    },
    {
        name: 'challenge_05.jpg',
        file: avatar5
    }
];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export class AddChallengeForm extends Component {
    constructor(props) {
        super(props);
        const defaultAvatar = defaultAvatars[getRandomInt(5)];
        this.state = {
            name: '',
            type: 'player',
            target_steps: '',
            file: null,
            filePreview: '',
            defaultAvatar,
            default_avatar: defaultAvatar.name
        };
    }

    insertChallenge = () => {
        if (this.state.name === '' || this.state.target_steps === '') {
            this.props.showAlert('All fields are required.');
        } else {
            this.props.showLoader();
            this.props.insertChallengeRequest({
                ...this.state,
                players: this.props.new.players,
                teams: this.props.new.teams
            });
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
        const options = [
            { value: 'player', label: 'Player' },
            { value: 'team', label: 'Team' }
        ];
        return (
            <div>
                <Header
                    leftButton={<Link to="/challenges">Cancel</Link>}
                    rightButton={
                        <button type="button" onClick={this.insertChallenge}>
                            Create
                        </button>
                    }
                />
                <div className="challenge-form">
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
                            <div className="form-group">
                                <label htmlFor="Type" className="form-label">
                                    Type
                                </label>
                                <Select
                                    defaultValue={options[0]}
                                    isClearable={false}
                                    isSearchable={false}
                                    options={options}
                                    className="form-input-select"
                                    classNamePrefix="form-select"
                                    onChange={val => {
                                        this.handleInputChange({
                                            target: {
                                                name: 'type',
                                                value: val.value
                                            }
                                        });
                                    }}
                                    name="type"
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="targetSteps"
                                    className="form-label required"
                                >
                                    Steps
                                </label>
                                <input
                                    type="number"
                                    className="form-input"
                                    id="targetSteps"
                                    name="target_steps"
                                    autoComplete="off"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                {this.state.type === 'player' ? (
                    <PlayersList
                        items={this.props.new.players}
                        players={this.props.players}
                    />
                ) : (
                    <TeamsList
                        items={this.props.new.teams}
                        teams={this.props.teams}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    players: state.challenges.players,
    teams: state.challenges.teams,
    new: state.challenges.new
});

const mapDispatchToProps = dispatch => ({
    insertChallengeRequest: challenge =>
        dispatch(insertChallengeRequest(challenge)),
    showLoader: () => dispatch(showLoader()),
    showAlert: message => dispatch(showAlert(message))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddChallengeForm);
