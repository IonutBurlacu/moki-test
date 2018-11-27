import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { Header } from '../Header';
import Footer from '../Footer';
import { viewPlayerRequest } from '../../actions/players';
import { showLoader } from '../../actions/loader';
import { PageTitle } from '../PageTitle';
import defaultAvatar from '../../images/default_avatar.png';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class SyncBandsPage extends Component {
    handleView = id => {
        this.props.viewPlayerRequest(id);
        this.props.showLoader();
        this.props.history.push(`/players/view/${id}`);
    };

    render() {
        return (
            <div className="container">
                <Header
                    leftButton={<Link to="/players">Back</Link>}
                    rightButton={<div />}
                />
                {!this.props.loading ? (
                    <div className="content">
                        <PageTitle title="Recording Steps" isGreen />
                        <ul className="syncs-wrapper">
                            {this.props.syncs.map((sync, key) => (
                                <li key={key} className="sync-body">
                                    <div className="top">
                                        <div className="left">
                                            <img
                                                src={
                                                    sync.avatar
                                                        ? `${s3URL}${
                                                              sync.avatar
                                                          }`
                                                        : defaultAvatar
                                                }
                                                className="avatar"
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className="right">
                                            <h1 className="title">
                                                <span
                                                    className="name"
                                                    onClick={() =>
                                                        this.handleView(sync.id)
                                                    }
                                                >{`${sync.first_name} `}</span>
                                                <span className="added">
                                                    added
                                                </span>
                                            </h1>
                                            <h3 className="subtitle">
                                                {this.props.hide_totals
                                                    ? '--- '
                                                    : `${parseInt(
                                                          sync.steps,
                                                          10
                                                      ).toLocaleString()} `}
                                                <span>steps</span>
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="separator" />
                                    {sync.steps === 0 ? (
                                        <ul className="challenges-list">
                                            <li>
                                                No steps found on this band.
                                            </li>
                                        </ul>
                                    ) : sync.challenges.length > 0 ? (
                                        <ul className="challenges-list">
                                            {sync.challenges.map(challenge => (
                                                <li
                                                    key={challenge.id}
                                                    className={
                                                        challenge.target_steps -
                                                            challenge.progress <=
                                                        0
                                                            ? 'finished'
                                                            : ''
                                                    }
                                                >
                                                    {challenge.target_steps -
                                                        challenge.progress <=
                                                    0 ? (
                                                        <span>
                                                            {challenge.name} -
                                                            Complete!
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            {`${
                                                                challenge.name
                                                            } - `}
                                                            {challenge.target_steps -
                                                                challenge.progress}{' '}
                                                            <small>steps</small>{' '}
                                                            to go
                                                        </span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <ul className="challenges-list">
                                            <li>
                                                Player doesn't have any
                                                challenges
                                            </li>
                                        </ul>
                                    )}
                                    {sync.batteryLevel <= 33 ? (
                                        <p className="battery-status">
                                            Band battery may need to be replaced
                                            soon
                                        </p>
                                    ) : (
                                        ''
                                    )}
                                    <div className="separator" />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="content" />
                )}
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    syncs: state.bands.syncs,
    loading: state.bands.loading,
    hide_totals: state.auth.hide_totals
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    viewPlayerRequest: id => dispatch(viewPlayerRequest(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SyncBandsPage);
