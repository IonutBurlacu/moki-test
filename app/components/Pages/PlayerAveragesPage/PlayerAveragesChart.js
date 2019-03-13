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

export class PlayerAveragesChart extends Component {
    getDateLegend = () => {
        switch (this.props.playerAverages.dateByType) {
            case 'today':
                return moment().format('D MMMM YYYY');
            case 'week':
                return `${moment(
                    this.props.playerAverages.dateByStartDate
                ).format('D')} - ${moment(
                    this.props.playerAverages.dateByEndDate
                ).format('D MMMM YYYY')}`;
            case 'month':
                return `${moment(
                    this.props.playerAverages.dateByStartDate
                ).format('D')} - ${moment(
                    this.props.playerAverages.dateByEndDate
                ).format('D MMMM YYYY')}`;
            case 'year':
                return `${moment(
                    this.props.playerAverages.dateByStartDate
                ).format('MMM')} - ${moment(
                    this.props.playerAverages.dateByEndDate
                ).format('MMM YYYY')}`;
            case 'interval':
                return `${moment(
                    this.props.playerAverages.dateByStartDate
                ).format('D MMM YYYY')} - ${moment(
                    this.props.playerAverages.dateByEndDate
                ).format('D MMM YYYY')}`;
            default:
                return moment().format('D MMMM YYYY');
        }
    };

    render() {
        return (
            <div className="chart-container">
                <div className="legend">
                    {this.props.playerAverages.teamId &&
                    this.props.teams.length ? (
                        <div>
                            <p className="team">
                                {
                                    this.props.teams.find(
                                        team =>
                                            team.id ===
                                            this.props.playerAverages.teamId
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
                            data={this.props.playerAverages.data}
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
                            <Tooltip cursor={false} formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                            <Bar
                                dataKey="avg_steps"
                                name="Average Day"
                                maxBarSize={70}
                            >
                                {this.props.playerAverages.data.map(
                                    (entry, index) => {
                                        let color;
                                        if (
                                            entry.avg_steps <
                                            this.props.scales.first_step
                                        ) {
                                            color = COLORS[0];
                                        } else if (
                                            entry.avg_steps <
                                            this.props.scales.second_step
                                        ) {
                                            color = COLORS[1];
                                        } else if (
                                            entry.avg_steps <
                                            this.props.scales.third_step
                                        ) {
                                            color = COLORS[2];
                                        } else if (
                                            entry.avg_steps <
                                            this.props.scales.fourth_step
                                        ) {
                                            color = COLORS[3];
                                        } else {
                                            color = COLORS[4];
                                        }
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
    playerAverages: state.reports.playerAverages,
    scales: state.reports.scales
});

export default connect(
    mapStateToProps,
    null
)(PlayerAveragesChart);
