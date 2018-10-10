import React, { Component } from 'react';
import moment from 'moment';
import defaultAvatar from '../../../images/default_avatar.png';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export default class PageHeader extends Component {
    render() {
        return (
            <div className="page-header">
                <div className="col left">
                    <div className="left-side">
                        <img
                            src={
                                this.props.player.avatar
                                    ? `${s3URL}${this.props.player.avatar}`
                                    : defaultAvatar
                            }
                            className="avatar"
                            alt="avatar"
                        />
                    </div>
                    <div className="right-side">
                        <h3 className="title">
                            {`${this.props.player.first_name} ${
                                this.props.player.last_name
                            }`}
                        </h3>
                        <span className="subtitle">
                            {`Age ${this.props.player.age}`},{' '}
                            {this.props.player.gender === 'male'
                                ? 'Boy'
                                : 'Girl'}
                        </span>
                    </div>
                </div>
                <div className="col column">
                    <h1 className="steps">
                        {this.props.player.total_steps.toLocaleString()}
                        <small>steps</small>
                    </h1>
                    <span className="average">
                        Average{' '}
                        {parseInt(
                            this.props.player.avg_steps,
                            10
                        ).toLocaleString()}{' '}
                        per day
                    </span>
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
                            {moment
                                .utc(this.props.player.created_at)
                                .local()
                                .format('DD/MM/YYYY')}
                        </span>
                    </div>
                    <div className="row">
                        <span>
                            Last Sync:{' '}
                            {this.props.player.last_sync_at === null
                                ? 'Never'
                                : moment
                                      .utc(this.props.player.last_sync_at)
                                      .local()
                                      .format('DD/MM/YYYY \\at HH.mma')}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
