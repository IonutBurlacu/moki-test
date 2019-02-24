import React, { Component } from 'react';
import {
    BarChart,
    LineChart,
    Bar,
    Line,
    Cell,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { connect } from 'react-redux';
import moment from 'moment';

const COLORS = ['#fe335e', '#fc9cac', '#fee300', '#23dec8', '#74ef5c'];

export class TotalStepsChart extends Component {
    getDateLegend = () => {
        console.log(this.props.totalSteps);
        switch (this.props.totalSteps.chartType) {
            case 'today':
                return moment().format('D MMMM YYYY');
            case 'week':
                return `${moment(this.props.totalSteps.chartStartDate).format(
                    'D'
                )} - ${moment(this.props.totalSteps.chartEndDate).format(
                    'D MMMM YYYY'
                )}`;
            case 'month':
                return `${moment(this.props.totalSteps.chartStartDate).format(
                    'D'
                )} - ${moment(this.props.totalSteps.chartEndDate).format(
                    'D MMMM YYYY'
                )}`;
            case 'year':
                return `${moment(this.props.totalSteps.chartStartDate).format(
                    'MMM'
                )} - ${moment(this.props.totalSteps.chartEndDate).format(
                    'MMM YYYY'
                )}`;
            case 'interval':
                return `${moment(this.props.totalSteps.chartStartDate).format(
                    'D MMM YYYY'
                )} - ${moment(this.props.totalSteps.chartEndDate).format(
                    'D MMM YYYY'
                )}`;
            default:
                return moment().format('D MMMM YYYY');
        }
    };

    render() {
        return (
            <div className="chart-container">
                <div className="legend">
                    {this.props.totalSteps.teamId && this.props.teams.length ? (
                        <div>
                            <p className="team">
                                {
                                    this.props.teams.find(
                                        team =>
                                            team.id ===
                                            this.props.totalSteps.teamId
                                    ).name
                                }
                            </p>
                            <p className="date">{this.getDateLegend()}</p>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <div className="chart">
                    <ResponsiveContainer width="99%">
                        {this.props.totalSteps.chartType !== 'today' ? (
                            <BarChart
                                data={this.props.totalSteps.data.current}
                                barCategoryGap={5}
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
                                <XAxis dataKey="x_axis" stroke="#f6f6f7" />
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
                                <Tooltip cursor={false} />
                                <Bar
                                    dataKey="total_steps_overview"
                                    name="Total"
                                    fill="#fe335e"
                                    maxBarSize={70}
                                >
                                    {this.props.totalSteps.data.current.map(
                                        (entry, index) => {
                                            const color =
                                                entry.total_steps_overview > 1
                                                    ? COLORS[0]
                                                    : COLORS[1];
                                            return (
                                                <Cell
                                                    key={index}
                                                    fill={color}
                                                />
                                            );
                                        }
                                    )}
                                </Bar>
                                <Bar
                                    dataKey="total_steps_typical"
                                    name="Typical"
                                    fill="#868797"
                                    maxBarSize={20}
                                />
                            </BarChart>
                        ) : (
                            <LineChart
                                data={this.props.totalSteps.data.current}
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
                                <Line
                                    type="monotone"
                                    dataKey="total_steps_overview"
                                    name="Total"
                                    stroke="#23dec8"
                                    strokeWidth="2"
                                    dot={{
                                        stroke: '#23dec8',
                                        strokeWidth: 5
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="total_steps_typical"
                                    name="Typical"
                                    stroke="#868797"
                                    strokeWidth="2"
                                    dot={{
                                        stroke: '#868797',
                                        strokeWidth: 5
                                    }}
                                />
                            </LineChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    teams: state.reports.teams,
    totalSteps: state.reports.totalSteps
});

export default connect(
    mapStateToProps,
    null
)(TotalStepsChart);
