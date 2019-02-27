import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRange } from 'react-date-range';
import enGb from 'react-date-range/dist/locale/en-GB';
import moment from 'moment';
import {
    getDownloadPdfTeamsRequest,
    changeDownloadPdfTeamsListDate,
    openDownloadPdfMenu,
    closeDownloadPdfMenu
} from '../../../actions/reports';
import { showLoader } from '../../../actions/loader';

export class DateBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: props.downloadPdf.chartStartDate,
            endDate: props.downloadPdf.chartEndDate
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
        if (this.props.downloadPdf.dateSelectOpen) {
            this.props.closeDownloadPdfMenu('dateSelectOpen');
        } else {
            this.props.openDownloadPdfMenu('dateSelectOpen');
        }
    };

    handleCloseDateSelectMenu = () => {
        this.props.closeDownloadPdfMenu('dateSelectOpen');
    };

    handleDateSelectChange = listDate => {
        this.props.closeDownloadPdfMenu('dateSelectOpen');
        this.props.changeDownloadPdfTeamsListDate(listDate);
        this.props.showLoader();
        this.props.getDownloadPdfTeamsRequest(listDate);
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
                this.props.closeDownloadPdfMenu('dateSelectOpen');
                this.props.changeDownloadPdfTeamsListDate(
                    'interval',
                    this.state.startDate,
                    this.state.endDate
                );
                this.props.showLoader();
                this.props.getDownloadPdfTeamsRequest(
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
                        this.props.downloadPdf.dateSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleDateSelectMenu}
                >
                    {this.getSelectedDateType(this.props.downloadPdf.chartType)}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.downloadPdf.dateSelectOpen
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
                                this.props.downloadPdf.chartType === 'today'
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
                                this.props.downloadPdf.chartType === 'week'
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
                                this.props.downloadPdf.chartType === 'month'
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
                                this.props.downloadPdf.chartType === 'year'
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
                                this.props.downloadPdf.chartType === 'interval'
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
    downloadPdf: state.reports.downloadPdf
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    openDownloadPdfMenu: menu => dispatch(openDownloadPdfMenu(menu)),
    closeDownloadPdfMenu: menu => dispatch(closeDownloadPdfMenu(menu)),
    changeDownloadPdfTeamsListDate: (
        chartType,
        chartStartDate = moment.utc().local(),
        chartEndDate = moment.utc().local()
    ) =>
        dispatch(
            changeDownloadPdfTeamsListDate(
                chartType,
                chartStartDate,
                chartEndDate
            )
        ),
    getDownloadPdfTeamsRequest: (
        chartType,
        chartStartDate = moment.utc().local(),
        chartEndDate = moment.utc().local()
    ) =>
        dispatch(
            getDownloadPdfTeamsRequest(chartType, chartStartDate, chartEndDate)
        )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DateBy);
