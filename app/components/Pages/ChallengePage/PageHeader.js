import React, { Component } from 'react';
import moment from 'moment';
import defaultAvatar from '../../../images/default_avatar.png';
import teamsIconWide from '../../../images/teams_icon_wide.png';
import playersIconWide from '../../../images/players_icon_wide.png';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export default class PageHeader extends Component {
    render() {
        const imageSource = this.props.challenge.avatar
            ? `${s3URL}${this.props.challenge.avatar}`
            : defaultAvatar;
        return (
            <div className="page-header">
                <div className="col left">
                    <div className="left-side">
                        <div
                            className="avatar"
                            style={{
                                backgroundImage: `url('${imageSource}')`
                            }}
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
                        {this.props.challenge.target_steps.toLocaleString()}
                        <small>steps</small>
                    </h1>
                </div>
                <div className="col column right">
                    {this.props.challenge.type === 'player' ? (
                        <div className="row">
                            <img src={playersIconWide} className="small-icon" />
                            <span>
                                {`${this.props.challenge.players.length} Player`}
                                {this.props.challenge.players.length !== 1
                                    ? 's'
                                    : ''}
                            </span>
                        </div>
                    ) : (
                        <div className="row">
                            <img src={teamsIconWide} className="small-icon" />
                            <span>
                                {`${this.props.challenge.teams.length} Team`}
                                {this.props.challenge.teams.length !== 1
                                    ? 's'
                                    : ''}
                            </span>
                        </div>
                    )}
                    <div className="row">
                        <span>
                            Created:{' '}
                            {moment
                                .utc(this.props.challenge.created_at)
                                .local()
                                .format('DD/MM/YYYY')}
                        </span>
                    </div>
                    <div className="row">
                        <span>
                            Last Sync:{' '}
                            {this.props.challenge.last_sync_at === null
                                ? 'Never'
                                : moment
                                      .utc(this.props.challenge.last_sync_at)
                                      .local()
                                      .format('DD/MM/YYYY')}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
