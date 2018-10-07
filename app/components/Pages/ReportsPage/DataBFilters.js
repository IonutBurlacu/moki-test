import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    statsReportsTeamsRequest,
    applyFilterToDataB,
    removeFilterFromDataB
} from '../../../actions/reports';

export class DataBFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterBSelectOpen: false
        };
    }

    handleFilterBSelectMenu = () => {
        this.setState({ filterBSelectOpen: !this.state.filterBSelectOpen });
    };

    handleCloseFilterBSelectMenu = () => {
        this.setState({ filterBSelectOpen: false });
        if (this.props.filterByB) {
            this.props.removeFilterFromDataB();
            this.handleRemoveFilterFromDataB();
        }
    };

    handleApplyFilterDataB = (filterBy, filterByValue) => {
        this.props.showLoader();
        this.props.applyFilterToDataB(filterBy, filterByValue);
        this.props.statsReportsTeamsRequest(
            this.props.teamIdsA,
            this.props.teamIdsB,
            this.props.chartType,
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
                        this.state.filterBSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleFilterBSelectMenu}
                >
                    Filter
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.state.filterBSelectOpen ? 'block' : 'none'
                    }}
                >
                    <div className="filter-select-list-header">
                        Select Filter
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
    filterByA: state.reports.filterByA,
    filterByValueA: state.reports.filterByValueA,
    filterByB: state.reports.filterByB,
    filterByValueB: state.reports.filterByValueB
});

const mapDispatchToProps = dispatch => ({
    statsReportsTeamsRequest: (
        teamIdsA,
        teamIdsB,
        type,
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
                filterByA,
                filterByValueA,
                filterByB,
                filterByValueB
            )
        ),
    applyFilterToDataB: (filterBy, filterByValue) =>
        dispatch(applyFilterToDataB(filterBy, filterByValue)),
    removeFilterFromDataB: () => dispatch(removeFilterFromDataB()),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataBFilters);
