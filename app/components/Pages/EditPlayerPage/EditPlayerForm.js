import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import AutoSuggest from '../../Autosuggest';
import { Header } from '../../Header';
import Link from 'react-router-dom/Link';
import { updatePlayerRequest } from '../../../actions/players';
import { showLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import { ReactDatez } from 'react-datez';
import moment from 'moment';

export class EditPlayerForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...props.player
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

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	onDateChange = date => {
		this.setState({ birthday: moment(date).format('YYYY-MM-DD') });
	};

	handleSuggestionInputChange = ({ name, id, value }) => {
		this.setState({
			[name + '_id']: id,
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
						<button onClick={this.editPlayer}>Save</button>
					}
				/>
				<div className="player-form">
					<form action="">
						<div className="left-side">
							<img
								src="/images/default_avatar.png"
								className="avatar"
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
								<AutoSuggest
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
								<AutoSuggest
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
											gender.value === this.state.gender
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
							<div className="form-group">
								<label
									htmlFor="birthday"
									className="form-label required"
								>
									D.O.B.
								</label>
								<ReactDatez
									handleChange={this.onDateChange}
									value={this.state.birthday}
									allowPast={true}
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
	player: state.players.player,
	grades: state.players.grades,
	years: state.players.years
});

const mapDispatchToProps = dispatch => ({
	updatePlayerRequest: (player, id) =>
		dispatch(updatePlayerRequest(player, id)),
	showLoader: () => dispatch(showLoader()),
	showAlert: message => dispatch(showAlert(message))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPlayerForm);
