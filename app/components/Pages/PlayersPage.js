import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import { getPlayersRequest, viewPlayerRequest } from '../../actions/players';
import { viewTeamRequest } from '../../actions/teams';
import { viewChallengeRequest } from '../../actions/challenges';
import { showLoader } from '../../actions/loader';
import getFilteredPlayers from '../../selectors/players';
import defaultAvatar from '../../images/default_avatar.png';
import challengesIconWide from '../../images/challenges_icon_wide.png';
import teamsIconWide from '../../images/teams_icon_wide.png';
import TopFilters from './PlayersPage/TopFilters';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class PlayersPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getPlayersRequest(this.props.listDate);
    }

    handleView = id => {
        this.props.viewPlayerRequest(id);
        this.props.showLoader();
        this.props.history.push(`/players/view/${id}`);
    };

    handleTeamView = id => {
        this.props.viewTeamRequest(id);
        this.props.showLoader();
        this.props.history.push(`/teams/view/${id}`);
    };

    handleChallengeView = id => {
        this.props.viewChallengeRequest(id);
        this.props.showLoader();
        this.props.history.push(`/challenges/view/${id}`);
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
                                        <tr key={player.id}>
                                            <td>
                                                <img
                                                    src={
                                                        player.avatar
                                                            ? `${s3URL}${
                                                                  player.avatar
                                                              }`
                                                            : defaultAvatar
                                                    }
                                                    className="avatar"
                                                    alt="avatar"
                                                />
                                            </td>
                                            <td
                                                onClick={() =>
                                                    this.handleView(player.id)
                                                }
                                            >
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
                                                        : moment
                                                              .utc(
                                                                  player.last_sync_at
                                                              )
                                                              .local()
                                                              .format(
                                                                  'DD/MM/YYYY \\at HH.mma'
                                                              )}
                                                </span>
                                            </td>
                                            <td>
                                                {player.challenges.length >
                                                0 ? (
                                                    <img
                                                        src={challengesIconWide}
                                                        className="icon"
                                                        alt="icon"
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                                <span className="icon-label">
                                                    {player.challenges.map(
                                                        item => (
                                                            <span
                                                                key={item.id}
                                                                onClick={() =>
                                                                    this.handleChallengeView(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="table-link"
                                                            >
                                                                {item.name}
                                                            </span>
                                                        )
                                                    )}
                                                </span>
                                            </td>
                                            <td>
                                                {player.teams.length > 0 ? (
                                                    <img
                                                        src={teamsIconWide}
                                                        className="icon"
                                                        alt="icon"
                                                    />
                                                ) : (
                                                    ''
                                                )}

                                                <span className="icon-label">
                                                    {player.teams.map(item => (
                                                        <span
                                                            key={item.id}
                                                            onClick={() =>
                                                                this.handleTeamView(
                                                                    item.id
                                                                )
                                                            }
                                                            className="table-link"
                                                        >
                                                            {item.name}
                                                        </span>
                                                    ))}
                                                </span>
                                            </td>
                                            <td
                                                className={
                                                    player.current_steps <
                                                    player.previous_steps
                                                        ? 'negative align-right'
                                                        : 'positive align-right'
                                                }
                                            >
                                                <span className="percentage-icon" />
                                                <span className="percentage">
                                                    {player.percentage}%
                                                </span>
                                            </td>
                                            <td className="align-right">
                                                <h1 className="title">
                                                    {player.current_steps.toLocaleString()}
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
                                        <tr />
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="content" />
                )}
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    players: getFilteredPlayers(state.players.items, {
        filterByValues: state.players.listFilterValues,
        sortBy: state.players.listSort
    }),
    loading: state.players.loading,
    listDate: state.players.listDate
});

const mapDispatchToProps = dispatch => ({
    getPlayersRequest: listDate => dispatch(getPlayersRequest(listDate)),
    viewPlayerRequest: id => dispatch(viewPlayerRequest(id)),
    viewTeamRequest: id => dispatch(viewTeamRequest(id)),
    viewChallengeRequest: id => dispatch(viewChallengeRequest(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayersPage);
