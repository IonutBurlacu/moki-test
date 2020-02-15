import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRange } from 'react-date-range';
import enGb from 'react-date-range/dist/locale/en-GB';
import moment from 'moment';
import {
    getGroupAveragesRequest,
    openGroupAveragesMenu,
    closeGroupAveragesMenu
} from '../../../actions/reports';
import { showLoader } from '../../../actions/loader';

export class DateBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: props.groupAverages.dateByStartDate,
            endDate: props.groupAverages.dateByEndDate
        };
    }

    componentWillUnmount() {
        this.props.closeGroupAveragesMenu('dateSelectOpen');
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
        if (this.props.groupAverages.dateSelectOpen) {
            this.props.closeGroupAveragesMenu('dateSelectOpen');
        } else {
            this.props.openGroupAveragesMenu('dateSelectOpen');
        }
    };

    handleCloseDateSelectMenu = () => {
        this.props.closeGroupAveragesMenu('dateSelectOpen');
    };

    handleDateSelectChange = dateByType => {
        this.props.closeGroupAveragesMenu('dateSelectOpen');
        this.props.showLoader();
        this.props.getGroupAveragesRequest(
            this.props.teamId,
            dateByType,
            this.props.groupAverages.dateByStartDate,
            this.props.groupAverages.dateByEndDate
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
                this.props.closeGroupAveragesMenu('dateSelectOpen');
                this.props.showLoader();
                this.props.getGroupAveragesRequest(
                    this.props.teamId,
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
                        this.props.groupAverages.dateSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleDateSelectMenu}
                >
                    {this.getSelectedDateType(
                        this.props.groupAverages.dateByType
                    )}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.groupAverages.dateSelectOpen
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
                                this.props.groupAverages.dateByType === 'today'
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
                                this.props.groupAverages.dateByType ===
                                'yesterday'
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
                                this.props.groupAverages.dateByType ===
                                'last_7_days'
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
                                this.props.groupAverages.dateByType ===
                                'last_30_days'
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
                                this.props.groupAverages.dateByType ===
                                'last_90_days'
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
                                this.props.groupAverages.dateByType ===
                                'week_to_date'
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
                                this.props.groupAverages.dateByType ===
                                'month_to_date'
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
                                this.props.groupAverages.dateByType ===
                                'interval'
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
    teamId: state.reports.teamId,
    groupAverages: state.reports.groupAverages
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    openGroupAveragesMenu: menu => dispatch(openGroupAveragesMenu(menu)),
    closeGroupAveragesMenu: menu => dispatch(closeGroupAveragesMenu(menu)),
    getGroupAveragesRequest: (
        teamId,
        dateByType,
        dateByStartDate,
        dateByEndDate
    ) =>
        dispatch(
            getGroupAveragesRequest(
                teamId,
                dateByType,
                dateByStartDate,
                dateByEndDate
            )
        )
});

export default connect(mapStateToProps, mapDispatchToProps)(DateBy);
