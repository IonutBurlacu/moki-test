import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { ReactDatez } from 'react-datez';
import moment from 'moment';
import AutoSuggest from '../../Autosuggest';
import { Header } from '../../Header';
import { insertPlayerRequest } from '../../../actions/players';
import { showLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';

import avatar1 from '../../../images/player_01.jpg';
import avatar2 from '../../../images/player_02.jpg';
import avatar3 from '../../../images/player_03.jpg';
import avatar4 from '../../../images/player_04.jpg';
import avatar5 from '../../../images/player_05.jpg';

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

const defaultAvatars = [
    {
        name: 'player_01.jpg',
        file: avatar1
    },
    {
        name: 'player_02.jpg',
        file: avatar2
    },
    {
        name: 'player_03.jpg',
        file: avatar3
    },
    {
        name: 'player_04.jpg',
        file: avatar4
    },
    {
        name: 'player_05.jpg',
        file: avatar5
    }
];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export class AddPlayerForm extends Component {
    constructor(props) {
        super(props);
        const defaultAvatar = defaultAvatars[getRandomInt(5)];
        this.state = {
            first_name: '',
            last_name: '',
            grade_id: '',
            year_id: '',
            gender: 'male',
            birthday: moment().format('YYYY-MM-DD'),
            grade: '',
            year: '',
            file: null,
            filePreview: '',
            defaultAvatar,
            default_avatar: defaultAvatar.name
        };
    }

    addPlayer = () => {
        if (
            this.state.first_name === '' ||
            this.state.last_name === '' ||
            this.state.grade === '' ||
            this.state.year === '' ||
            this.state.birthday === ''
        ) {
            this.props.showAlert('All fields are required.');
        } else {
            this.props.showLoader();
            this.props.insertPlayerRequest(this.state);
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

    onDateChange = date => {
        this.setState({ birthday: moment(date).format('YYYY-MM-DD') });
    };

    handleSuggestionInputChange = ({ name, id, value }) => {
        this.setState({
            [`${name}_id`]: id,
            [name]: value
        });
    };

    render() {
        const grades = this.props.grades.map(item => ({
            value: item.id,
            label: item.name
        }));
        const years = this.props.years.map(item => ({
            value: item.id,
            label: item.name
        }));
        const genderOptions = [
            { value: 'male', label: 'Boy' },
            { value: 'female', label: 'Girl' }
        ];
        return (
            <div>
                <Header
                    leftButton={<Link to="/players">Cancel</Link>}
                    rightButton={
                        <button onClick={this.addPlayer}>Create</button>
                    }
                />
                <div className="player-form">
                    <form action="">
                        <div className="left-side">
                            <img
                                src={
                                    this.state.filePreview
                                        ? this.state.filePreview
                                        : this.state.defaultAvatar.file
                                }
                                className="avatar"
                                alt="avatar"
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
                        <div className="center-side">
                            <div className="form-group">
                                <label
                                    htmlFor="firstName"
                                    className="form-label required"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    id="firstName"
                                    name="first_name"
                                    autoComplete="off"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="lastName"
                                    className="form-label required"
                                >
                                    Surname
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    id="lastName"
                                    name="last_name"
                                    autoComplete="off"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="teamId"
                                    className="form-label required"
                                >
                                    Class
                                </label>
                                <AutoSuggest
                                    className="autosuggest"
                                    handleChange={
                                        this.handleSuggestionInputChange
                                    }
                                    items={grades}
                                    name="grade"
                                />
                            </div>
                        </div>
                        <div className="right-side">
                            <div className="form-group">
                                <label
                                    htmlFor="year"
                                    className="form-label required"
                                >
                                    Year
                                </label>
                                <AutoSuggest
                                    className="autosuggest"
                                    handleChange={
                                        this.handleSuggestionInputChange
                                    }
                                    items={years}
                                    name="year"
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="teamId"
                                    className="form-label required"
                                >
                                    Gender
                                </label>
                                <Select
                                    defaultValue={genderOptions[0]}
                                    isClearable={false}
                                    isSearchable={false}
                                    options={genderOptions}
                                    className="form-input-select"
                                    classNamePrefix="form-select"
                                    name="gender"
                                    onChange={val => {
                                        this.handleInputChange({
                                            target: {
                                                name: 'gender',
                                                value: val.value
                                            }
                                        });
                                    }}
                                />
                            </div>
                            <div className="form-group datepicker-form-group">
                                <label
                                    htmlFor="birthday"
                                    className="form-label required"
                                >
                                    D.O.B.
                                </label>
                                <ReactDatez
                                    handleChange={this.onDateChange}
                                    value={this.state.birthday}
                                    allowPast
                                    className="datepicker"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    grades: state.players.grades,
    years: state.players.years
});

const mapDispatchToProps = dispatch => ({
    insertPlayerRequest: player => dispatch(insertPlayerRequest(player)),
    showLoader: () => dispatch(showLoader()),
    showAlert: message => dispatch(showAlert(message))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPlayerForm);
