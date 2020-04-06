import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRange } from 'react-date-range';
import enGb from 'react-date-range/dist/locale/en-GB';
import moment from 'moment';
import {
    changePlayersDateByType,
    statsPlayerRequest,
    openPlayersMenu,
    closePlayersMenu
} from '../../../actions/players';
import { changeTeamsDateByType } from '../../../actions/teams';
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
            case 'yesterday':
                return 'Yesterday';
            case 'last_7_days':
                return 'Last 7 days';
            case 'last_30_days':
                return 'Last 30 days';
            case 'last_90_days':
                return 'Last 90 days';
            case 'week_to_date':
                return 'Week to date';
            case 'month_to_date':
                return 'Month to date';
            case 'interval':
                return 'Interval';
            default:
                return 'Date';
        }
    };

    handleDateSelectMenu = () => {
        if (this.props.dateSelectChartOpen) {
            this.props.closePlayersMenu('dateSelectChartOpen');
        } else {
            this.props.openPlayersMenu('dateSelectChartOpen');
        }
    };

    handleCloseDateSelectMenu = () => {
        this.props.closePlayersMenu('dateSelectChartOpen');
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
        this.props.closePlayersMenu('dateSelectChartOpen');
        this.props.statsPlayerRequest(
            this.props.player.id,
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
                this.props.closePlayersMenu('dateSelectChartOpen');
                this.props.statsPlayerRequest(
                    this.props.player.id,
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
                                this.props.dateByType === 'yesterday'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleDateSelectChange('yesterday')
                                }
                            >
                                Yesterday
                            </button>
                        </li>
                        <li
                            className={
                                this.props.dateByType === 'last_7_days'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleDateSelectChange('last_7_days')
                                }
                            >
                                Last 7 days
                            </button>
                        </li>
                        <li
                            className={
                                this.props.dateByType === 'last_30_days'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleDateSelectChange('last_30_days')
                                }
                            >
                                Last 30 days
                            </button>
                        </li>
                        <li
                            className={
                                this.props.dateByType === 'last_90_days'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleDateSelectChange('last_90_days')
                                }
                            >
                                Last 90 days
                            </button>
                        </li>
                        <li
                            className={
                                this.props.dateByType === 'week_to_date'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleDateSelectChange('week_to_date')
                                }
                            >
                                Week to date
                            </button>
                        </li>
                        <li
                            className={
                                this.props.dateByType === 'month_to_date'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleDateSelectChange('month_to_date')
                                }
                            >
                                Month to date
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
    player: state.players.player,
    dateByType: state.players.dateByType,
    dateByStartDate: state.players.dateByStartDate,
    dateByEndDate: state.players.dateByEndDate,
    dateSelectChartOpen: state.players.dateSelectChartOpen
});

const mapDispatchToProps = dispatch => ({
    statsPlayerRequest: (id, type, startDate, endDate) =>
        dispatch(statsPlayerRequest(id, type, startDate, endDate)),
    changePlayersDateByType: (type, startDate, endDate) =>
        dispatch(changePlayersDateByType(type, startDate, endDate)),
    changeTeamsDateByType: (type, startDate, endDate) =>
        dispatch(changeTeamsDateByType(type, startDate, endDate)),
    openPlayersMenu: menu => dispatch(openPlayersMenu(menu)),
    closePlayersMenu: menu => dispatch(closePlayersMenu(menu)),
    showLoader: () => dispatch(showLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(DateBy);
