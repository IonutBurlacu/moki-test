import React, {Component} from 'react';
import { connect } from 'react-redux';
import Footer from '../Footer';
import Loader from '../Loader';
import EditPlayerForm from './EditPlayerPage/EditPlayerForm';
import TeamsList from './EditPlayerPage/TeamsList';
import ChallengesList from './EditPlayerPage/ChallengesList';
import Alert from '../Alert';

export class EditPlayerPage extends Component {
	render() {
		return (
			<div className="container">
				<Alert />
				{!this.props.loading ? (
					<div>
						<EditPlayerForm id={this.props.match.params.id} />
						<div className="two-sides">
							<div className="side">
								<TeamsList
									items={this.props.player.teams}
									teams={this.props.teams}
									id={this.props.match.params.id}
								/>
							</div>
							<div className="side">
								<ChallengesList
									items={this.props.player.challenges}
									challenges={this.props.challenges}
									id={this.props.match.params.id}
								/>
							</div>
						</div>
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
	loading: state.players.loading,
	player: state.players.player,
	teams: state.players.teams,
	challenges: state.players.challenges
});

export default connect(mapStateToProps)(EditPlayerPage);
