import React, { Component } from 'react';
import moment from 'moment';
import defaultAvatar from '../../../images/default_avatar.png';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export default class PageHeader extends Component {
    render() {
        const imageSource = this.props.player.avatar
            ? `${s3URL}${this.props.player.avatar}`
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
                        <h3 className="title not-bold">
                            {`${this.props.player.first_name} ${this.props.player.last_name}`}
                        </h3>
                        <span className="subtitle">
                            {`Age ${this.props.player.age}`},{' '}
                            {this.props.player.gender === 'male'
                                ? 'Boy'
                                : 'Girl'}
                        </span>
                    </div>
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
                            Joined:{' '}
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
