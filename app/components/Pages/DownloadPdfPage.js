import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import Footer from '../Footer';
import { Header } from '../Header';
import PageTitle from './DownloadPdfPage/PageTitle';
import {
    getDownloadPdfTeamsRequest,
    addTeamToDownloadPdf,
    removeTeamFromDownloadPdf
} from '../../actions/reports';
import { viewChallengeRequest } from '../../actions/challenges';
import { showLoader } from '../../actions/loader';
import getFilteredTeams from '../../selectors/teams';
import defaultAvatar from '../../images/default_avatar.png';
import challengesIconWide from '../../images/challenges_icon_wide.png';
import playersIconWide from '../../images/players_icon_wide.png';
import TopFilters from './DownloadPdfPage/TopFilters';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class DownloadPdfPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getDownloadPdfTeamsRequest(
            this.props.downloadPdf.chartType,
            this.props.downloadPdf.chartStartDate,
            this.props.downloadPdf.chartEndDate
        );
    }

    handleChallengeView = id => {
        this.props.viewChallengeRequest(id);
        this.props.showLoader();
        this.props.history.push(`/challenges/view/${id}`);
    };

    handleTeamClick = teamId => {
        if (this.props.downloadPdf.teamIds.includes(teamId)) {
            this.props.removeTeamFromDownloadPdf(teamId);
        } else {
            this.props.addTeamToDownloadPdf(teamId);
        }
    };

    render() {
        return (
            <div className="container container-with-title">
                <Header
                    leftButton={<Link to="/reports">Back</Link>}
                    rightButton={<div />}
                />

                {!this.props.loading ? (
                    <div className="content">
                        <PageTitle title="Download PDF" />
                        <TopFilters />
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>
                                    {this.props.teams.map(team => (
                                        <tr
                                            key={team.id}
                                            className={
                                                this.props.downloadPdf.teamIds.includes(
                                                    team.id
                                                )
                                                    ? 'selected-tr'
                                                    : ''
                                            }
                                        >
                                            <td>
                                                <img
                                                    src={
                                                        team.avatar
                                                            ? `${s3URL}${
                                                                  team.avatar
                                                              }`
                                                            : defaultAvatar
                                                    }
                                                    className="avatar"
                                                    alt="avatar"
                                                />
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
                                                    {team.percentage}%
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
    teams: getFilteredTeams(state.reports.downloadPdf.teams, {
        filterByValues: [],
        sortBy: state.reports.downloadPdf.listSort
    }),
    downloadPdf: state.reports.downloadPdf,
    loading: state.reports.loading
});

const mapDispatchToProps = dispatch => ({
    getDownloadPdfTeamsRequest: (chartType, chartStartDate, chartEndDate) =>
        dispatch(
            getDownloadPdfTeamsRequest(chartType, chartStartDate, chartEndDate)
        ),
    viewChallengeRequest: id => dispatch(viewChallengeRequest(id)),
    addTeamToDownloadPdf: teamId => dispatch(addTeamToDownloadPdf(teamId)),
    removeTeamFromDownloadPdf: teamId =>
        dispatch(removeTeamFromDownloadPdf(teamId)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadPdfPage);
