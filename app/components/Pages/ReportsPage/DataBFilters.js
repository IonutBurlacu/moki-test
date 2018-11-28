import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    statsReportsTeamsRequest,
    applyFilterToDataB,
    removeFilterFromDataB,
    clearFilterFromDataB,
    openReportsMenu,
    closeReportsMenu
} from '../../../actions/reports';

export class DataBFilters extends Component {
    handleFilterBSelectMenu = () => {
        if (this.props.filterBSelectOpen) {
            this.props.closeReportsMenu('filterBSelectOpen');
        } else {
            this.props.openReportsMenu('filterBSelectOpen');
        }
    };

    handleCloseFilterBSelectMenu = () => {
        this.props.closeReportsMenu('filterBSelectOpen');
    };

    handleClearFilterBSelectMenu = () => {
        this.props.clearFilterFromDataB();
        this.props.statsReportsTeamsRequest(
            this.props.teamIdsA,
            this.props.teamIdsB,
            this.props.chartType,
            this.props.chartStartDate,
            this.props.chartEndDate,
            this.props.filterByA,
            []
        );
    };

    handleApplyFilterDataB = filterBy => {
        this.props.showLoader();
        if (this.props.filterByB.includes(filterBy)) {
            this.props.removeFilterFromDataB(filterBy);
            this.props.statsReportsTeamsRequest(
                this.props.teamIdsA,
                this.props.teamIdsB,
                this.props.chartType,
                this.props.chartStartDate,
                this.props.chartEndDate,
                this.props.filterByA,
                this.props.filterByB.filter(value => value !== filterBy)
            );
        } else {
            this.props.applyFilterToDataB(filterBy);
            this.props.statsReportsTeamsRequest(
                this.props.teamIdsA,
                this.props.teamIdsB,
                this.props.chartType,
                this.props.chartStartDate,
                this.props.chartEndDate,
                this.props.filterByA,
                [...this.props.filterByB, filterBy]
            );
        }
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.props.filterBSelectOpen ||
                        this.props.filterByB.length
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleFilterBSelectMenu}
                >
                    {this.props.filterByB.length ? 'Filters On' : 'Filter'}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.filterBSelectOpen ? 'block' : 'none'
                    }}
                >
                    <div className="filter-select-list-header">
                        Select Filter
                        {this.props.filterByB.length ? (
                            <button
                                type="button"
                                className="clear"
                                onClick={this.handleClearFilterBSelectMenu}
                            >
                                Clear
                            </button>
                        ) : (
                            ''
                        )}
                        <button
                            type="button"
                            onClick={this.handleCloseFilterBSelectMenu}
                        >
                            ⨉
                        </button>
                    </div>
                    <ul className="filter-select-list">
                        <li
                            className={
                                this.props.filterByB.includes('male')
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataB('male')
                                }
                            >
                                Boys
                            </button>
                        </li>
                        <li
                            className={
                                this.props.filterByB.includes('female')
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataB('female')
                                }
                            >
                                Girls
                            </button>
                        </li>
                        <li
                            className={
                                this.props.filterByB.includes('top')
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataB('top')
                                }
                            >
                                Top 25%
                            </button>
                        </li>
                        <li
                            className={
                                this.props.filterByB.includes('bottom')
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataB('bottom')
                                }
                            >
                                Bottom 25%
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    teams: state.reports.teams,
    teamIdsA: state.reports.teamIdsA,
    teamIdsB: state.reports.teamIdsB,
    chartType: state.reports.chartType,
    chartStartDate: state.reports.chartStartDate,
    chartEndDate: state.reports.chartEndDate,
    filterByA: state.reports.filterByA,
    filterByB: state.reports.filterByB,
    filterBSelectOpen: state.reports.filterBSelectOpen
});

const mapDispatchToProps = dispatch => ({
    statsReportsTeamsRequest: (
        teamIdsA,
        teamIdsB,
        type,
        startDate,
        endDate,
        filterByA,
        filterByB
    ) =>
        dispatch(
            statsReportsTeamsRequest(
                teamIdsA,
                teamIdsB,
                type,
                startDate,
                endDate,
                filterByA,
                filterByB
            )
        ),
    applyFilterToDataB: filterBy => dispatch(applyFilterToDataB(filterBy)),
    removeFilterFromDataB: filterBy =>
        dispatch(removeFilterFromDataB(filterBy)),
    clearFilterFromDataB: () => dispatch(clearFilterFromDataB()),
    openReportsMenu: menu => dispatch(openReportsMenu(menu)),
    closeReportsMenu: menu => dispatch(closeReportsMenu(menu)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataBFilters);
