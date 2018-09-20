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
import { statsReportsTeamsRequest } from '../../../actions/reports';
import { showLoader } from '../../../actions/loader';

export class OverviewChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateSelectOpen: false,
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
                            <span className="negative">
                                <span className="percentage-icon" />
                                <span className="percentage">25%</span>
                            </span>
                        </div>
                        <div className="right-side">
                            <span className="total">
                                Total: {this.props.totalOverviewA}
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
                            <span className="positive">
                                <span className="percentage-icon" />
                                <span className="percentage">25%</span>
                            </span>
                        </div>
                        <div className="right-side">
                            <span className="total">
                                Total: {this.props.totalOverviewB}
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
    filterByA: state.reports.filterByA,
    filterByValueA: state.reports.filterByValueA,
    filterByB: state.reports.filterByB,
    filterByValueB: state.reports.filterByValueB,
    totalOverviewA: state.reports.totalOverviewA,
    totalOverviewB: state.reports.totalOverviewB
});

const mapDispatchToProps = dispatch => ({
    statsReportsTeamsRequest: (
        teamIdsA,
        teamIdsB,
        type,
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
