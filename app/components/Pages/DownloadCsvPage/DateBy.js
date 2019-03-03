import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRange } from 'react-date-range';
import enGb from 'react-date-range/dist/locale/en-GB';
import moment from 'moment';
import {
    getDownloadCsvTeamsRequest,
    changeDownloadCsvTeamsListDate,
    openDownloadCsvMenu,
    closeDownloadCsvMenu
} from '../../../actions/reports';
import { showLoader } from '../../../actions/loader';

export class DateBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: props.downloadCsv.chartStartDate,
            endDate: props.downloadCsv.chartEndDate
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
        if (this.props.downloadCsv.dateSelectOpen) {
            this.props.closeDownloadCsvMenu('dateSelectOpen');
        } else {
            this.props.openDownloadCsvMenu('dateSelectOpen');
        }
    };

    handleCloseDateSelectMenu = () => {
        this.props.closeDownloadCsvMenu('dateSelectOpen');
    };

    handleDateSelectChange = listDate => {
        this.props.closeDownloadCsvMenu('dateSelectOpen');
        this.props.changeDownloadCsvTeamsListDate(listDate);
        this.props.showLoader();
        this.props.getDownloadCsvTeamsRequest(listDate);
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
                this.props.closeDownloadCsvMenu('dateSelectOpen');
                this.props.changeDownloadCsvTeamsListDate(
                    'interval',
                    this.state.startDate,
                    this.state.endDate
                );
                this.props.showLoader();
                this.props.getDownloadCsvTeamsRequest(
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
                        this.props.downloadCsv.dateSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleDateSelectMenu}
                >
                    {this.getSelectedDateType(this.props.downloadCsv.chartType)}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.downloadCsv.dateSelectOpen
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
                                this.props.downloadCsv.chartType === 'today'
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
                                this.props.downloadCsv.chartType === 'week'
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
                                this.props.downloadCsv.chartType === 'month'
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
                                this.props.downloadCsv.chartType === 'year'
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
                                this.props.downloadCsv.chartType === 'interval'
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
    downloadCsv: state.reports.downloadCsv
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    openDownloadCsvMenu: menu => dispatch(openDownloadCsvMenu(menu)),
    closeDownloadCsvMenu: menu => dispatch(closeDownloadCsvMenu(menu)),
    changeDownloadCsvTeamsListDate: (
        chartType,
        chartStartDate = moment.utc().local(),
        chartEndDate = moment.utc().local()
    ) =>
        dispatch(
            changeDownloadCsvTeamsListDate(
                chartType,
                chartStartDate,
                chartEndDate
            )
        ),
    getDownloadCsvTeamsRequest: (
        chartType,
        chartStartDate = moment.utc().local(),
        chartEndDate = moment.utc().local()
    ) =>
        dispatch(
            getDownloadCsvTeamsRequest(chartType, chartStartDate, chartEndDate)
        )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DateBy);
