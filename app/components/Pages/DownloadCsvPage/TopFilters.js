import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import host from '../../../constants/serverUrl';
import encrypt from '../../../utils/encrypt';
import { showLoader, hideLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import SortBy from './SortBy';
import DateBy from '../../DateBy';
import {
    changeDownloadCsvTeamsDateByType,
    openDownloadCsvMenu,
    closeDownloadCsvMenu
} from '../../../actions/reports';

export class TopFilters extends Component {
    handleDownloadCSV = () => {
        if (this.props.downloadCsv.teamId === null) {
            this.props.showAlert('Please select at least one Team.');
            return;
        }
        const encrypted = encrypt({
            team_id: this.props.downloadCsv.teamId,
            type: this.props.downloadCsv.dateByType,
            start_date: this.props.downloadCsv.dateByStartDate,
            end_date: this.props.downloadCsv.dateByEndDate
        });
        this.props.showLoader();
        axios({
            url: `${host}/api/reports/download_csv`,
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
                    .find(team => team.id === this.props.downloadCsv.teamId)
                    .name.split(' ')
                    .join('_');
                link.setAttribute(
                    'download',
                    `MOKI_export_${teamName}_${this.props.downloadCsv.dateByType}.csv`
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
                        startDate={this.props.downloadCsv.dateByStartDate}
                        endDate={this.props.downloadCsv.dateByEndDate}
                        dateSelectOpen={this.props.downloadCsv.dateSelectOpen}
                        changeDateType={
                            this.props.changeDownloadCsvTeamsDateByType
                        }
                        openMenu={this.props.openDownloadCsvMenu}
                        closeMenu={this.props.closeDownloadCsvMenu}
                        type={this.props.downloadCsv.dateByType}
                    />
                </div>
                <div className="right-side">
                    <div className="filter-wrapper">
                        <button
                            type="button"
                            className={
                                this.props.downloadCsv.teamId !== null
                                    ? 'filter-button active'
                                    : 'filter-button'
                            }
                            onClick={this.handleDownloadCSV}
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
    downloadCsv: state.reports.downloadCsv
});

const mapDispatchToProps = dispatch => ({
    showAlert: message => dispatch(showAlert(message)),
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader()),
    openDownloadCsvMenu: menu => dispatch(openDownloadCsvMenu(menu)),
    closeDownloadCsvMenu: menu => dispatch(closeDownloadCsvMenu(menu)),
    changeDownloadCsvTeamsDateByType: (
        dateByType,
        dateByStartDate = moment.utc().local(),
        dateByEndDate = moment.utc().local()
    ) =>
        dispatch(
            changeDownloadCsvTeamsDateByType(
                dateByType,
                dateByStartDate,
                dateByEndDate
            )
        )
});

export default connect(mapStateToProps, mapDispatchToProps)(TopFilters);
