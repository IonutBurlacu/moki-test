import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeChallengesListFilter } from '../../../actions/challenges';

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

    handleCloseFilterSelectMenu = (setEmpty = true) => {
        this.setState({ filterSelectOpen: false });
        if (setEmpty) {
            this.props.changeChallengesListFilter('', '');
        }
    };

    handleFilterSelectChange = (listFilter, listFilterValue) => {
        this.props.changeChallengesListFilter(listFilter, listFilterValue);
        this.handleCloseFilterSelectMenu(false);
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.state.filterSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleFilterSelectMenu}
                >
                    Filter
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.state.filterSelectOpen ? 'block' : 'none'
                    }}
                >
                    <div className="filter-select-list-header">
                        Filter By
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
                                    this.props.listFilter === 'team_id' &&
                                    this.props.listFilterValue === team.id
                                        ? 'selected'
                                        : ''
                                }
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        this.handleFilterSelectChange(
                                            'team_id',
                                            team.id
                                        )
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
    listFilter: state.challenges.listFilter,
    listFilterValue: state.challenges.listFilterValue,
    teams: state.challenges.teams
});

const mapDispatchToProps = dispatch => ({
    changeChallengesListFilter: (listFilter, listFilterValue) =>
        dispatch(changeChallengesListFilter(listFilter, listFilterValue))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterBy);
