import React from 'react';
import moment from 'moment';
import ChallengesListModal from './ChallengesListModal';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import { detachPlayerFromChallengeRequest } from '../../../actions/players';

export class ChallengesList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalIsOpen: false
		};
	}

	openModal = () => {
		this.setState({ modalIsOpen: true });
	};

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	};

	detachFromChallenge = challengeId => {
		this.props.showLoader();
		this.props.detachPlayerFromChallengeRequest(challengeId, this.props.id);
	};

	render() {
		return (
			<div className="table-wrapper">
				<div className="table-header">
					<img
						src="/images/challenges_list_icon.png"
						className="table-header-icon"
					/>
					<h3 className="table-header-title">Challenges</h3>
					<button className="add-button" onClick={this.openModal}>
						Add
					</button>
				</div>
				<table className="table">
					<tbody>
						{this.props.items.map(item => {
							return (
								<tr key={item.id}>
									<td style={{ width: '11vmin' }}>
										<img
											src="/images/default_avatar.png"
											className="avatar"
										/>
									</td>
									<td>
										<h1 className="title">{item.name}</h1>
										<span className="subtitle">
											Last Sync:{' '}
											{item.last_sync_at === null
												? 'Never'
												: moment(
														item.last_sync_at
												  ).format(
														'DD/MM/YYYY \\at HH.mma'
												  )}
										</span>
									</td>
									<td className="align-right">
										<button
											className="green-button"
											onClick={() =>
												this.detachFromChallenge(
													item.id
												)
											}
										>
											Remove
										</button>
									</td>
								</tr>
							);
						})}
						{this.props.items.length === 0 ? (
							<tr className="no-items-row">
								<td>
									<span>
										Player isn't part of any challenge yet.
									</span>
								</td>
							</tr>
						) : (
							<tr />
						)}
					</tbody>
				</table>
				<ChallengesListModal
					modalIsOpen={this.state.modalIsOpen}
					closeModal={this.closeModal}
					challenges={this.props.challenges}
					id={this.props.id}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	detachPlayerFromChallengeRequest: (challengeId, playerId) =>
		dispatch(detachPlayerFromChallengeRequest(challengeId, playerId)),
	showLoader: () => dispatch(showLoader())
});

export default connect(
	undefined,
	mapDispatchToProps
)(ChallengesList);
