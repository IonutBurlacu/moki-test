import React, { Component } from 'react';
import { connect } from 'react-redux';
import A_grade from '../images/A.png';
import B_grade from '../images/B.png';
import C_grade from '../images/C.png';
import D_grade from '../images/D.png';
import E_grade from '../images/E.png';
import Steps from '../images/Steps.png';
import MVPA from '../images/MVPA.png';

export class SideDetails extends Component {
    render() {
        return (
            <div className="side-details-container">
                <p className="title">Player Daily Average</p>
                <img src={A_grade} alt="" className="grade" />
                <p className="grade-text grade-text-A">Moki Grade</p>
                <div className="separator"></div>
                <div className="details-box">
                    <img src={Steps} alt="" className="steps" />
                    <div className="right-side">
                        <p className="top-text">2,321</p>
                        <p className="bottom-text">steps</p>
                    </div>
                </div>
                <div className="separator"></div>
                <div className="details-box">
                    <img src={MVPA} alt="" className="mvpa" />
                    <div className="right-side">
                        <p className="top-text">16m</p>
                        <p className="bottom-text">MVPA</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, null)(SideDetails);
