import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shell } from 'electron';

export class ChartScale extends Component {
    handleScaleClick = () => {
        shell.openExternal('https://www.moki.technology/scale');
    };

    render() {
        const COLORS = ['#fe335e', '#fc9cac', '#fee300', '#23dec8', '#74ef5c'];
        const LABELS = [
            'Highest',
            'Above Average',
            'Average',
            'Below Average',
            'Lowest'
        ];
        return (
            <div className="chart-scale-container">
                <div className="chart-scale">
                    <div className="chart-scale-header">
                        <p>Moki Scale</p>
                        <span
                            className="tooltip"
                            onClick={this.handleScaleClick}
                        >
                            ?
                        </span>
                    </div>
                    <div className="chart-scale-body">
                        {COLORS.reverse().map((color, index) => (
                            <div key={index} className="chart-scale-item">
                                <div
                                    className="chart-scale-color"
                                    style={{ background: color }}
                                />
                                <span className="chart-scale-label">
                                    {LABELS[index]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    null
)(ChartScale);
