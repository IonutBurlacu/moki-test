import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    statsReportsTeamsRequest,
    applyFilterToDataA,
    removeFilterFromDataA,
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
        this.props.removeFilterFromDataA();
        this.handleRemoveFilterFromDataA();
    };

    handleApplyFilterDataA = (filterBy, filterByValue) => {
        this.props.showLoader();
        this.props.applyFilterToDataA(filterBy, filterByValue);
        this.props.statsReportsTeamsRequest(
            this.props.teamIdsA,
            this.props.teamIdsB,
            this.props.chartType,
            this.props.chartStartDate,
            this.props.chartEndDate,
            filterBy,
            filterByValue,
            this.props.filterByB,
            this.props.filterByValueB
        );
    };

    handleRemoveFilterFromDataA = () => {
        this.props.showLoader();
        this.props.removeFilterFromDataA();
        this.props.statsReportsTeamsRequest(
            this.props.teamIdsA,
            this.props.teamIdsB,
            this.props.chartType,
            this.props.chartStartDate,
            this.props.chartEndDate,
            '',
            '',
            this.props.filterByB,
            this.props.filterByValueB
        );
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.props.filterASelectOpen || this.props.filterByA
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleFilterASelectMenu}
                >
                    {this.props.filterByA ? 'Filters On' : 'Filter'}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.filterASelectOpen ? 'block' : 'none'
                    }}
                >
                    <div className="filter-select-list-header">
                        Select Filter
                        {this.props.filterByA ? (
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
                                this.props.filterByA === 'gender' &&
                                this.props.filterByValueA === 'male'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataA(
                                        'gender',
                                        'male'
                                    )
                                }
                            >
                                Boys
                            </button>
                        </li>
                        <li
                            className={
                                this.props.filterByA === 'gender' &&
                                this.props.filterByValueA === 'female'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataA(
                                        'gender',
                                        'female'
                                    )
                                }
                            >
                                Girls
                            </button>
                        </li>
                        <li
                            className={
                                this.props.filterByA === 'top' &&
                                this.props.filterByValueA === ''
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataA('top', '')
                                }
                            >
                                Top 25%
                            </button>
                        </li>
                        <li
                            className={
                                this.props.filterByA === 'bottom' &&
                                this.props.filterByValueA === ''
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataA('bottom', '')
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
    filterByValueA: state.reports.filterByValueA,
    filterByB: state.reports.filterByB,
    filterByValueB: state.reports.filterByValueB,
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
        filterByValueA,
        filterByB,
        filterByValueB
    ) =>
        dispatch(
            statsReportsTeamsRequest(
                teamIdsA,
                teamIdsB,
                type,
                startDate,
                endDate,
                filterByA,
                filterByValueA,
                filterByB,
                filterByValueB
            )
        ),
    applyFilterToDataA: (filterBy, filterByValue) =>
        dispatch(applyFilterToDataA(filterBy, filterByValue)),
    removeFilterFromDataA: () => dispatch(removeFilterFromDataA()),
    openReportsMenu: menu => dispatch(openReportsMenu(menu)),
    closeReportsMenu: menu => dispatch(closeReportsMenu(menu)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataAFilters);
