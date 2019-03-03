import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import host from '../../../constants/serverUrl';
import encrypt from '../../../utils/encrypt';
import { showLoader, hideLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import SortBy from './SortBy';
import DateBy from './DateBy';

export class TopFilters extends Component {
    handleDownloadCSV = () => {
        if (this.props.downloadCsv.teamId === null) {
            this.props.showAlert('Select at least one team.');
            return;
        }
        const encrypted = encrypt({
            team_id: this.props.downloadCsv.teamId,
            type: this.props.downloadCsv.chartType,
            start_date: this.props.downloadCsv.chartStartDate,
            end_date: this.props.downloadCsv.chartEndDate
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
                const teamName = this.props.downloadCsv.teams.find(
                    team => team.id === this.props.downloadCsv.teamId
                ).name;
                link.setAttribute(
                    'download',
                    `MOKI_export_${teamName}_${
                        this.props.downloadCsv.chartType
                    }.csv`
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
                    <DateBy />
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
                            Download CSV
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    downloadCsv: state.reports.downloadCsv
});

const mapDispatchToProps = dispatch => ({
    showAlert: message => dispatch(showAlert(message)),
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopFilters);
