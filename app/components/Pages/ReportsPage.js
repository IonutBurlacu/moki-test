import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { shell } from 'electron';
import { connect } from 'react-redux';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import { showLoader } from '../../actions/loader';
import { getReportsTeamsRequest } from '../../actions/reports';
import playerVariationIcon from '../../images/player_variation.png';
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
                                <p>Player Variation</p>
                            </div>
                            <div className="report-section-body">
                                <p className="report-section-description">
                                    All Players in your Team ranked in order of
                                    steps taken. See the difference between most
                                    and least active.
                                </p>
                                <img
                                    src={playerVariationIcon}
                                    className="report-section-icon"
                                    alt="players-variation"
                                />
                                <Link
                                    to="/reports/player_variation"
                                    className="report-section-button"
                                >
                                    <span>View</span>
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
                                    See the average steps taken by groups in
                                    your Team, including boys and girls, SEN and
                                    Pupil Premium.
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
                                    <span>View</span>
                                </Link>
                            </div>
                        </div>
                        <div className="report-section">
                            <div className="report-section-title">
                                <p>Total Steps</p>
                            </div>
                            <div className="report-section-body">
                                <p className="report-section-description">
                                    A view of a Player or Team's step count
                                    across a selected time frame. Also enables
                                    you to compare two or more data sets.
                                </p>
                                <img
                                    src={totalStepsIcon}
                                    className="report-section-icon"
                                    alt="total-steps"
                                />
                                <Link
                                    to="/reports/player_variation"
                                    className="report-section-button"
                                >
                                    <span>View</span>
                                </Link>
                            </div>
                        </div>
                        <div className="report-section">
                            <div className="report-section-title">
                                <p>Download PDF</p>
                            </div>
                            <div className="report-section-body">
                                <p className="report-section-description">
                                    Want to print the whole Report? Click here
                                    to select Teams and download the report as a
                                    PDF.
                                </p>
                                <img
                                    src={downloadPdfIcon}
                                    className="report-section-icon"
                                    alt="download-pdf"
                                />
                                <Link
                                    to="/reports/player_variation"
                                    className="report-section-button"
                                >
                                    <span>View</span>
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

export default connect(
    null,
    mapDispatchToProps
)(ReportsPage);
