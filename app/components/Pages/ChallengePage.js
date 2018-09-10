import React from 'react';
import { connect } from 'react-redux';
import { Footer } from '../Footer';
import { Header } from '../Header';
import Link from 'react-router-dom/Link';
import Loader from '../Loader';
import { editChallengeRequest } from '../../actions/challenges';
import { showLoader } from '../../actions/loader';
import PlayersList from './ChallengePage/PlayersList';
import TeamsList from './ChallengePage/TeamsList';
import PageHeader from './ChallengePage/PageHeader';

export class ChallengePage extends React.Component {
	handleEdit = id => {
		this.props.showLoader();
		this.props.editChallengeRequest(id);
		this.props.history.push(`/challenges/edit/${id}`);
	};

	render() {
		return (
			<div className="container">
				<Header
					leftButton={<Link to="/challenges">Back</Link>}
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
						<PageHeader challenge={this.props.challenge} />
						{this.props.challenge.type === 'player' ? (
							<PlayersList items={this.props.challenge.players} />
						) : (
							<TeamsList items={this.props.challenge.teams} />
						)}
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
	challenge: state.challenges.challenge,
	loading: state.challenges.loading
});

const mapDispatchToProps = dispatch => ({
	editChallengeRequest: id => dispatch(editChallengeRequest(id)),
	showLoader: () => dispatch(showLoader())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChallengePage);
