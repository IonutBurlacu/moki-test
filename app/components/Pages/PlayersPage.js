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
import A_grade from '../../images/A.png';
import B_grade from '../../images/B.png';
import C_grade from '../../images/C.png';
import D_grade from '../../images/D.png';
import E_grade from '../../images/E.png';

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
        const grades = {
            A: A_grade,
            B: B_grade,
            C: C_grade,
            D: D_grade,
            E: E_grade
        };
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
                                        const gradeImage =
                                            grades[player.grade_current];
                                        return (
                                            <tr key={player.id}>
                                                <td>
                                                    <div
                                                        className="avatar"
                                                        style={{
                                                            backgroundImage: `url('${imageSource}')`
                                                        }}
                                                    />
                                                </td>
                                                <td
                                                    onClick={() =>
                                                        this.handleView(
                                                            player.id
                                                        )
                                                    }
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
                                                <td className="">
                                                    <h1 className="title">
                                                        <small>
                                                            Player Daily Average
                                                        </small>
                                                    </h1>
                                                </td>
                                                <td className="align-right">
                                                    <h1 className="title">
                                                        {player.mvpa_time}
                                                        <small>MVPA</small>
                                                    </h1>
                                                </td>
                                                <td className="align-right">
                                                    <h1 className="title">
                                                        {player.daily_steps_current.toLocaleString()}
                                                        <small>steps</small>
                                                    </h1>
                                                </td>
                                                <td
                                                    className={
                                                        player.daily_steps_current <
                                                        player.daily_steps_previous
                                                            ? 'negative align-right'
                                                            : 'positive align-right'
                                                    }
                                                >
                                                    <span className="percentage-icon" />
                                                    <span className="percentage">
                                                        {player.percentage !==
                                                        -1
                                                            ? `${player.percentage}%`
                                                            : 'NA'}
                                                    </span>
                                                </td>
                                                <td className="align-right">
                                                    <img
                                                        src={gradeImage}
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
    viewPlayerRequest: id => dispatch(viewPlayerRequest(id)),
    viewTeamRequest: id => dispatch(viewTeamRequest(id)),
    viewChallengeRequest: id => dispatch(viewChallengeRequest(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayersPage);
