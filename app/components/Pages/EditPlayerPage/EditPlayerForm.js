import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Link from 'react-router-dom/Link';
import { Calendar } from 'react-date-range';
import moment from 'moment';
import AutoSuggestInput from '../../AutoSuggestInput';
import AutoSuggestTags from '../../AutoSuggestTags';
import { Header } from '../../Header';
import { updatePlayerRequest } from '../../../actions/players';
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
            this.state.birthday === ''
        ) {
            this.props.showAlert('Please complete all the required fields.');
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
        const imageSource = this.state.filePreview
            ? this.state.filePreview
            : this.state.avatar
            ? `${s3URL}${this.state.avatar}`
            : defaultAvatar;
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
                            <div className="center-side">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-input"
                                        id="firstName"
                                        name="first_name"
                                        autoComplete="off"
                                        onChange={this.handleInputChange}
                                        value={this.state.first_name}
                                    />
                                    <label
                                        htmlFor="firstName"
                                        className="form-label required"
                                    >
                                        First Name
                                    </label>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-input"
                                        id="lastName"
                                        name="last_name"
                                        autoComplete="off"
                                        onChange={this.handleInputChange}
                                        value={this.state.last_name}
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="lastName"
                                        className="form-label"
                                    >
                                        Surname
                                    </label>
                                </div>
                                <div className="form-group">
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
                                    <label
                                        htmlFor="teamId"
                                        className="form-label form-label-filled required"
                                    >
                                        Gender
                                    </label>
                                </div>
                            </div>
                            <div className="right-side">
                                <div className="form-group datepicker-form-group">
                                    <input
                                        type="text"
                                        className="form-input"
                                        id="firstName"
                                        name="first_name"
                                        autoComplete="off"
                                        readOnly
                                        onClick={this.toggleCalendar}
                                        value={moment(
                                            this.state.birthday
                                        ).format('YYYY-MM-DD')}
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="birthday"
                                        className="form-label required"
                                    >
                                        D.O.B.
                                    </label>
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
                                <div className="form-group">
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
                                    <label
                                        htmlFor="year"
                                        className="form-label"
                                        style={{
                                            color:
                                                this.state.year !== ''
                                                    ? '#74ef5c'
                                                    : '#bfc0c5'
                                        }}
                                    >
                                        Year
                                    </label>
                                </div>
                                <div className="form-group">
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
                                    <label
                                        htmlFor="teamId"
                                        className="form-label"
                                        style={{
                                            color:
                                                this.state.grade !== ''
                                                    ? '#74ef5c'
                                                    : '#bfc0c5'
                                        }}
                                    >
                                        Class
                                    </label>
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
                                    placeholder=" "
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
                        <div className="required-label-wrapper">
                            <span className="required-label">
                                * These fields are required
                            </span>
                        </div>
                    </form>
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
    showLoader: () => dispatch(showLoader()),
    showAlert: message => dispatch(showAlert(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlayerForm);
