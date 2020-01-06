import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import { getTeamsRequest, viewTeamRequest } from '../../actions/teams';
import { viewChallengeRequest } from '../../actions/challenges';
import { showLoader } from '../../actions/loader';
import getFilteredTeams from '../../selectors/teams';
import defaultAvatar from '../../images/default_avatar.png';
import challengesIconWide from '../../images/challenges_icon_wide.png';
import playersIconWide from '../../images/players_icon_wide.png';
import TopFilters from './TeamsPage/TopFilters';
import A_grade from '../../images/A.png';
import B_grade from '../../images/B.png';
import C_grade from '../../images/C.png';
import D_grade from '../../images/D.png';
import E_grade from '../../images/E.png';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class TeamsPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getTeamsRequest(
            this.props.dateByType,
            this.props.dateByStartDate,
            this.props.dateByEndDate
        );
    }

    handleView = id => {
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
        const { teams, loading } = this.props;
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
                    rightButton={<Link to="/teams/add">Add</Link>}
                />
                <PageTitle title="Teams" />
                <TopFilters />
                {!loading ? (
                    <div className="content">
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>
                                    {teams.map(team => {
                                        const imageSource = team.avatar
                                            ? `${s3URL}${team.avatar}`
                                            : defaultAvatar;
                                        const gradeImage =
                                            grades[team.grade_current];
                                        return (
                                            <tr key={team.id}>
                                                <td>
                                                    <div
                                                        className="avatar"
                                                        style={{
                                                            backgroundImage: `url(${imageSource})`
                                                        }}
                                                    />
                                                </td>
                                                <td
                                                    onClick={() =>
                                                        this.handleView(team.id)
                                                    }
                                                >
                                                    <h1 className="title">
                                                        {team.name}
                                                    </h1>
                                                    <span className="subtitle">
                                                        Last Sync:{' '}
                                                        {team.last_sync_at ===
                                                        null
                                                            ? 'Never'
                                                            : moment
                                                                  .utc(
                                                                      team.last_sync_at
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
                                                        {team.mvpa_time}
                                                        <small>MVPA</small>
                                                    </h1>
                                                </td>
                                                <td className="align-right">
                                                    <h1 className="title">
                                                        {team.daily_steps_current.toLocaleString()}
                                                        <small>steps</small>
                                                    </h1>
                                                </td>
                                                <td
                                                    className={
                                                        team.daily_steps_current <
                                                        team.daily_steps_previous
                                                            ? 'negative align-right'
                                                            : 'positive align-right'
                                                    }
                                                >
                                                    <span className="percentage-icon" />
                                                    <span className="percentage">
                                                        {team.percentage !== -1
                                                            ? `${team.percentage}%`
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
                                    {teams.length === 0 ? (
                                        <tr className="no-items-row">
                                            <td>
                                                <span>
                                                    This list is looking very
                                                    empty!{' '}
                                                    <Link
                                                        to="/teams/add"
                                                        className="no-items-row-button"
                                                    >
                                                        Add Teams here
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
    teams: getFilteredTeams(state.teams.items, {
        filterByValues: state.teams.listFilterValues,
        sortBy: state.teams.listSort
    }),
    dateByType: state.teams.dateByType,
    dateByStartDate: state.teams.dateByStartDate,
    dateByEndDate: state.teams.dateByEndDate,
    loading: state.teams.loading
});

const mapDispatchToProps = dispatch => ({
    getTeamsRequest: (dateByType, dateByStartDate, dateByEndDate) =>
        dispatch(getTeamsRequest(dateByType, dateByStartDate, dateByEndDate)),
    viewTeamRequest: id => dispatch(viewTeamRequest(id)),
    viewChallengeRequest: id => dispatch(viewChallengeRequest(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
