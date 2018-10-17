import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    addChallengesListFilter,
    removeChallengesListFilter,
    clearChallengesListFilter
} from '../../../actions/challenges';

export class FilterBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterSelectOpen: false
        };
    }

    handleFilterSelectMenu = () => {
        this.setState({ filterSelectOpen: !this.state.filterSelectOpen });
    };

    handleCloseFilterSelectMenu = () => {
        this.setState({ filterSelectOpen: false });
    };

    handleFiltersSelectMenu = filterValue => {
        if (this.props.listFilterValues.includes(filterValue)) {
            this.props.removeChallengesListFilter(filterValue);
        } else {
            this.props.addChallengesListFilter(filterValue);
        }
        this.handleCloseFilterSelectMenu();
    };

    handleClearFilterSelectMenu = () => {
        this.props.clearChallengesListFilter();
        this.handleCloseFilterSelectMenu();
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.state.filterSelectOpen ||
                        this.props.listFilterValues.length
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleFilterSelectMenu}
                >
                    {this.props.listFilterValues.length
                        ? 'Filters On'
                        : 'Filter'}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.state.filterSelectOpen ? 'block' : 'none'
                    }}
                >
                    <div className="filter-select-list-header">
                        Filter By
                        {this.props.listFilterValues.length ? (
                            <button
                                type="button"
                                className="clear"
                                onClick={this.handleClearFilterSelectMenu}
                            >
                                Clear
                            </button>
                        ) : (
                            ''
                        )}
                        <button
                            type="button"
                            onClick={this.handleCloseFilterSelectMenu}
                        >
                            ⨉
                        </button>
                    </div>
                    <ul className="filter-select-list">
                        {this.props.teams.map(team => (
                            <li
                                key={team.id}
                                className={
                                    this.props.listFilterValues.includes(
                                        team.id
                                    )
                                        ? 'selected'
                                        : ''
                                }
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        this.handleFiltersSelectMenu(team.id)
                                    }
                                >
                                    {team.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    listFilterValues: state.challenges.listFilterValues,
    teams: state.challenges.teams
});

const mapDispatchToProps = dispatch => ({
    addChallengesListFilter: filterValue =>
        dispatch(addChallengesListFilter(filterValue)),
    removeChallengesListFilter: filterValue =>
        dispatch(removeChallengesListFilter(filterValue)),
    clearChallengesListFilter: () => dispatch(clearChallengesListFilter())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterBy);
