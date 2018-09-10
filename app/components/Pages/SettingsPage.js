import React from 'react';
import { connect } from 'react-redux';
import { Footer } from '../Footer';
import { Header } from '../Header';
import Link from 'react-router-dom/Link';
import { PageTitle } from '../PageTitle';
import Loader from '../Loader';
import { logout } from '../../actions/auth';

export class SettingsPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hideTotalRecordSteps: false,
			ignoreWeekendData: false
		};
	}

	logout = () => {
		this.props.logout();
		sessionStorage.removeItem('Authorization');
		this.props.history.push('/');
	};

	handleCheckboxChange = event => {
		this.setState({
			[event.target.name]: !this.state[event.target.name]
		});
	};

	render() {
		return (
			<div className="container container-with-title">
				<Header
					leftButton={
						<Link to="/contact-support">Contact Support</Link>
					}
					rightButton={
						<Link to="/contact-support">Contact Support</Link>
					}
				/>
				<PageTitle title="Settings" />
				<div className="table-wrapper">
					<table className="table settings-table">
						<tr>
							<td>
								<span className="setting-label">
									Hide Totals at Record Steps
								</span>
							</td>
							<td className="align-right switch-column">
								<label className="switch">
									<input
										type="checkbox"
										checked={
											this.state.hideTotalRecordSteps
										}
										onChange={this.handleCheckboxChange}
										name="hideTotalRecordSteps"
									/>
									<div className="slider" />
									<span className="label-on">ON</span>
									<span className="label-off">OFF</span>
								</label>
							</td>
						</tr>
						<tr>
							<td>
								<span className="setting-label">
									Ignore Weekend Data
								</span>
							</td>
							<td className="align-right switch-column">
								<label className="switch">
									<input
										type="checkbox"
										checked={this.state.ignoreWeekendData}
										onChange={this.handleCheckboxChange}
										name="ignoreWeekendData"
									/>
									<div className="slider" />
									<span className="label-on">ON</span>
									<span className="label-off">OFF</span>
								</label>
							</td>
						</tr>
						<tr>
							<td colSpan="2">
								<button className="setting-button">
									Read Band Battery Levels
								</button>
							</td>
						</tr>
						<tr>
							<td colSpan="2">
								<button className="setting-button">
									Delete Band Battery Levels
								</button>
							</td>
						</tr>
						<tr>
							<td>
								<span className="setting-label">
									Import Database
								</span>
							</td>
							<td className="align-right">
								<button className="green-button">
									Download Template
								</button>
							</td>
						</tr>
						<tr>
							<td colSpan="2">
								<button className="setting-button">
									Account
								</button>
							</td>
						</tr>
						<tr>
							<td colSpan="2">
								<button
									className="setting-button"
									onClick={this.logout}
								>
									Log Out
								</button>
							</td>
						</tr>
						<tr>
							<td colSpan="2">
								<button className="setting-button">
									Contact Support
								</button>
							</td>
						</tr>
					</table>
				</div>
				<Loader />
				<Footer />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout())
});

export default connect(
	undefined,
	mapDispatchToProps
)(SettingsPage);
