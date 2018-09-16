import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import { pairModeOn, pairModeOff, playerSelected } from '../../actions/bands';
import Footer from '../Footer';
import { getPlayersRequest } from '../../actions/players';
import { showLoader } from '../../actions/loader';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import defaultAvatar from '../../images/default_avatar.png';
import challengesIcon from '../../images/challenges_icon.png';
import teamsIcon from '../../images/teams_icon.png';
import Loader from '../Loader';

export class PairBandsPage extends Component {
    componentWillMount() {
        this.props.pairModeOn();
        this.props.showLoader();
        this.props.getPlayersRequest();
    }

    componentWillUnmount() {
        this.props.pairModeOff();
    }

    markAsSelected = id => {
        this.props.playerSelected(id);
    };

    render() {
        const { loading, players } = this.props;
        return (
            <div className="container">
                <Header
                    leftButton={<div />}
                    rightButton={<Link to="/players">Done</Link>}
                />
                {!loading ? (
                    <div className="content">
                        <PageTitle title="Pair Bands" isGreen />
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>
                                    {players.map(player => (
                                        <tr
                                            onClick={() =>
                                                this.markAsSelected(player.id)
                                            }
                                            key={player.id}
                                            className={
                                                this.props.selectedPlayerId ===
                                                player.id
                                                    ? 'selected'
                                                    : ''
                                            }
                                        >
                                            <td>
                                                <img
                                                    src={defaultAvatar}
                                                    className="avatar"
                                                    alt="avatar"
                                                />
                                            </td>
                                            <td>
                                                <h1 className="title">
                                                    {`${player.first_name} ${
                                                        player.last_name
                                                    }`}
                                                </h1>
                                                {this.props.selectedPlayerId ===
                                                player.id ? (
                                                    <span className="subtitle green">
                                                        Tap Band on Reader to
                                                        Pair
                                                    </span>
                                                ) : player.band === null ? (
                                                    <span className="subtitle red">
                                                        Last Paired: Never
                                                    </span>
                                                ) : (
                                                    <span className="subtitle red">
                                                        Last Paired:{' '}
                                                        {moment(
                                                            player.band
                                                                .created_at
                                                        ).format(
                                                            'DD/MM/YYYY \\at HH.mma'
                                                        )}
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                {player.challenges.length >
                                                0 ? (
                                                    <img
                                                        src={challengesIcon}
                                                        className="icon"
                                                        alt="icon"
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                                <span className="icon-label">
                                                    {player.challenges
                                                        .reduce(
                                                            (string, item) =>
                                                                `${string +
                                                                    item.name}, `,
                                                            ''
                                                        )
                                                        .slice(0, -2)}
                                                </span>
                                            </td>
                                            <td className="align-right">
                                                {player.teams.length > 0 ? (
                                                    <img
                                                        src={teamsIcon}
                                                        className="icon"
                                                        alt="icon"
                                                    />
                                                ) : (
                                                    ''
                                                )}

                                                <span className="icon-label">
                                                    {player.teams
                                                        .reduce(
                                                            (string, item) =>
                                                                `${string +
                                                                    item.name}, `,
                                                            ''
                                                        )
                                                        .slice(0, -2)}
                                                </span>
                                            </td>
                                            {player.previous_steps -
                                                player.current_steps !==
                                            0 ? (
                                                <td
                                                    className={
                                                        player.previous_steps >
                                                        player.current_steps
                                                            ? 'negative align-right'
                                                            : 'positive align-right'
                                                    }
                                                >
                                                    <span className="percentage-icon" />
                                                    <span className="percentage">
                                                        {player.previous_steps >
                                                        player.current_steps
                                                            ? (
                                                                  ((player.previous_steps -
                                                                      player.current_steps) /
                                                                      player.previous_steps) *
                                                                  100
                                                              ).toFixed(2)
                                                            : (
                                                                  ((player.current_steps -
                                                                      player.previous_steps) /
                                                                      player.current_steps) *
                                                                  100
                                                              ).toFixed(2)}
                                                        %
                                                    </span>
                                                </td>
                                            ) : (
                                                <td className="positive align-right">
                                                    <span className="percentage-icon" />
                                                    <span className="percentage">
                                                        0%
                                                    </span>
                                                </td>
                                            )}
                                            <td className="align-right">
                                                <h1 className="title">
                                                    {player.current_steps}
                                                    <small>steps</small>
                                                </h1>
                                            </td>
                                        </tr>
                                    ))}
                                    {players.length === 0 ? (
                                        <tr className="no-items-row">
                                            <td>
                                                <span>
                                                    There are no players yet.
                                                </span>
                                            </td>
                                        </tr>
                                    ) : (
                                        ''
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="content" />
                )}
                <Loader />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    players: state.players.items,
    loading: state.players.loading,
    selectedPlayerId: state.bands.selectedPlayerId
});

const mapDispatchToProps = dispatch => ({
    pairModeOn: () => dispatch(pairModeOn()),
    pairModeOff: () => dispatch(pairModeOff()),
    getPlayersRequest: () => dispatch(getPlayersRequest()),
    playerSelected: id => dispatch(playerSelected(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PairBandsPage);
