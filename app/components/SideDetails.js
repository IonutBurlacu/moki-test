import React, { Component } from 'react';
import { connect } from 'react-redux';
import A_grade from '../images/A.png';
import B_grade from '../images/B.png';
import C_grade from '../images/C.png';
import D_grade from '../images/D.png';
import E_grade from '../images/E.png';
import Steps from '../images/Steps.png';
import MVPA from '../images/MVPA.png';
import duration from '../utils/duration';

export class SideDetails extends Component {
    render() {
        const grades = {
            A: A_grade,
            B: B_grade,
            C: C_grade,
            D: D_grade,
            E: E_grade
        };
        const gradeImage = grades[this.props.grade];
        const gradeTextClass = `grade-text grade-text-${this.props.grade}`;
        return (
            <div className="side-details-container">
                <p className="title">Player Daily Average</p>
                <img src={gradeImage} alt="" className="grade" />
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
