import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePlayersListFilter } from '../../../actions/players';

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
            this.props.changePlayersListFilter('', '');
        }
    };

    handleFilterSelectChange = (listFilter, listFilterValue) => {
        this.props.changePlayersListFilter(listFilter, listFilterValue);
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
    listFilter: state.players.listFilter,
    listFilterValue: state.players.listFilterValue,
    teams: state.players.teams
});

const mapDispatchToProps = dispatch => ({
    changePlayersListFilter: (listFilter, listFilterValue) =>
        dispatch(changePlayersListFilter(listFilter, listFilterValue))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterBy);
