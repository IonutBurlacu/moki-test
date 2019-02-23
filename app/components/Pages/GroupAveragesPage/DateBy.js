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
            startDate: props.groupAverages.chartStartDate,
            endDate: props.groupAverages.chartEndDate
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
        if (this.props.groupAverages.dateSelectOpen) {
            this.props.closeGroupAveragesMenu('dateSelectOpen');
        } else {
            this.props.openGroupAveragesMenu('dateSelectOpen');
        }
    };

    handleCloseDateSelectMenu = () => {
        this.props.closeGroupAveragesMenu('dateSelectOpen');
    };

    handleDateSelectChange = chartType => {
        this.props.closeGroupAveragesMenu('dateSelectOpen');
        this.props.showLoader();
        this.props.getGroupAveragesRequest(
            this.props.groupAverages.teamId,
            chartType,
            this.props.groupAverages.chartStartDate,
            this.props.groupAverages.chartEndDate
        );
    };

    handleDateRangeSelect = ranges => {
        this.setState({
            startDate: moment(ranges.range1.startDate),
            endDate: moment(ranges.range1.endDate)
        });
    };

    handleDateRangeFocus = ranges => {
        setTimeout(() => {
            if (ranges[1] === 0) {
                this.props.closeGroupAveragesMenu('dateSelectOpen');
                this.props.showLoader();
                this.props.getGroupAveragesRequest(
                    this.props.groupAverages.teamId,
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
                        this.props.groupAverages.chartType
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
                                this.props.listDate === 'today'
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
                                this.props.listDate === 'week' ? 'selected' : ''
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
                                this.props.listDate === 'month'
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
                                this.props.listDate === 'year' ? 'selected' : ''
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
                                this.props.listDate === 'interval'
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
    groupAverages: state.reports.groupAverages
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    openGroupAveragesMenu: menu => dispatch(openGroupAveragesMenu(menu)),
    closeGroupAveragesMenu: menu => dispatch(closeGroupAveragesMenu(menu)),
    getGroupAveragesRequest: (
        teamId,
        chartType,
        chartStartDate,
        chartEndDate
    ) =>
        dispatch(
            getGroupAveragesRequest(
                teamId,
                chartType,
                chartStartDate,
                chartEndDate
            )
        )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DateBy);
