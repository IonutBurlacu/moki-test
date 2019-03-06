import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import host from '../../../constants/serverUrl';
import encrypt from '../../../utils/encrypt';
import { showLoader, hideLoader } from '../../../actions/loader';
import TeamsFilter from './TeamsFilter';
import DateBy from './DateBy';

export class TopFilters extends Component {
    handleDownloadPDF = () => {
        const encrypted = encrypt({
            team_id: this.props.groupAverages.teamId,
            type: this.props.groupAverages.chartType,
            start_date: this.props.groupAverages.chartStartDate,
            end_date: this.props.groupAverages.chartEndDate
        });
        this.props.showLoader();
        axios({
            url: `${host}/api/reports/group_averages_pdf`,
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
                    .find(team => team.id === this.props.groupAverages.teamId)
                    .name.split(' ')
                    .join('_');
                link.href = url;
                link.setAttribute(
                    'download',
                    `MOKI_${teamName}_group_averages_${
                        this.props.groupAverages.chartType
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
                    <TeamsFilter />
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
    groupAverages: state.reports.groupAverages
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopFilters);
