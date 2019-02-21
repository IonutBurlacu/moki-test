import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Link from 'react-router-dom/Link';
import { Calendar } from 'react-date-range';
import moment from 'moment';
import AutoSuggestInput from '../../AutoSuggestInput';
import AutoSuggestTags from '../../AutoSuggestTags';
import { Header } from '../../Header';
import {
    updatePlayerRequest,
    deletePlayerRequest
} from '../../../actions/players';
import { showLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import defaultAvatar from '../../../images/default_avatar.png';

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class EditPlayerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.player,
            birthday: moment(props.player.birthday),
            file: null,
            filePreview: '',
            calendar_show: false
        };
    }

    editPlayer = () => {
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
            this.props.updatePlayerRequest(this.state, this.props.id);
        }
    };

    toggleCalendar = () => {
        this.setState({ calendar_show: !this.state.calendar_show });
    };

    handleInputChange = event => {
        if (event.target.type === 'checkbox') {
            this.setState({ [event.target.name]: event.target.checked });
        } else {
            this.setState({ [event.target.name]: event.target.value });
        }
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
        this.setState({ birthday: date, calendar_show: false });
    };

    handleSuggestionInputChange = ({ name, id, value }) => {
        this.setState({
            [`${name}_id`]: id,
            [name]: value
        });
    };

    handleSuggestionTagsChange = tags => {
        this.setState({
            tags
        });
    };

    handleDelete = () => {
        this.props.showLoader();
        this.props.deletePlayerRequest(this.props.id);
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
        const tags = this.props.tags.map(item => ({
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
                        <button type="button" onClick={this.editPlayer}>
                            Save
                        </button>
                    }
                />
                <div className="player-form">
                    <form action="">
                        <div className="top-side">
                            <div className="left-side">
                                <img
                                    src={
                                        this.state.filePreview
                                            ? this.state.filePreview
                                            : this.state.avatar
                                                ? `${s3URL}${this.state.avatar}`
                                                : defaultAvatar
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
                                        value={this.state.first_name}
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
                                        value={this.state.last_name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="teamId"
                                        className="form-label required"
                                    >
                                        Class
                                    </label>
                                    <AutoSuggestInput
                                        className="autosuggest"
                                        handleChange={
                                            this.handleSuggestionInputChange
                                        }
                                        items={grades}
                                        name="grade"
                                        defaultValue={this.state.grade_id}
                                        defaultLabel={this.state.grade}
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
                                    <AutoSuggestInput
                                        className="autosuggest"
                                        handleChange={
                                            this.handleSuggestionInputChange
                                        }
                                        items={years}
                                        name="year"
                                        defaultValue={this.state.year_id}
                                        defaultLabel={this.state.year}
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
                                        value={genderOptions.find(
                                            gender =>
                                                gender.value ===
                                                this.state.gender
                                        )}
                                        isClearable={false}
                                        isSearchable={false}
                                        options={genderOptions}
                                        className="form-input-select"
                                        classNamePrefix="form-select"
                                        onChange={val => {
                                            this.handleInputChange({
                                                target: {
                                                    name: 'gender',
                                                    value: val.value
                                                }
                                            });
                                        }}
                                        name="gender"
                                    />
                                </div>
                                <div className="form-group datepicker-form-group">
                                    <label
                                        htmlFor="birthday"
                                        className="form-label required"
                                    >
                                        D.O.B.
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        id="firstName"
                                        name="first_name"
                                        autoComplete="off"
                                        readOnly="true"
                                        onClick={this.toggleCalendar}
                                        value={moment(
                                            this.state.birthday
                                        ).format('YYYY-MM-DD')}
                                    />
                                    {this.state.calendar_show ? (
                                        <Calendar
                                            onChange={this.onDateChange}
                                            className="date-range-picker player-date-picker"
                                            direction="horizontal"
                                            showDateDisplay={false}
                                            rangeColors={['#66667b']}
                                            date={this.state.birthday}
                                            maxDate={new Date()}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="bottom-side">
                            <div className="form-group form-group-checkbox">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    id="free_school_meals"
                                    name="free_school_meals"
                                    checked={this.state.free_school_meals}
                                    onChange={this.handleInputChange}
                                />
                                <label
                                    className="form-label form-label-checkbox"
                                    htmlFor="free_school_meals"
                                >
                                    Free School Meals
                                </label>
                            </div>
                            <div className="form-group form-group-checkbox">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    id="pupil_premium"
                                    name="pupil_premium"
                                    checked={this.state.pupil_premium}
                                    onChange={this.handleInputChange}
                                />
                                <label
                                    className="form-label form-label-checkbox"
                                    htmlFor="pupil_premium"
                                >
                                    Pupil Premium
                                </label>
                            </div>
                            <div className="form-group form-group-checkbox">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    id="sen"
                                    name="sen"
                                    checked={this.state.sen}
                                    onChange={this.handleInputChange}
                                />
                                <label
                                    className="form-label form-label-checkbox"
                                    htmlFor="sen"
                                >
                                    SEN
                                </label>
                            </div>
                            <div className="form-group tags-form-group">
                                <AutoSuggestTags
                                    className="autosuggest-tags"
                                    handleChange={
                                        this.handleSuggestionTagsChange
                                    }
                                    items={tags}
                                    tags={this.state.tags}
                                    name="tag"
                                />
                            </div>
                        </div>
                    </form>
                    <button
                        type="button"
                        className="delete-button"
                        onClick={() => this.handleDelete()}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    player: state.players.player,
    grades: state.players.grades,
    years: state.players.years,
    tags: state.players.tags
});

const mapDispatchToProps = dispatch => ({
    updatePlayerRequest: (player, id) =>
        dispatch(updatePlayerRequest(player, id)),
    deletePlayerRequest: id => dispatch(deletePlayerRequest(id)),
    showLoader: () => dispatch(showLoader()),
    showAlert: message => dispatch(showAlert(message))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPlayerForm);
