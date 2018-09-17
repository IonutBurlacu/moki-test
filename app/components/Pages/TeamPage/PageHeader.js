import React, { Component } from 'react';
import moment from 'moment';
import defaultAvatar from '../../../images/default_avatar.png';
import playersIconWide from '../../../images/players_icon_wide.png';

export default class PageHeader extends Component {
    render() {
        const { team } = this.props;
        return (
            <div className="page-header">
                <div className="col left">
                    <div className="left-side">
                        <img
                            src={defaultAvatar}
                            className="avatar"
                            alt="avatar"
                        />
                    </div>
                    <div className="right-side">
                        <h3 className="title">{team.name}</h3>
                    </div>
                </div>
                <div className="col column">
                    <h1 className="steps">
                        {team.total_steps}
                        <small>steps</small>
                    </h1>
                    <span className="average">
                        Average {team.avg_steps} per day
                    </span>
                </div>
                <div className="col column right">
                    <div className="row">
                        <img
                            src={playersIconWide}
                            className="small-icon"
                            alt="small-icon"
                        />
                        {team.players ? (
                            <span>
                                {team.players.length} Player
                                {team.players.length != 1 ? 's' : ''}
                            </span>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="row">
                        <span>
                            Created:{' '}
                            {moment
                                .utc(team.created_at)
                                .local()
                                .format('DD/MM/YYYY')}
                        </span>
                    </div>
                    <div className="row">
                        <span>
                            Last Sync:{' '}
                            {team.last_sync_at === null
                                ? 'Never'
                                : moment
                                      .utc(team.last_sync_at)
                                      .local()
                                      .format('DD/MM/YYYY \\at HH.mma')}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
