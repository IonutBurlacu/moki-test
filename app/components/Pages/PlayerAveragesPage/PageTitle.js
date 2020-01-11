import React, { Component } from 'react';
import TeamsFilter from './TeamsFilter';

export default class PageTitle extends Component {
    render() {
        return (
            <div className="reports-page-title">
                <div className="left-side">
                    <TeamsFilter />
                </div>
                <div className="center-side">
                    <h1>{this.props.title}</h1>
                </div>
                <div className="right-side"></div>
            </div>
        );
    }
}
