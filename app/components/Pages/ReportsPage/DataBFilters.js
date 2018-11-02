import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    statsReportsTeamsRequest,
    applyFilterToDataB,
    removeFilterFromDataB,
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
        this.props.removeFilterFromDataB();
        this.handleRemoveFilterFromDataB();
    };

    handleApplyFilterDataB = (filterBy, filterByValue) => {
        this.props.showLoader();
        this.props.applyFilterToDataB(filterBy, filterByValue);
        this.props.statsReportsTeamsRequest(
            this.props.teamIdsA,
            this.props.teamIdsB,
            this.props.chartType,
            this.props.chartStartDate,
            this.props.chartEndDate,
            this.props.filterByA,
            this.props.filterByValueA,
            filterBy,
            filterByValue
        );
    };

    handleRemoveFilterFromDataB = () => {
        this.props.showLoader();
        this.props.removeFilterFromDataB();
        this.props.statsReportsTeamsRequest(
            this.props.teamIdsA,
            this.props.teamIdsB,
            this.props.chartType,
            this.props.chartStartDate,
            this.props.chartEndDate,
            this.props.filterByA,
            this.props.filterByValueA,
            '',
            ''
        );
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.props.filterBSelectOpen || this.props.filterByB
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleFilterBSelectMenu}
                >
                    {this.props.filterByB ? 'Filters On' : 'Filter'}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.filterBSelectOpen ? 'block' : 'none'
                    }}
                >
                    <div className="filter-select-list-header">
                        Select Filter
                        {this.props.filterByB ? (
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
                                this.props.filterByB === 'gender' &&
                                this.props.filterByValueB === 'male'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataB(
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
                                this.props.filterByB === 'gender' &&
                                this.props.filterByValueB === 'female'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataB(
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
                                this.props.filterByB === 'top' &&
                                this.props.filterByValueB === ''
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataB('top', '')
                                }
                            >
                                Top 25%
                            </button>
                        </li>
                        <li
                            className={
                                this.props.filterByB === 'bottom' &&
                                this.props.filterByValueB === ''
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleApplyFilterDataB('bottom', '')
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
    applyFilterToDataB: (filterBy, filterByValue) =>
        dispatch(applyFilterToDataB(filterBy, filterByValue)),
    removeFilterFromDataB: () => dispatch(removeFilterFromDataB()),
    openReportsMenu: menu => dispatch(openReportsMenu(menu)),
    closeReportsMenu: menu => dispatch(closeReportsMenu(menu)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataBFilters);
