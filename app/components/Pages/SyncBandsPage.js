import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { list } from 'postcss';
import { Header } from '../Header';
import Footer from '../Footer';
import Loader from '../Loader';
import { PageTitle } from '../PageTitle';
import defaultAvatar from '../../images/default_avatar.png';

export class SyncBandsPage extends Component {
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
                                                src={defaultAvatar}
                                                className="avatar"
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className="right">
                                            <h1 className="title">
                                                {`${sync.first_name} `}
                                                <span>added</span>
                                            </h1>
                                            <h3 className="subtitle">
                                                {`${sync.steps} `}
                                                <span>steps</span>
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="separator" />
                                    {sync.challenges.length > 0 ? (
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

                                    <div className="separator" />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="content" />
                )}
                <Loader />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    syncs: state.bands.syncs,
    loading: state.bands.loading
});

export default connect(mapStateToProps)(SyncBandsPage);
