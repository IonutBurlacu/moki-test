import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    changePlayersChartType,
    openPlayersMenu,
    closePlayersMenu
} from '../../../actions/players';

export class ChartType extends Component {
    getSelectedChartType = type => {
        switch (type) {
            case 'steps':
                return 'Steps';
            default:
                return 'MVPA';
        }
    };

    handleTypeSelectMenu = () => {
        if (this.props.chartTypeSelectOpen) {
            this.props.closePlayersMenu('chartTypeSelectOpen');
        } else {
            this.props.openPlayersMenu('chartTypeSelectOpen');
        }
    };

    handleCloseTypeSelectMenu = () => {
        this.props.closePlayersMenu('chartTypeSelectOpen');
    };

    handleTypeSelectChange = type => {
        this.props.changePlayersChartType(type);
        this.props.closePlayersMenu('chartTypeSelectOpen');
    };

    render() {
        return (
            <div className="filter-wrapper">
                <button
                    type="button"
                    className={
                        this.props.chartTypeSelectOpen
                            ? 'filter-button filter-with-tick active'
                            : 'filter-button filter-with-tick'
                    }
                    onClick={this.handleTypeSelectMenu}
                >
                    {this.getSelectedChartType(this.props.chartType)}
                </button>
                <div
                    className="filter-select-list-wrapper"
                    style={{
                        display: this.props.chartTypeSelectOpen
                            ? 'block'
                            : 'none'
                    }}
                >
                    <div className="filter-select-list-header">
                        Select Type
                        <button
                            type="button"
                            onClick={this.handleCloseTypeSelectMenu}
                        >
                            ⨉
                        </button>
                    </div>
                    <ul className="filter-select-list">
                        <li
                            className={
                                this.props.chartType === 'steps'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleTypeSelectChange('steps')
                                }
                            >
                                Steps
                            </button>
                        </li>
                        <li
                            className={
                                this.props.chartType === 'mvpa'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleTypeSelectChange('mvpa')
                                }
                            >
                                MVPA
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    chartType: state.players.chartType,
    chartTypeSelectOpen: state.players.chartTypeSelectOpen
});

const mapDispatchToProps = dispatch => ({
    changePlayersChartType: chartType =>
        dispatch(changePlayersChartType(chartType)),
    openPlayersMenu: menu => dispatch(openPlayersMenu(menu)),
    closePlayersMenu: menu => dispatch(closePlayersMenu(menu))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartType);
