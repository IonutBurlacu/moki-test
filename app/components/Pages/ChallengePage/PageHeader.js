import React from 'react';
import moment from 'moment';

export default class PageHeader extends React.Component {
	render() {
		return (
			<div className="page-header">
				<div className="col left">
					<div className="left-side">
						<img
							src="/images/default_avatar.png"
							className="avatar"
						/>
					</div>
					<div className="right-side">
						<h3 className="title">{this.props.challenge.name}</h3>
						<span className="subtitle">
							{this.props.challenge.type === 'player'
								? 'Player Challenge'
								: 'Team Challenge'}
						</span>
					</div>
				</div>
				<div className="col">
					<h1 className="steps">
						{this.props.challenge.target_steps}
						<small>steps</small>
					</h1>
				</div>
				<div className="col column right">
					{this.props.challenge.type === 'player' ? (
						<div className="row">
							<img
								src="/images/players_icon_wide.png"
								className="small-icon"
							/>
							<span>
								{`${
									this.props.challenge.players.length
								} Player`}
								{this.props.challenge.players.length > 1
									? 's'
									: ''}
							</span>
						</div>
					) : (
						<div className="row">
							<img
								src="/images/teams_icon.png"
								className="small-icon"
							/>
							<span>
								{`${this.props.challenge.teams.length} Team`}
								{this.props.challenge.teams.length > 1
									? 's'
									: ''}
							</span>
						</div>
					)}
					<div className="row">
						<span>
							Created:{' '}
							{moment(this.props.challenge.created_at).format(
								'DD/MM/YYYY'
							)}
						</span>
					</div>
					<div className="row">
						<span>
							Last Sync:{' '}
							{this.props.challenge.last_sync_at === null
								? 'Never'
								: moment(
										this.props.challenge.last_sync_at
								  ).format('DD/MM/YYYY')}
						</span>
					</div>
				</div>
			</div>
		);
	}
}
