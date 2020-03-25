import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import { showLoader } from '../../actions/loader';
import { getReportsTeamsRequest } from '../../actions/reports';
import playerAveragesIcon from '../../images/player_averages.png';
import groupAveragesIcon from '../../images/group_averages.png';
import totalStepsIcon from '../../images/total_steps.png';
import downloadPdfIcon from '../../images/download_pdf.png';

export class ReportsPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getReportsTeamsRequest();
    }

    render() {
        return (
            <div className="container container-with-title">
                <Header leftButton={<div />} rightButton={<div />} />
                <div className="content content-flex">
                    <PageTitle title="Reports" />
                    <div className="report-sections">
                        <div className="report-section">
                            <div className="report-section-title">
                                <p>Typical</p>
                            </div>
                            <div className="report-section-body">
                                <p className="report-section-description">
                                    View total steps, MVPA and Moki Grade across
                                    your entire school.
                                </p>
                                <img
                                    src={totalStepsIcon}
                                    className="report-section-icon"
                                    alt="total-steps"
                                />
                                <Link
                                    to="/reports/total_steps"
                                    className="report-section-button"
                                >
                                    <span>Show Report</span>
                                </Link>
                            </div>
                        </div>

                        <div className="report-section">
                            <div className="report-section-title">
                                <p className="report-section-description">
                                    Group Averages
                                </p>
                            </div>
                            <div className="report-section-body">
                                <p className="report-section-description">
                                    Compare the daily average of girls, boys,
                                    SEN, Pupil Premium etc.
                                </p>
                                <img
                                    src={groupAveragesIcon}
                                    className="report-section-icon"
                                    alt="group-averages"
                                />
                                <Link
                                    to="/reports/group_averages"
                                    className="report-section-button"
                                >
                                    <span>Show Report</span>
                                </Link>
                            </div>
                        </div>
                        <div className="report-section">
                            <div className="report-section-title">
                                <p>Player Variation</p>
                            </div>
                            <div className="report-section-body">
                                <p className="report-section-description">
                                    See the daily average difference between the
                                    most and least active.
                                </p>
                                <img
                                    src={playerAveragesIcon}
                                    className="report-section-icon"
                                    alt="players-averages"
                                />
                                <Link
                                    to="/reports/player_averages"
                                    className="report-section-button"
                                >
                                    <span>Show Report</span>
                                </Link>
                            </div>
                        </div>
                        <div className="report-section">
                            <div className="report-section-title">
                                <p>Download PDF</p>
                            </div>
                            <div className="report-section-body">
                                <p className="report-section-description">
                                    Download the full Report of any Team.
                                </p>
                                <img
                                    src={downloadPdfIcon}
                                    className="report-section-icon"
                                    alt="download-pdf"
                                />
                                <Link
                                    to="/reports/download_pdf"
                                    className="report-section-button"
                                >
                                    <span>Select Team</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getReportsTeamsRequest: () => dispatch(getReportsTeamsRequest()),
    showLoader: () => dispatch(showLoader())
});

export default connect(null, mapDispatchToProps)(ReportsPage);
