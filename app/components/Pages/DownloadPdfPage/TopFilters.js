import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import host from '../../../constants/serverUrl';
import encrypt from '../../../utils/encrypt';
import { showLoader, hideLoader } from '../../../actions/loader';
import SortBy from './SortBy';
import DateBy from './DateBy';

export class TopFilters extends Component {
    handleDownloadPDF = () => {
        if (this.props.downloadPdf.teamIds.length === 0) return;
        const encrypted = encrypt({
            team_ids: this.props.downloadPdf.teamIds,
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
                link.setAttribute(
                    'download',
                    `MOKI_all_reports_${this.props.downloadPdf.chartType}.pdf`
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
                                this.props.downloadPdf.teamIds.length
                                    ? 'filter-button active'
                                    : 'filter-button'
                            }
                            onClick={this.handleDownloadPDF}
                        >
                            Download PDF
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
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopFilters);
