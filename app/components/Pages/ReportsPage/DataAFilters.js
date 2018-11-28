import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filter } from 'bluebird-lst';
import { showLoader } from '../../../actions/loader';
import {
    statsReportsTeamsRequest,
    applyFilterToDataA,
    removeFilterFromDataA,
    clearFilterFromDataA,
    openReportsMenu,
    closeReportsMenu
} from '../../../actions/reports';

export class DataAFilters extends Component {
    componentWillUnmount() {
        // We do this to close all the dropdowns on screen change.
        this.props.openReportsMenu();
    }

    handleFilterASelectMenu = () => {
        if (this.props.filterASelectOpen) {
            this.props.closeReportsMenu('filterASelectOpen');
        } else {
            this.props.openReportsMenu('filterASelectOpen');
        }
    };

    handleCloseFilterASelectMenu = () => {
        this.props.closeReportsMenu('filterASelectOpen');
    };

    handleClearFilterASelectMenu = () => {
        this.props.clearFilterFromDataA();
        this.props.statsReportsTeamsRequest(
            this.props.teamIdsA,
            this.props.teamIdsB,
            this.props.chartType,
            this.props.chartStartDate,
            this.props.chartEndDate,
            [],
            this.props.filterByB
        );
    };

    handleApplyFilterDataA = filterBy => {
        this.props.showLoader();
        if (this.props.filterByA.includes(filterBy)) {
            this.props.removeFilterFromDataA(filterBy);
            this.props.statsReportsTeamsRequest(
                this.props.teamIdsA,
                this.props.teamIdsB,
                this.props.chartType,
                this.props.chartStartDate,
                this.props.chartEndDate,
                this.props.filterByA.filter(value => value !== filterBy),
                this.props.filterByB
            );
        } else {
            this.props.applyFilterToDataA(filterBy);
            this.props.statsReportsTeamsRequest(
                this.props.teamIdsA,
                this.props.teamIdsB,
                this.props.chartType,
                this.props.chartStartDate,
                this.props.chartEndDate,
                [...this.props.filterByA, filterBy],
                this.props.filterByB
            );
        }
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.props.filterASelectOpen ||
                        this.props.filterByA.length
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleFilterASelectMenu}
                >
                    {this.props.filterByA.length ? 'Filters On' : 'Filter'}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.filterASelectOpen ? 'block' : 'none'
                    }}
                >
                    <div className="filter-select-list-header">
                        Select Filter
                        {this.props.filterByA.length ? (
                            <button
                                type="button"
                                className="clear"
                                onClick={this.handleClearFilterASelectMenu}
                            >
                                Clear
                            </button>
                        ) : (
                            ''
                        )}
                        <button
                            type="button"
                            onClick={this.handleCloseFilterASelectMenu}
                        >
                            ⨉
                        </button>
                    </div>
                    <ul className="filter-select-list">
                        <li
                            className={
                                this.props.filterByA.includes('male')
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataA('male')
                                }
                            >
                                Boys
                            </button>
                        </li>
                        <li
                            className={
                                this.props.filterByA.includes('female')
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataA('female')
                                }
                            >
                                Girls
                            </button>
                        </li>
                        <li
                            className={
                                this.props.filterByA.includes('top')
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataA('top')
                                }
                            >
                                Top 25%
                            </button>
                        </li>
                        <li
                            className={
                                this.props.filterByA.includes('bottom')
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataA('bottom')
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
    filterASelectOpen: state.reports.filterASelectOpen
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
    applyFilterToDataA: filterBy => dispatch(applyFilterToDataA(filterBy)),
    removeFilterFromDataA: filterBy =>
        dispatch(removeFilterFromDataA(filterBy)),
    clearFilterFromDataA: () => dispatch(clearFilterFromDataA()),
    openReportsMenu: menu => dispatch(openReportsMenu(menu)),
    closeReportsMenu: menu => dispatch(closeReportsMenu(menu)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataAFilters);
