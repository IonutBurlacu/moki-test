import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import {
    getChallengesRequest,
    viewChallengeRequest
} from '../../actions/challenges';
import { viewTeamRequest } from '../../actions/teams';
import { showLoader } from '../../actions/loader';
import defaultAvatar from '../../images/default_avatar.png';
import teamsIconWide from '../../images/teams_icon_wide.png';
import playersIconWide from '../../images/players_icon_wide.png';
import TopFilters from './ChallengesPage/TopFilters';
import getFilteredChallenges from '../../selectors/challenges';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class ChallengesPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getChallengesRequest(this.props.dateByType);
    }

    handleView = id => {
        this.props.viewChallengeRequest(id);
        this.props.showLoader();
        this.props.history.push(`/challenges/view/${id}`);
    };

    handleTeamView = id => {
        this.props.viewTeamRequest(id);
        this.props.showLoader();
        this.props.history.push(`/teams/view/${id}`);
    };

    render() {
        const { challenges, loading } = this.props;
        return (
            <div className="container container-with-title">
                <Header
                    leftButton={<Link to="/bands/pair">Pair Bands</Link>}
                    rightButton={<Link to="/challenges/add">Add</Link>}
                />
                <PageTitle title="Challenges" />
                <TopFilters />
                {!loading ? (
                    <div className="content">
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>
                                    {challenges.map(challenge => {
                                        const imageSource = challenge.avatar
                                            ? `${s3URL}${challenge.avatar}`
                                            : defaultAvatar;
                                        return (
                                            <tr key={challenge.id}>
                                                <td>
                                                    <div
                                                        className="avatar"
                                                        style={{
                                                            backgroundImage: `url('${imageSource}')`
                                                        }}
                                                    />
                                                </td>
                                                <td
                                                    onClick={() =>
                                                        this.handleView(
                                                            challenge.id
                                                        )
                                                    }
                                                >
                                                    <h1 className="title">
                                                        {challenge.name}
                                                    </h1>
                                                    <span className="subtitle">
                                                        Last Sync:{' '}
                                                        {challenge.last_sync_at ===
                                                        null
                                                            ? 'Never'
                                                            : moment
                                                                  .utc(
                                                                      challenge.last_sync_at
                                                                  )
                                                                  .local()
                                                                  .format(
                                                                      'DD/MM/YYYY \\at HH.mma'
                                                                  )}
                                                    </span>
                                                </td>
                                                <td>
                                                    {challenge.type ===
                                                    'player' ? (
                                                        <div>
                                                            <img
                                                                src={
                                                                    playersIconWide
                                                                }
                                                                className="icon"
                                                                alt="icon"
                                                            />
                                                            <span className="icon-label">
                                                                {`${
                                                                    challenge.players_count
                                                                } Player`}
                                                                {challenge.players_count !==
                                                                0
                                                                    ? 's'
                                                                    : ''}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <img
                                                                src={
                                                                    teamsIconWide
                                                                }
                                                                className="icon"
                                                                alt="icon"
                                                            />
                                                            <span className="icon-label">
                                                                {challenge.teams.map(
                                                                    item => (
                                                                        <span
                                                                            key={
                                                                                item.id
                                                                            }
                                                                            onClick={() =>
                                                                                this.handleTeamView(
                                                                                    item.id
                                                                                )
                                                                            }
                                                                            className="table-link"
                                                                        >
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                            </span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="align-right">
                                                    {challenge.completed > 0 ? (
                                                        <h1 className="title complete">
                                                            Complete!
                                                        </h1>
                                                    ) : (
                                                        <h1 className="title">
                                                            {challenge.target_steps.toLocaleString()}
                                                            <small>steps</small>
                                                        </h1>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {challenges.length === 0 ? (
                                        <tr className="no-items-row">
                                            <td>
                                                <span>
                                                    There are no challenges yet.
                                                </span>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr />
                                    )}
                                </tbody>
                            </table>
                        </div>
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
    challenges: getFilteredChallenges(state.challenges.items, {
        filterByValues: state.challenges.listFilterValues,
        sortBy: state.challenges.listSort
    }),
    loading: state.challenges.loading,
    dateByType: state.challenges.dateByType
});

const mapDispatchToProps = dispatch => ({
    getChallengesRequest: dateByType =>
        dispatch(getChallengesRequest(dateByType)),
    viewChallengeRequest: id => dispatch(viewChallengeRequest(id)),
    viewTeamRequest: id => dispatch(viewTeamRequest(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChallengesPage);
