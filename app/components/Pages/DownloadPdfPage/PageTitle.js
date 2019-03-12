import React, { Component } from 'react';

export default class PageTitle extends Component {
    render() {
        return (
            <div className="reports-page-title">
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}
