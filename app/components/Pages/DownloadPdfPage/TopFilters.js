import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import host from '../../../constants/serverUrl';
import encrypt from '../../../utils/encrypt';
import { showLoader, hideLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import {
    getDownloadPdfTeamsRequest,
    changeDownloadPdfTeamsListDate,
    openDownloadPdfMenu,
    closeDownloadPdfMenu
} from '../../../actions/reports';
import SortBy from './SortBy';
import DateBy from '../../DateBy';

export class TopFilters extends Component {
    handleDownloadPDF = () => {
        if (this.props.downloadPdf.teamId === null) {
            this.props.showAlert('Select at least one team.');
            return;
        }
        const encrypted = encrypt({
            team_id: this.props.downloadPdf.teamId,
            type: this.props.downloadPdf.chartType,
            start_date: this.props.downloadPdf.chartStartDate,
            end_date: this.props.downloadPdf.chartEndDate
        });
        this.props.showLoader();
        axios({
            url: `${host}/api/reports/all_reports_pdf`,
            method: 'POST',
            responseType: 'blob',
            headers: {
                Authorization: this.props.token
            },
            data: {
                encrypted
            }
        })
            .then(response => {
                this.props.hideLoader();
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement('a');
                link.href = url;
                const teamName = this.props.downloadPdf.teams
                    .find(team => team.id === this.props.downloadPdf.teamId)
                    .name.split(' ')
                    .join('_');
                link.setAttribute(
                    'download',
                    `MOKI_${teamName}_all_reports_${
                        this.props.downloadPdf.chartType
                    }.pdf`
                );
                document.body.appendChild(link);
                link.click();
                return true;
            })
            .catch(error => {
                this.props.hideLoader();
                console.log(error);
            });
    };

    render() {
        return (
            <div className="top-filters">
                <div className="left-side">
                    <SortBy />
                </div>
                <div className="center-side">
                    <DateBy
                        startDate={this.props.downloadPdf.chartStartDate}
                        endDate={this.props.downloadPdf.chartEndDate}
                        dateSelectOpen={this.props.downloadPdf.dateSelectOpen}
                        fetchNewData={this.props.getDownloadPdfTeamsRequest}
                        changeDateType={
                            this.props.changeDownloadPdfTeamsListDate
                        }
                        openMenu={this.props.openDownloadPdfMenu}
                        closeMenu={this.props.closeDownloadPdfMenu}
                        type={this.props.downloadPdf.chartType}
                    />
                </div>
                <div className="right-side">
                    <div className="filter-wrapper">
                        <button
                            type="button"
                            className={
                                this.props.downloadPdf.teamId !== null
                                    ? 'filter-button active'
                                    : 'filter-button'
                            }
                            onClick={this.handleDownloadPDF}
                        >
                            Download
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    downloadPdf: state.reports.downloadPdf
});

const mapDispatchToProps = dispatch => ({
    showAlert: message => dispatch(showAlert(message)),
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader()),
    openDownloadPdfMenu: menu => dispatch(openDownloadPdfMenu(menu)),
    closeDownloadPdfMenu: menu => dispatch(closeDownloadPdfMenu(menu)),
    changeDownloadPdfTeamsListDate: (
        chartType,
        chartStartDate = moment.utc().local(),
        chartEndDate = moment.utc().local()
    ) =>
        dispatch(
            changeDownloadPdfTeamsListDate(
                chartType,
                chartStartDate,
                chartEndDate
            )
        ),
    getDownloadPdfTeamsRequest: (
        chartType,
        chartStartDate = moment.utc().local(),
        chartEndDate = moment.utc().local()
    ) =>
        dispatch(
            getDownloadPdfTeamsRequest(chartType, chartStartDate, chartEndDate)
        )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopFilters);
