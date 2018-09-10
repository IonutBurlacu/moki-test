import React, {Component} from 'react';
import moment from 'moment';
import defaultAvatar from '../../../images/default_avatar.png';
import teamsListIcon from '../../../images/teams_list_icon.png';

export default class TeamsList extends Component {
  handleEdit = id => {};

  render() {
    return (
      <div className="table-wrapper">
        <div className="table-header">
          <img src={teamsListIcon} className="table-header-icon" />
          <h3 className="table-header-title">Teams</h3>
        </div>
        <table className="table">
          <tbody>
            {this.props.items.map(item => (
              <tr onClick={() => this.handleEdit(item.id)} key={item.id}>
                <td style={{ width: '11vmin' }}>
                  <img src={defaultAvatar} className="avatar" />
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
                <td className="align-right">
                  <div className="progress-bar">
                    <div className="filler" style={{ width: `${'40'}%` }} />
                  </div>
                </td>
                <td className="align-right">
                  <h1 className="title">
                    120K
                    <small>steps</small>
                    <span>to go</span>
                  </h1>
                </td>
              </tr>
            ))}
            {this.props.items.length === 0 ? (
              <tr className="no-items-row">
                <td>
                  <span>Challenge doesn't have any team yet.</span>
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
