import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import Footer from '../Footer';
import { Header } from '../Header';
import PageTitle from './DownloadPdfPage/PageTitle';
import { addTeamToDownloadPdf } from '../../actions/reports';
import { showLoader } from '../../actions/loader';
import defaultAvatar from '../../images/default_avatar.png';
import TopFilters from './DownloadPdfPage/TopFilters';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class DownloadPdfPage extends Component {
    handleTeamClick = teamId => {
        if (this.props.teamId === teamId) {
            this.props.addTeamToDownloadPdf(null);
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
                <PageTitle title="Download PDF" />
                <TopFilters />
                {!this.props.loading ? (
                    <div className="content">
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>
                                    {this.props.teams.map(team => {
                                        const imageSource = team.avatar
                                            ? `${s3URL}${team.avatar}`
                                            : defaultAvatar;
                                        return (
                                            <tr key={team.id}>
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
                                                <td
                                                    className="align-right"
                                                    onClick={() =>
                                                        this.handleTeamClick(
                                                            team.id
                                                        )
                                                    }
                                                >
                                                    {this.props.teamId ===
                                                    team.id ? (
                                                        <h1 className="title selected-title">
                                                            Selected
                                                        </h1>
                                                    ) : (
                                                        <h1 className="title">
                                                            Select
                                                        </h1>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
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
    teamId: state.reports.teamId,
    teams: state.reports.teams,
    downloadPdf: state.reports.downloadPdf,
    loading: state.reports.loading
});

const mapDispatchToProps = dispatch => ({
    addTeamToDownloadPdf: teamId => dispatch(addTeamToDownloadPdf(teamId)),
    showLoader: () => dispatch(showLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadPdfPage);
