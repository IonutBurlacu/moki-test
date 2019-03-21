import React, { Component } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import { attachTeamToChallengeRequest } from '../../../actions/teams';
import defaultAvatar from '../../../images/default_avatar.png';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class ChallengesListModal extends Component {
    attachTeamToChallenge = challengeId => {
        this.props.showLoader();
        this.props.attachTeamToChallengeRequest(challengeId, this.props.id);
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
                        <span>Add Challenge</span>
                    </div>
                    <div className="modal-body">
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>
                                    {this.props.challenges.length ? (
                                        this.props.challenges.map(item => (
                                            <tr key={item.id}>
                                                <td
                                                    style={{
                                                        width: '14vmin'
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            item.avatar
                                                                ? `${s3URL}${
                                                                      item.avatar
                                                                  }`
                                                                : defaultAvatar
                                                        }
                                                        className="avatar"
                                                        alt="avatar"
                                                    />
                                                </td>
                                                <td>
                                                    <h1 className="title">
                                                        {item.name}
                                                    </h1>
                                                    <span className="subtitle">
                                                        Last Sync:{' '}
                                                        {item.last_sync_at ===
                                                        null
                                                            ? 'Never'
                                                            : moment
                                                                  .utc(
                                                                      item.last_sync_at
                                                                  )
                                                                  .local()
                                                                  .format(
                                                                      'DD/MM/YYYY \\at HH.mma'
                                                                  )}
                                                    </span>
                                                </td>
                                                <td className="align-right">
                                                    <button
                                                        type="button"
                                                        className="green-button"
                                                        onClick={() =>
                                                            this.attachTeamToChallenge(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Add
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="no-items-row">
                                            <td>
                                                <span>
                                                    There are no Challenges to
                                                    add.
                                                </span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            onClick={this.props.closeModal}
                            className="cancel-button"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    attachTeamToChallengeRequest: (challengeId, playerId) =>
        dispatch(attachTeamToChallengeRequest(challengeId, playerId)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    undefined,
    mapDispatchToProps
)(ChallengesListModal);
