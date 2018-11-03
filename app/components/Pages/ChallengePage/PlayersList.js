import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { viewPlayerRequest } from '../../../actions/players';
import { showLoader } from '../../../actions/loader';
import defaultAvatar from '../../../images/default_avatar.png';
import playersListIcon from '../../../images/players_list_icon.png';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class PlayersList extends Component {
    handleView = id => {
        this.props.viewPlayerRequest(id);
        this.props.showLoader();
        this.props.push(`/players/view/${id}`);
    };

    render() {
        return (
            <div className="table-wrapper">
                <div className="table-header">
                    <img
                        src={playersListIcon}
                        className="table-header-icon"
                        alt="table-header-icon"
                    />
                    <h3 className="table-header-title">Players</h3>
                </div>
                <table className="table">
                    <tbody>
                        {this.props.items.map(item => (
                            <tr
                                key={item.id}
                                onClick={() => this.handleView(item.id)}
                            >
                                <td style={{ width: '14vmin' }}>
                                    <img
                                        src={
                                            item.avatar
                                                ? `${s3URL}${item.avatar}`
                                                : defaultAvatar
                                        }
                                        className="avatar"
                                        alt="avatar"
                                    />
                                </td>
                                <td style={{ width: '53.76vmin' }}>
                                    <h1 className="title">
                                        {`${item.first_name} ${item.last_name}`}
                                    </h1>
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
                                <td style={{ width: '67.76vmin' }}>
                                    <div className="progress-bar">
                                        <div
                                            className={
                                                item.percentage < 20
                                                    ? 'filler red'
                                                    : item.percentage < 70
                                                        ? 'filler cyan'
                                                        : 'filler green'
                                            }
                                            style={{
                                                width: `${item.percentage}%`
                                            }}
                                        />
                                    </div>
                                </td>
                                <td
                                    style={{ width: '67.76vmin' }}
                                    className="align-right"
                                >
                                    <h1 className="title">
                                        {item.progress <= this.props.targetSteps
                                            ? parseInt(
                                                  this.props.targetSteps -
                                                      item.progress,
                                                  10
                                              ).toLocaleString()
                                            : 0}
                                        <small>steps</small>
                                        <span>to go</span>
                                    </h1>
                                </td>
                            </tr>
                        ))}
                        {this.props.items.length === 0 ? (
                            <tr className="no-items-row">
                                <td>
                                    <span>
                                        Challenge doesn't have any player yet.
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
    viewPlayerRequest: id => dispatch(viewPlayerRequest(id)),
    showLoader: () => dispatch(showLoader()),
    push: path => dispatch(push(path))
});

export default connect(
    undefined,
    mapDispatchToProps
)(PlayersList);
