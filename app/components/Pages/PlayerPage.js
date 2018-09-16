import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    LineChart,
    Line,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import Link from 'react-router-dom/Link';
import Footer from '../Footer';
import { Header } from '../Header';
import Loader from '../Loader';
import { editPlayerRequest } from '../../actions/players';
import { showLoader } from '../../actions/loader';
import PageHeader from './PlayerPage/PageHeader';

export class PlayerPage extends Component {
    handleEdit = id => {
        this.props.showLoader();
        this.props.editPlayerRequest(id);
        this.props.history.push(`/players/edit/${id}`);
    };

    render() {
        const data = [
            { name: 0, steps: 0 },
            { name: 1, steps: 20 },
            { name: 2, steps: 230 },
            { name: 3, steps: 40 },
            { name: 4, steps: 150 },
            { name: 5, steps: 60 },
            { name: 6, steps: 240 },
            { name: 7, steps: 150 },
            { name: 8, steps: 30 },
            { name: 9, steps: 20 }
        ];
        return (
            <div className="container">
                <Header
                    leftButton={<Link to="/bands/pair">Pair Bands</Link>}
                    rightButton={
                        <button
                            type="button"
                            onClick={() =>
                                this.handleEdit(this.props.match.params.id)
                            }
                        >
                            Edit
                        </button>
                    }
                />
                {!this.props.loading ? (
                    <div className="content">
                        <PageHeader player={this.props.player} />
                        <div className="charts-container">
                            <div className="chart-container">
                                <div className="chart-header">
                                    <h1>Overview</h1>
                                    <div className="chart-select-wrapper">
                                        <div className="chart-select">
                                            <button
                                                type="button"
                                                className="chart-select-button"
                                            >
                                                Today
                                            </button>
                                            <div className="chart-select-list-wrapper">
                                                <div className="chart-select-list-header">
                                                    Select Date
                                                    <button type="button">
                                                        ⨉
                                                    </button>
                                                </div>
                                                <ul className="chart-select-list">
                                                    <li>Today</li>
                                                    <li>This Week</li>
                                                    <li>This Month</li>
                                                    <li>This Year</li>
                                                    <li>All Time</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="chart">
                                    <ResponsiveContainer width="99%">
                                        <LineChart
                                            data={this.props.player.overview}
                                            margin={{
                                                top: 10,
                                                right: 10,
                                                left: 10,
                                                bottom: 10
                                            }}
                                        >
                                            <CartesianGrid
                                                stroke="#53535d"
                                                vertical={false}
                                            />
                                            <XAxis
                                                dataKey="day_name"
                                                stroke="#f6f6f7"
                                                interval={0}
                                            />
                                            <YAxis stroke="#f6f6f7" />
                                            <Tooltip />
                                            <Line
                                                type="monotone"
                                                dataKey="total_steps"
                                                name="Steps"
                                                stroke="#fe335e"
                                                strokeWidth="2"
                                                dot={{
                                                    stroke: '#fe335e',
                                                    strokeWidth: 5
                                                }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="chart-container">
                                <div className="chart-header">
                                    <h1>Typical</h1>
                                    <div className="chart-select-wrapper">
                                        <div className="chart-select">
                                            <button
                                                type="button"
                                                className="chart-select-button"
                                            >
                                                Today
                                            </button>
                                            <div className="chart-select-list-wrapper">
                                                <div className="chart-select-list-header">
                                                    Select Date
                                                    <button type="button">
                                                        ⨉
                                                    </button>
                                                </div>
                                                <ul className="chart-select-list">
                                                    <li>Today</li>
                                                    <li>This Week</li>
                                                    <li>This Month</li>
                                                    <li>This Year</li>
                                                    <li>All Time</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="chart">
                                    <ResponsiveContainer width="99%">
                                        <LineChart
                                            data={this.props.player.typical}
                                            margin={{
                                                top: 10,
                                                right: 10,
                                                left: 10,
                                                bottom: 10
                                            }}
                                        >
                                            <CartesianGrid
                                                stroke="#53535d"
                                                vertical={false}
                                            />
                                            <XAxis
                                                dataKey="day_name"
                                                stroke="#f6f6f7"
                                                interval={0}
                                            />
                                            <YAxis stroke="#f6f6f7" />
                                            <Tooltip />
                                            <Line
                                                type="monotone"
                                                dataKey="total_steps"
                                                name="Steps"
                                                stroke="#27fdd5"
                                                strokeWidth="2"
                                                dot={{
                                                    stroke: '#27fdd5',
                                                    strokeWidth: 5
                                                }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="content" />
                )}
                <Loader />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    player: state.players.player,
    loading: state.players.loading
});

const mapDispatchToProps = dispatch => ({
    editPlayerRequest: id => dispatch(editPlayerRequest(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerPage);
