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

export class TypicalChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateSelectOpen: false
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

    handleDateChange = type => {
        this.props.showLoader();
        this.setState({ dateSelectOpen: false });
        this.props.statsReportsTeamsRequest(
            this.props.teamIdsA,
            this.props.teamIdsB,
            type
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
                    <h1>Typical</h1>
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
                    {this.props.typical.length ? (
                        <ResponsiveContainer width="99%">
                            <LineChart
                                data={this.props.typical}
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
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    typical: state.reports.typical,
    teamIdsA: state.reports.teamIdsA,
    teamIdsB: state.reports.teamIdsB,
    chartType: state.reports.chartType
});

const mapDispatchToProps = dispatch => ({
    statsReportsTeamsRequest: (teamIdsA, teamIdsB, type) =>
        dispatch(statsReportsTeamsRequest(teamIdsA, teamIdsB, type)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TypicalChart);
