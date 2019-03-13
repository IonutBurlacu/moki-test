import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRange } from 'react-date-range';
import enGb from 'react-date-range/dist/locale/en-GB';
import moment from 'moment';
import {
    changeTeamsDateByType,
    statsTeamRequest,
    openTeamsMenu,
    closeTeamsMenu
} from '../../../actions/teams';
import { changePlayersDateByType } from '../../../actions/players';
import { showLoader } from '../../../actions/loader';

export class DateBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: props.dateByStartDate,
            endDate: props.dateByEndDate
        };
    }

    getSelectedDateType = type => {
        switch (type) {
            case 'today':
                return 'Today';
            case 'week':
                return 'This Week';
            case 'month':
                return 'This Month';
            case 'year':
                return 'This Year';
            case 'interval':
                return 'Interval';
            default:
                return 'Date';
        }
    };

    handleDateSelectMenu = () => {
        if (this.props.dateSelectChartOpen) {
            this.props.closeTeamsMenu('dateSelectChartOpen');
        } else {
            this.props.openTeamsMenu('dateSelectChartOpen');
        }
    };

    handleCloseDateSelectMenu = () => {
        this.props.closeTeamsMenu('dateSelectChartOpen');
    };

    handleDateSelectChange = type => {
        this.props.showLoader();
        this.props.changePlayersDateByType(
            type,
            this.props.dateByStartDate,
            this.props.dateByEndDate
        );
        this.props.changeTeamsDateByType(
            type,
            this.props.dateByStartDate,
            this.props.dateByEndDate
        );
        this.props.closeTeamsMenu('dateSelectChartOpen');
        this.props.statsTeamRequest(
            this.props.team.id,
            type,
            this.props.dateByStartDate,
            this.props.dateByEndDate
        );
    };

    handleDateRangeSelect = ranges => {
        this.setState({
            startDate: moment(ranges.range1.startDate).hour(12),
            endDate: moment(ranges.range1.endDate).hour(12)
        });
    };

    handleDateRangeFocus = ranges => {
        setTimeout(() => {
            if (ranges[1] === 0) {
                this.props.showLoader();
                this.props.changePlayersDateByType(
                    'interval',
                    this.state.startDate,
                    this.state.endDate
                );
                this.props.changeTeamsDateByType(
                    'interval',
                    this.state.startDate,
                    this.state.endDate
                );
                this.props.closeTeamsMenu('dateSelectChartOpen');
                this.props.statsTeamRequest(
                    this.props.team.id,
                    'interval',
                    this.state.startDate,
                    this.state.endDate
                );
            }
        }, 1);
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.props.dateSelectChartOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleDateSelectMenu}
                >
                    {this.getSelectedDateType(this.props.dateByType)}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.dateSelectChartOpen
                            ? 'block'
                            : 'none'
                    }}
                >
                    <div className="filter-select-list-header">
                        Select Date
                        <button
                            type="button"
                            onClick={this.handleCloseDateSelectMenu}
                        >
                            ⨉
                        </button>
                    </div>
                    <ul className="filter-select-list">
                        <li
                            className={
                                this.props.dateByType === 'today'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleDateSelectChange('today')
                                }
                            >
                                Today
                            </button>
                        </li>
                        <li
                            className={
                                this.props.dateByType === 'week'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleDateSelectChange('week')
                                }
                            >
                                This Week
                            </button>
                        </li>
                        <li
                            className={
                                this.props.dateByType === 'month'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleDateSelectChange('month')
                                }
                            >
                                This Month
                            </button>
                        </li>
                        <li
                            className={
                                this.props.dateByType === 'year'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleDateSelectChange('year')
                                }
                            >
                                This Year
                            </button>
                        </li>
                        <li
                            className={
                                this.props.dateByType === 'interval'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <DateRange
                                ranges={[
                                    {
                                        startDate: this.state.startDate,
                                        endDate: this.state.endDate
                                    }
                                ]}
                                className="date-range-picker"
                                direction="horizontal"
                                showDateDisplay={false}
                                rangeColors={['#66667b']}
                                onChange={this.handleDateRangeSelect}
                                locale={enGb}
                                onRangeFocusChange={this.handleDateRangeFocus}
                                maxDate={new Date()}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    team: state.teams.team,
    dateByType: state.teams.dateByType,
    dateByStartDate: state.teams.dateByStartDate,
    dateByEndDate: state.teams.dateByEndDate,
    dateSelectChartOpen: state.teams.dateSelectChartOpen
});

const mapDispatchToProps = dispatch => ({
    statsTeamRequest: (id, type, startDate, endDate) =>
        dispatch(statsTeamRequest(id, type, startDate, endDate)),
    changePlayersDateByType: (type, startDate, endDate) =>
        dispatch(changePlayersDateByType(type, startDate, endDate)),
    changeTeamsDateByType: (type, startDate, endDate) =>
        dispatch(changeTeamsDateByType(type, startDate, endDate)),
    openTeamsMenu: menu => dispatch(openTeamsMenu(menu)),
    closeTeamsMenu: menu => dispatch(closeTeamsMenu(menu)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DateBy);
