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
						<h3 className="title">{this.props.team.name}</h3>
					</div>
				</div>
				<div className="col column">
					<h1 className="steps">
						{this.props.team.total_steps}
						<small>steps</small>
					</h1>
					<span className="average">Average 12k per day</span>
				</div>
				<div className="col column right">
					<div className="row">
						<img
							src="/images/players_icon_wide.png"
							className="small-icon"
						/>
						<span>
							{this.props.team.players.length} Player
							{this.props.team.players.length != 1 ? 's' : ''}
						</span>
					</div>
					<div className="row">
						<span>
							Created:{' '}
							{moment(this.props.team.created_at).format(
								'DD/MM/YYYY'
							)}
						</span>
					</div>
					<div className="row">
						<span>
							Last Sync:{' '}
							{this.props.team.last_sync_at === null
								? 'Never'
								: moment(this.props.team.last_sync_at).format(
										'DD/MM/YYYY'
								  )}
						</span>
					</div>
				</div>
			</div>
		);
	}
}
