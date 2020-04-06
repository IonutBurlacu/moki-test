import React, { Component } from 'react';
import { connect } from 'react-redux';
import Steps from '../images/Steps.png';
import MVPA from '../images/MVPA.png';
import duration from '../utils/duration';
import gradeIcon from '../utils/gradeIcon';

export class SideDetails extends Component {
    render() {
        const gradeTextClass = `grade-text grade-text-${this.props.grade}`;
        return (
            <div
                className="side-details-container"
                style={this.props.extraStyle}
            >
                <p className="title">Player Daily Average</p>
                <img
                    src={gradeIcon(this.props.grade)}
                    alt=""
                    className="grade"
                />
                <p className={gradeTextClass}>Moki Grade</p>
                <div className="separator"></div>
                <div className="details-box">
                    <img src={Steps} alt="" className="steps" />
                    <div className="right-side">
                        <p className="top-text">
                            {this.props.daily_steps.toLocaleString()}
                        </p>
                        <p className="bottom-text">steps</p>
                    </div>
                </div>
                <div className="separator"></div>
                <div className="details-box">
                    <img src={MVPA} alt="" className="mvpa" />
                    <div className="right-side">
                        <p className="top-text">
                            {duration(this.props.mvpa_minutes)}
                        </p>
                        <p className="bottom-text">MVPA</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, null)(SideDetails);
