import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { showLoader } from '../../../actions/loader';
import host from '../../../constants/serverUrl';
import DataBTeams from './DataBTeams';
import DataATeams from './DataATeams';
import DataAFilters from './DataAFilters';
import DataBFilters from './DataBFilters';
import encrypt from '../../../utils/encrypt';

export class TopFilters extends Component {
    handleExport = () => {
        const encrypted = encrypt({
            team_ids_a: this.props.teamIdsA,
            team_ids_b: this.props.teamIdsB,
            filter_by_a: this.props.filterByA,
            filter_by_value_a: this.props.filterByValueA,
            filter_by_b: this.props.filterByB,
            filter_by_value_b: this.props.filterByValueB,
            type: this.props.chartType,
            start_date: this.props.chartStartDate,
            end_date: this.props.chartEndDate
        });
        axios({
            url: `${host}/api/reports/export`,
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
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'reports.csv');
                document.body.appendChild(link);
                link.click();
                return true;
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <div className="top-filters">
                <div className="left-side">
                    <DataATeams />
                    <DataAFilters />
                </div>
                <div className="center-side">
                    <div className="filter-wrapper">
                        <button
                            type="button"
                            className="filter-button"
                            onClick={this.handleExport}
                        >
                            Export
                        </button>
                    </div>
                </div>
                <div className="right-side">
                    <DataBTeams />
                    <DataBFilters />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    teamIdsA: state.reports.teamIdsA,
    teamIdsB: state.reports.teamIdsB,
    chartType: state.reports.chartType,
    chartStartDate: state.reports.chartStartDate,
    chartEndDate: state.reports.chartEndDate,
    filterByA: state.reports.filterByA,
    filterByValueA: state.reports.filterByValueA,
    filterByB: state.reports.filterByB,
    filterByValueB: state.reports.filterByValueB
});

export default connect(
    mapStateToProps,
    undefined
)(TopFilters);
