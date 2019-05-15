import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { viewTeamRequest } from '../../../actions/teams';
import { showLoader } from '../../../actions/loader';
import defaultAvatar from '../../../images/default_avatar.png';
import teamsListIcon from '../../../images/teams_list_icon.png';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class TeamsList extends Component {
    handleView = id => {
        this.props.viewTeamRequest(id);
        this.props.showLoader();
        this.props.push(`/teams/view/${id}`);
    };

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
                            <tr
                                key={item.id}
                                onClick={() => this.handleView(item.id)}
                            >
                                <td>
                                    <div className="avatar">
                                        <img
                                            src={
                                                item.avatar
                                                    ? `${s3URL}${item.avatar}`
                                                    : defaultAvatar
                                            }
                                            alt="avatar"
                                        />
                                    </div>
                                </td>
                                <td>
                                    <h1 className="title">{item.name}</h1>
                                    <span className="subtitle">
                                        Last Sync:{' '}
                                        {item.last_sync_at === null
                                            ? 'Never'
                                            : moment
                                                  .utc(item.last_sync_at)
                                                  .local()
                                                  .format(
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
                            <tr />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    viewTeamRequest: id => dispatch(viewTeamRequest(id)),
    showLoader: () => dispatch(showLoader()),
    push: path => dispatch(push(path))
});

export default connect(
    undefined,
    mapDispatchToProps
)(TeamsList);
