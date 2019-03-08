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

export class GroupAveragesChart extends Component {
    getDateLegend = () => {
        switch (this.props.groupAverages.chartType) {
            case 'today':
                return moment().format('D MMMM YYYY');
            case 'week':
                return `${moment(
                    this.props.groupAverages.chartStartDate
                ).format('D')} - ${moment(
                    this.props.groupAverages.chartEndDate
                ).format('D MMMM YYYY')}`;
            case 'month':
                return `${moment(
                    this.props.groupAverages.chartStartDate
                ).format('D')} - ${moment(
                    this.props.groupAverages.chartEndDate
                ).format('D MMMM YYYY')}`;
            case 'year':
                return `${moment(
                    this.props.groupAverages.chartStartDate
                ).format('MMM')} - ${moment(
                    this.props.groupAverages.chartEndDate
                ).format('MMM YYYY')}`;
            case 'interval':
                return `${moment(
                    this.props.groupAverages.chartStartDate
                ).format('D MMM YYYY')} - ${moment(
                    this.props.groupAverages.chartEndDate
                ).format('D MMM YYYY')}`;
            default:
                return moment().format('D MMMM YYYY');
        }
    };

    render() {
        return (
            <div className="chart-container">
                <div className="legend">
                    {this.props.groupAverages.teamId &&
                    this.props.teams.length ? (
                        <div>
                            <p className="team">
                                {
                                    this.props.teams.find(
                                        team =>
                                            team.id ===
                                            this.props.groupAverages.teamId
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
                            data={this.props.groupAverages.data}
                            barCategoryGap={5}
                            margin={{
                                top: 10,
                                right: 15,
                                left: 10,
                                bottom: 10
                            }}
                        >
                            <CartesianGrid stroke="#53535d" vertical={false} />
                            <XAxis dataKey="tag_name" stroke="#f6f6f7" />
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
                                dataKey="avg_steps"
                                name="Total Steps"
                                maxBarSize={70}
                            >
                                {this.props.groupAverages.data.map(
                                    (entry, index) => {
                                        let color;
                                        console.log(entry);
                                        if (
                                            entry.avg_steps <
                                            this.props.scales.first_step *
                                                entry.count_players
                                        ) {
                                            color = COLORS[0];
                                        } else if (
                                            entry.avg_steps <
                                            this.props.scales.second_step *
                                                entry.count_players
                                        ) {
                                            color = COLORS[1];
                                        } else if (
                                            entry.avg_steps <
                                            this.props.scales.third_step *
                                                entry.count_players
                                        ) {
                                            color = COLORS[2];
                                        } else if (
                                            entry.avg_steps <
                                            this.props.scales.fourth_step *
                                                entry.count_players
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
    groupAverages: state.reports.groupAverages,
    scales: state.reports.scales
});

export default connect(
    mapStateToProps,
    null
)(GroupAveragesChart);
