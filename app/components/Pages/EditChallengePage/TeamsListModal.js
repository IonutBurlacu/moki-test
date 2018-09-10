import React, {Component} from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import { attachChallengeToTeamRequest } from '../../../actions/challenges';
import defaultAvatar from '../../../images/default_avatar.png';

export class TeamsListModal extends Component {
  attachChallengeToTeam = teamId => {
    this.props.showLoader();
    this.props.attachChallengeToTeamRequest(teamId, this.props.id);
  };

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <div className="modal-wrapper">
          <div className="modal-header">
            <span>Add Team</span>
          </div>
          <div className="modal-body">
            <div className="table-wrapper">
              <table className="table">
                <tbody>
                  {this.props.teams.map(item => (
                      <tr key={item.id}>
                        <td
                          style={{
                            width: '11vmin'
                          }}
                        >
                          <img
                            src={defaultAvatar}
                            className="avatar"
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
                        <td className="align-right">
                          <button
                            className="green-button"
                            onClick={() => this.attachChallengeToTeam(item.id)}
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={this.props.closeModal} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  attachChallengeToTeamRequest: (teamId, challengeId) =>
    dispatch(attachChallengeToTeamRequest(teamId, challengeId)),
  showLoader: () => dispatch(showLoader())
});

export default connect(
  undefined,
  mapDispatchToProps
)(TeamsListModal);
