import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import TeamsListModal from './TeamsListModal';
import { detachNewPlayerFromTeam } from '../../../actions/players';
import defaultAvatar from '../../../images/default_avatar.png';
import teamsListIcon from '../../../images/teams_list_icon.png';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class TeamsList extends Component {
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
        this.props.detachNewPlayerFromTeam(teamId);
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
                                    <td className="align-right">
                                        <button
                                            type="button"
                                            className="green-button"
                                            onClick={() =>
                                                this.detachFromTeam(item.id)
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
                                        Player doesn't have any team yet.
                                    </span>
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
    detachNewPlayerFromTeam: teamId => dispatch(detachNewPlayerFromTeam(teamId))
});

export default connect(undefined, mapDispatchToProps)(TeamsList);