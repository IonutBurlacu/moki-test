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
            team_id: this.props.playerVariation.teamId,
            type: this.props.playerVariation.chartType,
            start_date: this.props.playerVariation.chartStartDate,
            end_date: this.props.playerVariation.chartEndDate
        });
        this.props.showLoader();
        axios({
            url: `${host}/api/reports/player_variation_pdf`,
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
                const teamName = this.props.teams.find(
                    team => team.id === this.props.playerVariation.teamId
                ).name;
                link.href = url;
                link.setAttribute(
                    'download',
                    `MOKI_${teamName}_player_variation_${
                        this.props.playerVariation.chartType
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
    playerVariation: state.reports.playerVariation
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopFilters);
