import React from 'react';
import { connect } from 'react-redux';
import Footer from '../Footer';
import { Header } from '../Header';
import Link from 'react-router-dom/Link';
import Loader from '../Loader';
import { editTeamRequest } from '../../actions/teams';
import { showLoader } from '../../actions/loader';
import PageHeader from './TeamPage/PageHeader';

export class TeamPage extends React.Component {
	handleEdit = id => {
		this.props.showLoader();
		this.props.editTeamRequest(id);
		this.props.history.push(`/teams/edit/${id}`);
	};

	render() {
		return (
			<div className="container">
				<Header
					leftButton={<Link to="/bands/pair">Pair Bands</Link>}
					rightButton={
						<button
							onClick={() =>
								this.handleEdit(this.props.match.params.id)
							}
						>
							Edit
						</button>
					}
				/>
				{!this.props.loading ? (
					<div>
						<PageHeader team={this.props.team} />
						<p style={{ color: 'white' }}>Reports not done yet.</p>
					</div>
				) : (
					<div />
				)}

				<Loader />
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	team: state.teams.team,
	loading: state.teams.loading
});

const mapDispatchToProps = dispatch => ({
	editTeamRequest: id => dispatch(editTeamRequest(id)),
	showLoader: () => dispatch(showLoader())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TeamPage);
