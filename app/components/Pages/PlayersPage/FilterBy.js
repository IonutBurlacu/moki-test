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
                    className="filter-button filter-with-tick"
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
                        {this.props.grades.map(grade => (
                            <li
                                key={grade.id}
                                className={
                                    this.props.listFilter === 'grade_id' &&
                                    this.props.listFilterValue == grade.id
                                        ? 'selected'
                                        : ''
                                }
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        this.handleFilterSelectChange(
                                            'grade_id',
                                            grade.id
                                        )
                                    }
                                >
                                    {grade.name}
                                </button>
                            </li>
                        ))}
                        <li
                            className={
                                this.props.listFilter === 'gender' &&
                                this.props.listFilterValue === 'female'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleFilterSelectChange(
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
                                this.props.listFilter === 'gender' &&
                                this.props.listFilterValue === 'male'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleFilterSelectChange(
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
                                this.props.listFilter === 'top' &&
                                this.props.listFilterValue === ''
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleFilterSelectChange('top', '')
                                }
                            >
                                Top 25%
                            </button>
                        </li>
                        <li
                            className={
                                this.props.listFilter === 'bottom' &&
                                this.props.listFilterValue === ''
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleFilterSelectChange('bottom', '')
                                }
                            >
                                Bottom 25%
                            </button>
                        </li>
                        {this.props.years.map(year => (
                            <li
                                key={year.id}
                                className={
                                    this.props.listFilter === 'year_id' &&
                                    this.props.listFilterValue === year.id
                                        ? 'selected'
                                        : ''
                                }
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        this.handleFilterSelectChange(
                                            'year_id',
                                            year.id
                                        )
                                    }
                                >
                                    {year.name}
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
    years: state.players.years,
    grades: state.players.grades
});

const mapDispatchToProps = dispatch => ({
    changePlayersListFilter: (listFilter, listFilterValue) =>
        dispatch(changePlayersListFilter(listFilter, listFilterValue))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterBy);
