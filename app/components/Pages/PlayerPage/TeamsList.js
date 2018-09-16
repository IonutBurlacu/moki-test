import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import defaultAvatar from '../../../images/default_avatar.png';
import teamsListIcon from '../../../images/teams_list_icon.png';

export class TeamsList extends Component {
    render() {
        return (
            <div className="table-wrapper">
                <div className="table-header">
                    <img
                        src={teamsListIcon}
                        className="table-header-icon"
                        alt="table-header-icon"
                    />
                    <h3 className="table-header-title">Teams</h3>
                </div>
                <table className="table">
                    <tbody>
                        {this.props.items.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <img
                                        src={defaultAvatar}
                                        className="avatar"
                                        alt="avatar"
                                    />
                                </td>
                                <td>
                                    <h1 className="title">{item.name}</h1>
                                    <span className="subtitle">
                                        Last Sync:{' '}
                                        {item.last_sync_at === null
                                            ? 'Never'
                                            : moment(item.last_sync_at).format(
                                                  'DD/MM/YYYY \\at HH.mma'
                                              )}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {this.props.items.length === 0 ? (
                            <tr className="no-items-row">
                                <td>
                                    <span>
                                        Player isn't part of any team yet.
                                    </span>
                                </td>
                            </tr>
                        ) : (
                            ''
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(undefined)(TeamsList);
