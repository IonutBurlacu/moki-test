import React, { Component } from 'react';
import { shell } from 'electron';

export default class SettingsHeader extends Component {
    handleHelpCentre = () => {
        shell.openExternal('https://moki.technology/pages/faq');
    };

    render() {
        return (
            <div className="reports-page-title reports-page-title-big">
                <h1>{this.props.title}</h1>
                <button type="button" onClick={this.handleHelpCentre}>
                    Help Centre
                </button>
            </div>
        );
    }
}
