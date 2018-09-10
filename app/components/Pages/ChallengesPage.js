import React from 'react';
import { connect } from 'react-redux';
import { Footer } from '../Footer';
import { Header } from '../Header';
import Link from 'react-router-dom/Link';
import { PageTitle } from '../PageTitle';
import Loader from '../Loader';
import {
	getChallengesRequest,
	viewChallengeRequest
} from '../../actions/challenges';
import { showLoader } from '../../actions/loader';
import moment from 'moment';

export class ChallengesPage extends React.Component {
	componentWillMount() {
		this.props.showLoader();
		this.props.getChallengesRequest();
	}

	handleView = id => {
		this.props.viewChallengeRequest(id);
		this.props.showLoader();
		this.props.history.push(`/challenges/view/${id}`);
	};

	render() {
		return (
			<div className="container container-with-title">
				<Header
					leftButton={<Link to="/bands/pair">Pair Bands</Link>}
					rightButton={<Link to="/challenges/add">Add</Link>}
				/>
				<PageTitle title="Challenges" />
				<div className="table-wrapper">
					<table className="table">
						<tbody>
							{this.props.challenges.map(challenge => {
								return (
									<tr
										onClick={() =>
											this.handleView(challenge.id)
										}
										key={challenge.id}
									>
										<td style={{ width: '11vmin' }}>
											<img
												src="/images/default_avatar.png"
												className="avatar"
											/>
										</td>
										<td>
											<h1 className="title">
												{challenge.name}
											</h1>
											<span className="subtitle">
												Last Sync:{' '}
												{challenge.last_sync_at === null
													? 'Never'
													: moment(
															challenge.last_sync_at
													  ).format(
															'DD/MM/YYYY \\at HH.mma'
													  )}
											</span>
										</td>
										<td className="align-right">
											{challenge.type === 'player' ? (
												<div>
													<img
														src="/images/players_icon_wide.png"
														className="icon"
													/>
													<span className="icon-label">
														{`${
															challenge.players_count
														} Player`}
														{challenge.players_count >
														1
															? 's'
															: ''}
													</span>
												</div>
											) : (
												<div>
													<img
														src="/images/teams_icon.png"
														className="icon"
													/>
													<span className="icon-label">
														{`${
															challenge.teams_count
														} Team`}
														{challenge.teams_count >
														1
															? 's'
															: ''}
													</span>
												</div>
											)}
										</td>
										<td className="negative align-right">
											<span className="percentage-icon" />
											<span className="percentage">
												18%
											</span>
										</td>
										<td className="align-right">
											<h1 className="title">
												{challenge.target_steps}
												<small>steps</small>
											</h1>
										</td>
									</tr>
								);
							})}
							{this.props.challenges.length === 0 ? (
								<tr className="no-items-row">
									<td>
										<span>
											There are no challenges yet.
										</span>
									</td>
								</tr>
							) : (
								<tr />
							)}
						</tbody>
					</table>
				</div>
				<Loader />
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	challenges: state.challenges.items
});

const mapDispatchToProps = dispatch => ({
	getChallengesRequest: () => dispatch(getChallengesRequest()),
	viewChallengeRequest: id => dispatch(viewChallengeRequest(id)),
	showLoader: () => dispatch(showLoader())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChallengesPage);
