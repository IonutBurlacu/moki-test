import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import {
    statsReportsTeamsRequest,
    applyFilterToDataA,
    removeFilterFromDataA
} from '../../../actions/reports';

export class DataAFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterASelectOpen: false
        };
    }

    handleFilterASelectMenu = () => {
        this.setState({ filterASelectOpen: !this.state.filterASelectOpen });
    };

    handleCloseFilterASelectMenu = () => {
        this.setState({ filterASelectOpen: false });
        if (this.props.filterByA) {
            this.props.removeFilterFromDataA();
            this.handleRemoveFilterFromDataA();
        }
    };

    handleApplyFilterDataA = (filterBy, filterByValue) => {
        this.props.showLoader();
        this.props.applyFilterToDataA(filterBy, filterByValue);
        this.props.statsReportsTeamsRequest(
            this.props.teamIdsA,
            this.props.teamIdsB,
            this.props.chartType,
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
                        this.state.filterASelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleFilterASelectMenu}
                >
                    Filter
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.state.filterASelectOpen ? 'block' : 'none'
                    }}
                >
                    <div className="filter-select-list-header">
                        Select Filter
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
    applyFilterToDataA: (filterBy, filterByValue) =>
        dispatch(applyFilterToDataA(filterBy, filterByValue)),
    removeFilterFromDataA: () => dispatch(removeFilterFromDataA()),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataAFilters);
