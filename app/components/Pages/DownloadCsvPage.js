import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import Footer from '../Footer';
import { Header } from '../Header';
import PageTitle from './DownloadCsvPage/PageTitle';
import {
    getDownloadCsvTeamsRequest,
    addTeamToDownloadCsv
} from '../../actions/reports';
import { viewChallengeRequest } from '../../actions/challenges';
import { showLoader } from '../../actions/loader';
import getFilteredTeams from '../../selectors/teams';
import defaultAvatar from '../../images/default_avatar.png';
import challengesIconWide from '../../images/challenges_icon_wide.png';
import playersIconWide from '../../images/players_icon_wide.png';
import TopFilters from './DownloadCsvPage/TopFilters';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class DownloadCsvPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getDownloadCsvTeamsRequest(
            this.props.downloadCsv.dateByType,
            this.props.downloadCsv.dateByStartDate,
            this.props.downloadCsv.dateByEndDate
        );
    }

    handleChallengeView = id => {
        this.props.viewChallengeRequest(id);
        this.props.showLoader();
        this.props.history.push(`/challenges/view/${id}`);
    };

    handleTeamClick = teamId => {
        if (this.props.downloadCsv.teamId === teamId) {
            this.props.addTeamToDownloadCsv(null);
        } else {
            this.props.addTeamToDownloadCsv(teamId);
        }
    };

    render() {
        return (
            <div className="container container-with-title">
                <Header
                    leftButton={<Link to="/settings">Back</Link>}
                    rightButton={<div />}
                />
                <PageTitle title="Download CSV Data" />
                <TopFilters />
                {!this.props.loading ? (
                    <div className="content">
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>
                                    {this.props.teams.map(team => (
                                        <tr
                                            key={team.id}
                                            className={
                                                this.props.downloadCsv
                                                    .teamId === team.id
                                                    ? 'selected-tr'
                                                    : ''
                                            }
                                        >
                                            <td>
                                                <div className="avatar">
                                                    <img
                                                        src={
                                                            team.avatar
                                                                ? `${s3URL}${
                                                                      team.avatar
                                                                  }`
                                                                : defaultAvatar
                                                        }
                                                        alt="avatar"
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                onClick={() =>
                                                    this.handleTeamClick(
                                                        team.id
                                                    )
                                                }
                                            >
                                                <h1 className="title">
                                                    {team.name}
                                                </h1>
                                                <span className="subtitle">
                                                    Last Sync:{' '}
                                                    {team.last_sync_at === null
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
                                            <td>
                                                {team.challenges.length > 0 ? (
                                                    <img
                                                        src={challengesIconWide}
                                                        className="icon"
                                                        alt="icon"
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                                <span className="icon-label">
                                                    {team.challenges.map(
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
                                                <img
                                                    src={playersIconWide}
                                                    className="icon"
                                                    alt="icon"
                                                />{' '}
                                                <span className="icon-label">
                                                    {team.players_count} Player
                                                    {team.players_count !== 1
                                                        ? 's'
                                                        : ''}
                                                </span>
                                            </td>
                                            <td
                                                className={
                                                    team.current_steps <
                                                    team.previous_steps
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
                                                <h1 className="title">
                                                    {team.current_steps.toLocaleString()}
                                                    <small>steps</small>
                                                </h1>
                                            </td>
                                        </tr>
                                    ))}
                                    {this.props.teams.length === 0 ? (
                                        <tr className="no-items-row">
                                            <td>
                                                <span>
                                                    There are no teams yet.
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
    teams: getFilteredTeams(state.reports.downloadCsv.teams, {
        filterByValues: [],
        sortBy: state.reports.downloadCsv.listSort
    }),
    downloadCsv: state.reports.downloadCsv,
    loading: state.reports.loading
});

const mapDispatchToProps = dispatch => ({
    getDownloadCsvTeamsRequest: (dateByType, dateByStartDate, dateByEndDate) =>
        dispatch(
            getDownloadCsvTeamsRequest(
                dateByType,
                dateByStartDate,
                dateByEndDate
            )
        ),
    viewChallengeRequest: id => dispatch(viewChallengeRequest(id)),
    addTeamToDownloadCsv: teamId => dispatch(addTeamToDownloadCsv(teamId)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadCsvPage);
