import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import TeamsListModal from './TeamsListModal';
import { showLoader } from '../../../actions/loader';
import { detachPlayerFromTeamRequest } from '../../../actions/players';
import defaultAvatar from '../../../images/default_avatar.png';
import teamsListIcon from '../../../images/teams_list_icon.png';

export class TeamsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  detachFromTeam = teamId => {
    this.props.showLoader();
    this.props.detachPlayerFromTeamRequest(teamId, this.props.id);
  };

  render() {
    return (
      <div className="table-wrapper">
        <div className="table-header">
          <img src={teamsListIcon} className="table-header-icon" />
          <h3 className="table-header-title">Teams</h3>
          <button className="add-button" onClick={this.openModal}>
            Add
          </button>
        </div>
        <table className="table">
          <tbody>
            {this.props.items.map(item => (
              <tr key={item.id}>
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
                  <button
                    className="green-button"
                    onClick={() => this.detachFromTeam(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {this.props.items.length === 0 ? (
              <tr className="no-items-row">
                <td>
                  <span>Player isn't part of any team yet.</span>
                </td>
              </tr>
            ) : (
              <tr />
            )}
          </tbody>
        </table>
        <TeamsListModal
          modalIsOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
          teams={this.props.teams}
          id={this.props.id}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  detachPlayerFromTeamRequest: (teamId, playerId) =>
    dispatch(detachPlayerFromTeamRequest(teamId, playerId)),
  showLoader: () => dispatch(showLoader())
});

export default connect(
  undefined,
  mapDispatchToProps
)(TeamsList);
