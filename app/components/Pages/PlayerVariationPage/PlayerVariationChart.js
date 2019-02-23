import React, { Component } from 'react';
import {
    BarChart,
    Bar,
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

export class PlayerVariationChart extends Component {
    getDateLegend = () => {
        switch (this.props.playerVariation.chartType) {
            case 'today':
                return moment().format('D MMMM YYYY');
            case 'week':
                return `${moment(
                    this.props.playerVariation.chartStartDate
                ).format('D')} - ${moment(
                    this.props.playerVariation.chartEndDate
                ).format('D MMMM YYYY')}`;
            case 'month':
                return `${moment(
                    this.props.playerVariation.chartStartDate
                ).format('D')} - ${moment(
                    this.props.playerVariation.chartEndDate
                ).format('D MMMM YYYY')}`;
            case 'year':
                return `${moment(
                    this.props.playerVariation.chartStartDate
                ).format('MMM')} - ${moment(
                    this.props.playerVariation.chartEndDate
                ).format('MMM YYYY')}`;
            case 'interval':
                return `${moment(
                    this.props.playerVariation.chartStartDate
                ).format('D MMM YYYY')} - ${moment(
                    this.props.playerVariation.chartEndDate
                ).format('D MMM YYYY')}`;
            default:
                return moment().format('D MMMM YYYY');
        }
    };

    render() {
        return (
            <div className="chart-container">
                <div className="legend">
                    {this.props.playerVariation.teamId ? (
                        <div>
                            <p className="team">
                                {
                                    this.props.teams.find(
                                        team =>
                                            team.id ===
                                            this.props.playerVariation.teamId
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
                        <BarChart
                            data={this.props.playerVariation.data}
                            barCategoryGap={5}
                            margin={{
                                top: 10,
                                right: 15,
                                left: 10,
                                bottom: 10
                            }}
                        >
                            <CartesianGrid stroke="#53535d" vertical={false} />
                            <XAxis
                                dataKey="player_name"
                                stroke="#f6f6f7"
                                hide
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
                                        return `${(number / 1000).toString()}K`;
                                    }
                                    return number.toString();
                                }}
                            />
                            <Tooltip cursor={false} />
                            <Bar
                                dataKey="total_steps"
                                name="Total Steps"
                                fill="#fe335e"
                                maxBarSize={70}
                            >
                                {this.props.playerVariation.data.map(
                                    (entry, index) => {
                                        const color =
                                            entry.total_steps > 1
                                                ? COLORS[0]
                                                : COLORS[1];
                                        return (
                                            <Cell key={index} fill={color} />
                                        );
                                    }
                                )}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    teams: state.reports.teams,
    playerVariation: state.reports.playerVariation
});

export default connect(
    mapStateToProps,
    null
)(PlayerVariationChart);