import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import Loader from '../Loader';
import { getPlayersRequest, viewPlayerRequest } from '../../actions/players';
import { showLoader } from '../../actions/loader';
import defaultAvatar from '../../images/default_avatar.png';
import challengesIcon from '../../images/challenges_icon.png';
import teamsIcon from '../../images/teams_icon.png';
import { TopFilters } from './PlayersPage/TopFilters';

export class PlayersPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getPlayersRequest();
    }

    handleView = id => {
        this.props.viewPlayerRequest(id);
        this.props.showLoader();
        this.props.history.push(`/players/view/${id}`);
    };

    render() {
        const { players, loading } = this.props;
        return (
            <div className="container container-with-title">
                <Header
                    leftButton={<Link to="/bands/pair">Pair Bands</Link>}
                    rightButton={<Link to="/players/add">Add</Link>}
                />
                {!loading ? (
                    <div className="content">
                        <PageTitle title="Players" />
                        <TopFilters />
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>
                                    {players.map(player => (
                                        <tr
                                            onClick={() =>
                                                this.handleView(player.id)
                                            }
                                            key={player.id}
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
                                                <span className="subtitle">
                                                    Last Sync:{' '}
                                                    {player.last_sync_at ===
                                                    null
                                                        ? 'Never'
                                                        : moment(
                                                              player.last_sync_at
                                                          ).format(
                                                              'DD/MM/YYYY \\at HH.mma'
                                                          )}
                                                </span>
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
    loading: state.players.loading
});

const mapDispatchToProps = dispatch => ({
    getPlayersRequest: () => dispatch(getPlayersRequest()),
    viewPlayerRequest: id => dispatch(viewPlayerRequest(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayersPage);
