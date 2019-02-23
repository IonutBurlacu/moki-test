import React, { Component } from 'react';
import {
    LineChart,
    Line,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { connect } from 'react-redux';
import { DateRange } from 'react-date-range';
import enGb from 'react-date-range/dist/locale/en-GB';
import moment from 'moment';
import {
    statsReportsTeamsRequest,
    openReportsMenu,
    closeReportsMenu
} from '../../../actions/reports';
import { showLoader } from '../../../actions/loader';

export class TypicalChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateSelectTypicalOpen: false,
            startDate: props.chartStartDate,
            endDate: props.chartEndDate,
            dataAVisible: true,
            dataBVisible: true
        };
    }

    getSelectedDateType = type => {
        switch (type) {
            case 'today':
                return 'Day';
            case 'week':
                return 'Week';
            case 'month':
                return 'Month';
            case 'year':
                return 'Year';
            case 'interval':
                return 'Interval';
            default:
                return 'Day';
        }
    };

    toggleDataAVisibility = () => {
        this.setState({ dataAVisible: !this.state.dataAVisible });
    };

    toggleDataBVisibility = () => {
        this.setState({ dataBVisible: !this.state.dataBVisible });
    };

    handleDateChange = type => {
        this.props.showLoader();
        this.props.closeReportsMenu('dateSelectTypicalOpen');
        this.props.statsReportsTeamsRequest(
            this.props.teamIdsA,
            this.props.teamIdsB,
            type,
            this.props.chartStartDate,
            this.props.chartEndDate,
            this.props.filterByA,
            this.props.filterByB
        );
    };

    handleDateSelectMenu = () => {
        if (this.props.dateSelectTypicalOpen) {
            this.props.closeReportsMenu('dateSelectTypicalOpen');
        } else {
            this.props.openReportsMenu('dateSelectTypicalOpen');
        }
    };

    handleCloseDateSelectMenu = () => {
        this.props.closeReportsMenu('dateSelectTypicalOpen');
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
                this.props.showLoader();
                this.props.closeReportsMenu('dateSelectTypicalOpen');
                this.props.statsReportsTeamsRequest(
                    this.props.teamIdsA,
                    this.props.teamIdsB,
                    'interval',
                    this.state.startDate,
                    this.state.endDate,
                    this.props.filterByA,
                    this.props.filterByB
                );
            }
        }, 1);
    };

    render() {
        return (
            <div className="chart-container">
                <div className="chart-header">
                    <h1>Typical</h1>
                    <div className="chart-select-wrapper">
                        <div className="chart-select">
                            <button
                                type="button"
                                className={
                                    this.props.dateSelectTypicalOpen
                                        ? 'chart-select-button active'
                                        : 'chart-select-button'
                                }
                                onClick={this.handleDateSelectMenu}
                            >
                                {this.getSelectedDateType(this.props.chartType)}
                            </button>
                            <div
                                className="chart-select-list-wrapper"
                                style={{
                                    display: this.props.dateSelectTypicalOpen
                                        ? 'block'
                                        : 'none'
                                }}
                            >
                                <div className="chart-select-list-header">
                                    Select Date
                                    <button
                                        type="button"
                                        onClick={this.handleCloseDateSelectMenu}
                                    >
                                        ⨉
                                    </button>
                                </div>
                                <ul className="chart-select-list">
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleDateChange('today')
                                            }
                                        >
                                            Day
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleDateChange('week')
                                            }
                                        >
                                            Week
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleDateChange('month')
                                            }
                                        >
                                            Month
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleDateChange('year')
                                            }
                                        >
                                            Year
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
                                                    startDate: this.state
                                                        .startDate,
                                                    endDate: this.state.endDate
                                                }
                                            ]}
                                            className="date-range-picker"
                                            direction="horizontal"
                                            showDateDisplay={false}
                                            rangeColors={['#66667b']}
                                            onChange={
                                                this.handleDateRangeSelect
                                            }
                                            locale={enGb}
                                            onRangeFocusChange={
                                                this.handleDateRangeFocus
                                            }
                                            maxDate={new Date()}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chart">
                    {this.props.typical.length ? (
                        <ResponsiveContainer width="99%">
                            <LineChart
                                data={this.props.typical}
                                margin={{
                                    top: 0,
                                    right: 15,
                                    left: 10,
                                    bottom: 10
                                }}
                            >
                                <CartesianGrid
                                    stroke="#53535d"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="x_axis"
                                    stroke="#f6f6f7"
                                    interval={0}
                                />
                                <YAxis
                                    stroke="#f6f6f7"
                                    tickFormatter={number => {
                                        if (number > 1000000000) {
                                            return `${(
                                                number / 1000000000
                                            ).toString()}B`;
                                        }
                                        if (number > 1000000) {
                                            return `${(
                                                number / 1000000
                                            ).toString()}M`;
                                        }
                                        if (number > 1000) {
                                            return `${(
                                                number / 1000
                                            ).toString()}K`;
                                        }
                                        return number.toString();
                                    }}
                                />
                                <Tooltip />
                                {this.state.dataAVisible ? (
                                    <Line
                                        type="monotone"
                                        dataKey="total_steps_a"
                                        name="Steps Data A"
                                        stroke="#fe335e"
                                        strokeWidth="2"
                                        dot={{
                                            stroke: '#fe335e',
                                            strokeWidth: 5
                                        }}
                                    />
                                ) : (
                                    ''
                                )}
                                {this.state.dataBVisible ? (
                                    <Line
                                        type="monotone"
                                        dataKey="total_steps_b"
                                        name="Steps Data B"
                                        stroke="#27ffd4"
                                        strokeWidth="2"
                                        dot={{
                                            stroke: '#27ffd4',
                                            strokeWidth: 5
                                        }}
                                    />
                                ) : (
                                    ''
                                )}
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        ''
                    )}
                </div>
                <div className="chart-bottom">
                    <div className="chart-bottom-line">
                        <div className="left-side">
                            <span className="red-square" />
                            <span>Data A</span>
                            <button
                                type="button"
                                className="toggle-chart-button"
                                onClick={this.toggleDataAVisibility}
                            >
                                {this.state.dataAVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <div className="center-side" />
                        <div className="right-side">
                            <span className="total">
                                Total:{' '}
                                {this.props.totalTypicalA.toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <div className="chart-bottom-line">
                        <div className="left-side">
                            <span className="green-square" />
                            <span>Data B</span>
                            <button
                                type="button"
                                className="toggle-chart-button"
                                onClick={this.toggleDataBVisibility}
                            >
                                {this.state.dataBVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <div className="center-side" />
                        <div className="right-side">
                            <span className="total">
                                Total:{' '}
                                {this.props.totalTypicalB.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    typical: state.reports.typical,
    teamIdsA: state.reports.teamIdsA,
    teamIdsB: state.reports.teamIdsB,
    chartType: state.reports.chartType,
    chartStartDate: state.reports.chartStartDate,
    chartEndDate: state.reports.chartEndDate,
    filterByA: state.reports.filterByA,
    filterByB: state.reports.filterByB,
    totalTypicalA: state.reports.totalTypicalA,
    totalTypicalB: state.reports.totalTypicalB,
    dateSelectTypicalOpen: state.reports.dateSelectTypicalOpen
});

const mapDispatchToProps = dispatch => ({
    statsReportsTeamsRequest: (
        teamIdsA,
        teamIdsB,
        type,
        startDate,
        endDate,
        filterByA,
        filterByB
    ) =>
        dispatch(
            statsReportsTeamsRequest(
                teamIdsA,
                teamIdsB,
                type,
                startDate,
                endDate,
                filterByA,
                filterByB
            )
        ),
    openReportsMenu: menu => dispatch(openReportsMenu(menu)),
    closeReportsMenu: menu => dispatch(closeReportsMenu(menu)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TypicalChart);
