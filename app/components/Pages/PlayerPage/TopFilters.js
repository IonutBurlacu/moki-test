import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import host from '../../../constants/serverUrl';
import encrypt from '../../../utils/encrypt';
import { showLoader, hideLoader } from '../../../actions/loader';
import DateBy from './DateBy';

export class TopFilters extends Component {
    handleDownloadPDF = () => {
        const encrypted = encrypt({
            type: this.props.dateByType,
            start_date: this.props.dateByStartDate,
            end_date: this.props.dateByEndDate
        });
        this.props.showLoader();
        axios({
            url: `${host}/api/players/stats_pdf/${this.props.player.id}`,
            method: 'POST',
            responseType: 'blob',
            headers: {
                Authorization: this.props.token
            },
            data: {
                encrypted
            }
        })
            .then(response => {
                this.props.hideLoader();
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `MOKI_${this.props.player.first_name}_${
                        this.props.player.last_name
                    }_${this.props.dateByType}.pdf`
                );
                document.body.appendChild(link);
                link.click();
                return true;
            })
            .catch(error => {
                this.props.hideLoader();
                console.log(error);
            });
    };

    render() {
        return (
            <div className="top-filters">
                <div className="left-side" />
                <div className="center-side">
                    <DateBy />
                </div>
                <div className="right-side">
                    <div className="filter-wrapper">
                        <button
                            type="button"
                            className="filter-button"
                            onClick={this.handleDownloadPDF}
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    player: state.players.player,
    dateByType: state.players.dateByType,
    dateByStartDate: state.players.dateByStartDate,
    dateByEndDate: state.players.dateByEndDate
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopFilters);
