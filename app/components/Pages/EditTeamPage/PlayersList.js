import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PlayersListModal from './PlayersListModal';
import { showLoader } from '../../../actions/loader';
import { detachTeamFromPlayerRequest } from '../../../actions/teams';
import defaultAvatar from '../../../images/default_avatar.png';
import playersListIcon from '../../../images/players_list_icon.png';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class PlayersList extends Component {
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

    detachFromPlayer = playerId => {
        this.props.showLoader();
        this.props.detachTeamFromPlayerRequest(playerId, this.props.id);
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
                    <button
                        type="button"
                        className="add-button"
                        onClick={this.openModal}
                    >
                        Add
                    </button>
                </div>
                <table className="table">
                    <tbody>
                        {this.props.items.map(item => {
                            const imageSource = item.avatar
                                ? `${s3URL}${item.avatar}`
                                : defaultAvatar;
                            return (
                                <tr key={item.id}>
                                    <td>
                                        <div
                                            className="avatar"
                                            style={{
                                                backgroundImage: `url('${imageSource}')`
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <h1 className="title">
                                            {`${item.first_name} ${
                                                item.last_name
                                            }`}
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
                                    <td className="align-right">
                                        <button
                                            type="button"
                                            className="green-button"
                                            onClick={() =>
                                                this.detachFromPlayer(item.id)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {this.props.items.length === 0 ? (
                            <tr className="no-items-row">
                                <td>
                                    <span>
                                        Team doesn't have any players yet.
                                    </span>
                                </td>
                            </tr>
                        ) : (
                            <tr />
                        )}
                    </tbody>
                </table>
                <PlayersListModal
                    modalIsOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal}
                    players={this.props.players}
                    id={this.props.id}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    detachTeamFromPlayerRequest: (playerId, teamId) =>
        dispatch(detachTeamFromPlayerRequest(playerId, teamId)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    undefined,
    mapDispatchToProps
)(PlayersList);
