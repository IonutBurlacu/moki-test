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
import { statsReportsTeamsRequest } from '../../../actions/reports';
import { showLoader } from '../../../actions/loader';

export class OverviewChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateSelectOpen: false,
            startDate: props.chartStartDate,
            endDate: props.chartEndDate,
            dataAVisible: true,
            dataBVisible: true
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

    toggleDataAVisibility = () => {
        this.setState({ dataAVisible: !this.state.dataAVisible });
    };

    toggleDataBVisibility = () => {
        this.setState({ dataBVisible: !this.state.dataBVisible });
    };

    handleDateChange = type => {
        this.props.showLoader();
        this.setState({ dateSelectOpen: false });
        this.props.statsReportsTeamsRequest(
            this.props.teamIdsA,
            this.props.teamIdsB,
            type,
            this.props.chartStartDate,
            this.props.chartEndDate,
            this.props.filterByA,
            this.props.filterByValueA,
            this.props.filterByB,
            this.props.filterByValueB
        );
    };

    handleDateSelectMenu = () => {
        this.setState({ dateSelectOpen: !this.state.dateSelectOpen });
    };

    handleCloseDateSelectMenu = () => {
        this.setState({ dateSelectOpen: false });
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
                this.setState({ dateSelectOpen: false });
                this.props.statsReportsTeamsRequest(
                    this.props.teamIdsA,
                    this.props.teamIdsB,
                    'interval',
                    this.state.startDate,
                    this.state.endDate,
                    this.props.filterByA,
                    this.props.filterByValueA,
                    this.props.filterByB,
                    this.props.filterByValueB
                );
            }
        }, 1);
    };

    render() {
        return (
            <div className="chart-container">
                <div className="chart-header">
                    <h1>Overview</h1>
                    <div className="chart-select-wrapper">
                        <div className="chart-select">
                            <button
                                type="button"
                                className="chart-select-button"
                                onClick={this.handleDateSelectMenu}
                            >
                                {this.getSelectedDateType(this.props.chartType)}
                            </button>
                            <div
                                className="chart-select-list-wrapper"
                                style={{
                                    display: this.state.dateSelectOpen
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
                                            Today
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleDateChange('week')
                                            }
                                        >
                                            This Week
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleDateChange('month')
                                            }
                                        >
                                            This Month
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.handleDateChange('year')
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
                    {this.props.overview.length ? (
                        <ResponsiveContainer width="99%">
                            <LineChart
                                data={this.props.overview}
                                margin={{
                                    top: 10,
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
                                <YAxis stroke="#f6f6f7" />
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
                        <div className="center-side">
                            <span>Trend:</span>
                            {this.props.totalOverviewA -
                                this.props.totalOverviewAPrevious !==
                            0 ? (
                                <span
                                    className={
                                        this.props.totalOverviewA >
                                        this.props.totalOverviewAPrevious
                                            ? 'positive'
                                            : 'negative'
                                    }
                                >
                                    <span className="percentage-icon" />
                                    <span className="percentage">
                                        {this.props.totalOverviewA >
                                        this.props.totalOverviewAPrevious
                                            ? (
                                                  ((this.props.totalOverviewA -
                                                      this.props
                                                          .totalOverviewAPrevious) /
                                                      this.props
                                                          .totalOverviewA) *
                                                  100
                                              ).toFixed(0)
                                            : (
                                                  ((this.props
                                                      .totalOverviewAPrevious -
                                                      this.props
                                                          .totalOverviewA) /
                                                      this.props
                                                          .totalOverviewAPrevious) *
                                                  100
                                              ).toFixed(0)}
                                        %
                                    </span>
                                </span>
                            ) : (
                                <span className="positive">
                                    <span className="percentage-icon" />
                                    <span className="percentage">0%</span>
                                </span>
                            )}
                        </div>
                        <div className="right-side">
                            <span className="total">
                                Total:{' '}
                                {this.props.totalOverviewA.toLocaleString()}
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
                        <div className="center-side">
                            <span>Trend:</span>
                            {this.props.totalOverviewB -
                                this.props.totalOverviewBPrevious !==
                            0 ? (
                                <span
                                    className={
                                        this.props.totalOverviewB >
                                        this.props.totalOverviewBPrevious
                                            ? 'positive'
                                            : 'negative'
                                    }
                                >
                                    <span className="percentage-icon" />
                                    <span className="percentage">
                                        {this.props.totalOverviewB >
                                        this.props.totalOverviewBPrevious
                                            ? (
                                                  ((this.props.totalOverviewB -
                                                      this.props
                                                          .totalOverviewBPrevious) /
                                                      this.props
                                                          .totalOverviewB) *
                                                  100
                                              ).toFixed(0)
                                            : (
                                                  ((this.props
                                                      .totalOverviewBPrevious -
                                                      this.props
                                                          .totalOverviewB) /
                                                      this.props
                                                          .totalOverviewBPrevious) *
                                                  100
                                              ).toFixed(0)}
                                        %
                                    </span>
                                </span>
                            ) : (
                                <span className="positive">
                                    <span className="percentage-icon" />
                                    <span className="percentage">0%</span>
                                </span>
                            )}
                        </div>
                        <div className="right-side">
                            <span className="total">
                                Total:{' '}
                                {this.props.totalOverviewB.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    overview: state.reports.overview,
    teamIdsA: state.reports.teamIdsA,
    teamIdsB: state.reports.teamIdsB,
    chartType: state.reports.chartType,
    chartStartDate: state.reports.chartStartDate,
    chartEndDate: state.reports.chartEndDate,
    filterByA: state.reports.filterByA,
    filterByValueA: state.reports.filterByValueA,
    filterByB: state.reports.filterByB,
    filterByValueB: state.reports.filterByValueB,
    totalOverviewA: state.reports.totalOverviewA,
    totalOverviewB: state.reports.totalOverviewB,
    totalOverviewAPrevious: state.reports.totalOverviewAPrevious,
    totalOverviewBPrevious: state.reports.totalOverviewBPrevious
});

const mapDispatchToProps = dispatch => ({
    statsReportsTeamsRequest: (
        teamIdsA,
        teamIdsB,
        type,
        startDate,
        endDate,
        filterByA,
        filterByValueA,
        filterByB,
        filterByValueB
    ) =>
        dispatch(
            statsReportsTeamsRequest(
                teamIdsA,
                teamIdsB,
                type,
                startDate,
                endDate,
                filterByA,
                filterByValueA,
                filterByB,
                filterByValueB
            )
        ),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewChart);
