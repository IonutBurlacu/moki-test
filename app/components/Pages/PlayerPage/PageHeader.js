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
						<h3 className="title">
							{this.props.player.first_name +
								' ' +
								this.props.player.last_name}
						</h3>
						<span className="subtitle">
							Age{' '}
							{moment().diff(
								moment(this.props.player.birthday),
								'year'
							)}
							,{' '}
							{this.props.player.gender === 'male'
								? 'Boy'
								: 'Girl'}
						</span>
					</div>
				</div>
				<div className="col column">
					<h1 className="steps">
						{this.props.player.total_steps}
						<small>steps</small>
					</h1>
					<span className="average">Average 12k per day</span>
				</div>
				<div className="col column right">
					<div className="row">
						<span>
							Born:{' '}
							{moment(this.props.player.birthday).format(
								'DD/MM/YYYY'
							)}
						</span>
					</div>
					<div className="row">
						<span>
							Created:{' '}
							{moment(this.props.player.created_at).format(
								'DD/MM/YYYY'
							)}
						</span>
					</div>
					<div className="row">
						<span>
							Last Sync:{' '}
							{this.props.player.last_sync_at === null
								? 'Never'
								: moment(this.props.player.last_sync_at).format(
										'DD/MM/YYYY \\at HH.mma'
								  )}
						</span>
					</div>
				</div>
			</div>
		);
	}
}
