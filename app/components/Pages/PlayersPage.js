import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import { getPlayersRequest, viewPlayerRequest } from '../../actions/players';
import { viewChallengeRequest } from '../../actions/challenges';
import { showLoader } from '../../actions/loader';
import getFilteredPlayers from '../../selectors/players';
import defaultAvatar from '../../images/default_avatar.png';
import TopFilters from './PlayersPage/TopFilters';
import duration from '../../utils/duration';
import gradeIcon from '../../utils/gradeIcon';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class PlayersPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getPlayersRequest(
            this.props.dateByType,
            this.props.dateByStartDate,
            this.props.dateByEndDate
        );
    }

    handleView = id => {
        this.props.history.push(`/players/view/${id}`);
    };

    handleTeamView = id => {
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
                <PageTitle title="Players" />
                <TopFilters />
                {!loading ? (
                    <div className="content">
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>
                                    {players.map(player => {
                                        const imageSource = player.avatar
                                            ? `${s3URL}${player.avatar}`
                                            : defaultAvatar;
                                        return (
                                            <tr
                                                key={player.id}
                                                onClick={() =>
                                                    this.handleView(player.id)
                                                }
                                            >
                                                <td
                                                    style={{
                                                        width: '7.5%'
                                                    }}
                                                >
                                                    <div
                                                        className="avatar"
                                                        style={{
                                                            backgroundImage: `url('${imageSource}')`
                                                        }}
                                                    />
                                                </td>
                                                <td
                                                    style={{
                                                        width: '35.4%'
                                                    }}
                                                >
                                                    <h1 className="title">
                                                        {`${player.first_name} ${player.last_name}`}
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
                                                <td
                                                    className="align-center"
                                                    style={{
                                                        width: '15.7%'
                                                    }}
                                                >
                                                    <h1 className="subtitle not-bold">
                                                        Player Daily Average:
                                                    </h1>
                                                </td>
                                                <td
                                                    className="align-right"
                                                    style={{
                                                        width: '12.2%',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    <h1 className="title">
                                                        {duration(
                                                            player.mvpa_minutes_current
                                                        )}
                                                        <small>MVPA</small>
                                                    </h1>
                                                </td>
                                                <td
                                                    className="align-right"
                                                    style={{
                                                        width: '12.2%',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    <h1 className="title">
                                                        {player.daily_steps_current.toLocaleString()}
                                                        <small>steps</small>
                                                    </h1>
                                                </td>
                                                <td
                                                    style={{
                                                        width: '10%',
                                                        textAlign: 'center'
                                                    }}
                                                    className={
                                                        player.grade_score_current <
                                                        player.grade_score_previous
                                                            ? 'negative align-right'
                                                            : 'positive align-right'
                                                    }
                                                >
                                                    <span className="percentage-icon" />
                                                    <span className="percentage">
                                                        {player.percentage !==
                                                        -1
                                                            ? `${Math.abs(
                                                                  player.percentage
                                                              )}%`
                                                            : 'NA'}
                                                    </span>
                                                </td>
                                                <td
                                                    className="align-right"
                                                    style={{
                                                        minWidth: '7%'
                                                    }}
                                                >
                                                    <img
                                                        src={gradeIcon(
                                                            player.grade_current
                                                        )}
                                                        className="grade"
                                                        alt="grade"
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {players.length === 0 ? (
                                        <tr className="no-items-row">
                                            <td>
                                                <span>
                                                    This list is looking very
                                                    empty!{' '}
                                                    <Link
                                                        to="/players/add"
                                                        className="no-items-row-button"
                                                    >
                                                        Add Players here
                                                    </Link>
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
    dateByType: state.players.dateByType,
    dateByStartDate: state.players.dateByStartDate,
    dateByEndDate: state.players.dateByEndDate
});

const mapDispatchToProps = dispatch => ({
    getPlayersRequest: (dateByType, dateByStartDate, dateByEndDate) =>
        dispatch(getPlayersRequest(dateByType, dateByStartDate, dateByEndDate)),
    viewPlayerRequest: (id, dateByType, dateByStartDate, dateByEndDate) =>
        dispatch(
            viewPlayerRequest(id, dateByType, dateByStartDate, dateByEndDate)
        ),
    viewChallengeRequest: id => dispatch(viewChallengeRequest(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayersPage);
