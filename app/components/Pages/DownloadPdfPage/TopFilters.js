import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import host from '../../../constants/serverUrl';
import encrypt from '../../../utils/encrypt';
import { showLoader, hideLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import {
    changeDownloadPdfTeamsDateByType,
    openDownloadPdfMenu,
    closeDownloadPdfMenu
} from '../../../actions/reports';
import SortBy from './SortBy';
import DateBy from '../../DateBy';

export class TopFilters extends Component {
    handleDownloadPDF = () => {
        if (this.props.downloadPdf.teamId === null) {
            this.props.showAlert('Please select at least one Team.');
            return;
        }
        const encrypted = encrypt({
            team_id: this.props.downloadPdf.teamId,
            type: this.props.downloadPdf.dateByType,
            start_date: this.props.downloadPdf.dateByStartDate,
            end_date: this.props.downloadPdf.dateByEndDate
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
                const teamName = this.props.teams
                    .find(team => team.id === this.props.downloadPdf.teamId)
                    .name.split(' ')
                    .join('_');
                link.setAttribute(
                    'download',
                    `MOKI_${teamName}_all_reports_${this.props.downloadPdf.dateByType}.pdf`
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
                <div className="left-side"></div>
                <div className="center-side">
                    <DateBy
                        startDate={this.props.downloadPdf.dateByStartDate}
                        endDate={this.props.downloadPdf.dateByEndDate}
                        dateSelectOpen={this.props.downloadPdf.dateSelectOpen}
                        changeDateType={
                            this.props.changeDownloadPdfTeamsDateByType
                        }
                        openMenu={this.props.openDownloadPdfMenu}
                        closeMenu={this.props.closeDownloadPdfMenu}
                        type={this.props.downloadPdf.dateByType}
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
    teams: state.reports.teams,
    downloadPdf: state.reports.downloadPdf
});

const mapDispatchToProps = dispatch => ({
    showAlert: message => dispatch(showAlert(message)),
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader()),
    openDownloadPdfMenu: menu => dispatch(openDownloadPdfMenu(menu)),
    closeDownloadPdfMenu: menu => dispatch(closeDownloadPdfMenu(menu)),
    changeDownloadPdfTeamsDateByType: (
        dateByType,
        dateByStartDate = moment.utc().local(),
        dateByEndDate = moment.utc().local()
    ) =>
        dispatch(
            changeDownloadPdfTeamsDateByType(
                dateByType,
                dateByStartDate,
                dateByEndDate
            )
        )
});

export default connect(mapStateToProps, mapDispatchToProps)(TopFilters);
