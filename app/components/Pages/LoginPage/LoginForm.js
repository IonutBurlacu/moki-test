import React from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import { loginRequest } from '../../../actions/auth';

export class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = () => {
		this.props.showLoader();
		this.props.loginRequest(this.state.email, this.state.password);
	};

	render() {
		return (
			<div className="login-form">
				<h1 className="login-form__title">
					Please enter details to get started
				</h1>
				<form action="">
					<div className="login-form__separator" />
					<div className="form-group">
						<label htmlFor="email" className="form-label">
							Username
						</label>
						<input
							type="text"
							className="form-input"
							id="email"
							name="email"
							onChange={this.handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-input"
							id="password"
							name="password"
							onChange={this.handleInputChange}
						/>
					</div>
					<div className="login-form__separator" />
					<button
						type="button"
						className="login-form__button"
						onClick={this.handleSubmit}
					>
						Done
					</button>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	showLoader: () => dispatch(showLoader()),
	loginRequest: (email, password) => dispatch(loginRequest(email, password))
});

export default connect(
	undefined,
	mapDispatchToProps
)(LoginForm);
