import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import host from '../../../constants/serverUrl';
import encrypt from '../../../utils/encrypt';
import { showLoader, hideLoader } from '../../../actions/loader';
import TeamsFilter from './TeamsFilter';
import DateBy from './DateBy';
import ChartType from './ChartType';

export class TopFilters extends Component {
    handleDownloadPDF = () => {
        const encrypted = encrypt({
            team_id: this.props.totalSteps.teamId,
            type: this.props.totalSteps.dateByType,
            start_date: this.props.totalSteps.dateByStartDate,
            end_date: this.props.totalSteps.dateByEndDate
        });
        this.props.showLoader();
        axios({
            url: `${host}/api/reports/total_steps_pdf`,
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
                const teamName = this.props.teams
                    .find(team => team.id === this.props.totalSteps.teamId)
                    .name.split(' ')
                    .join('_');
                link.href = url;
                link.setAttribute(
                    'download',
                    `MOKI_${teamName}_total_steps_${this.props.totalSteps.dateByType}.pdf`
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
                    <ChartType />
                </div>
                <div className="center-side">
                    <DateBy />
                </div>
                <div className="right-side">
                    <div className="filter-wrapper">
                        <button
                            type="button"
                            className="filter-button"
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
    teams: state.reports.teams,
    totalSteps: state.reports.totalSteps
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopFilters);
