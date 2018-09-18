import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import Loader from '../Loader';
import {
    getChallengesRequest,
    viewChallengeRequest
} from '../../actions/challenges';
import { showLoader } from '../../actions/loader';
import defaultAvatar from '../../images/default_avatar.png';
import teamsIcon from '../../images/teams_icon.png';
import playersIconWide from '../../images/players_icon_wide.png';
import TopFilters from './ChallengesPage/TopFilters';
import getFilteredChallenges from '../../selectors/challenges';

export class ChallengesPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getChallengesRequest(this.props.listDate);
    }

    handleView = id => {
        this.props.viewChallengeRequest(id);
        this.props.showLoader();
        this.props.history.push(`/challenges/view/${id}`);
    };

    render() {
        const { challenges, loading } = this.props;
        return (
            <div className="container container-with-title">
                <Header
                    leftButton={<Link to="/bands/pair">Pair Bands</Link>}
                    rightButton={<Link to="/challenges/add">Add</Link>}
                />
                {!loading ? (
                    <div className="content">
                        <PageTitle title="Challenges" />
                        <TopFilters />
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>
                                    {challenges.map(challenge => (
                                        <tr
                                            onClick={() =>
                                                this.handleView(challenge.id)
                                            }
                                            key={challenge.id}
                                        >
                                            <td>
                                                <img
                                                    src={defaultAvatar}
                                                    className="avatar"
                                                    alt="avatar"
                                                />
                                            </td>
                                            <td>
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
                                            <td className="align-right">
                                                {challenge.type === 'player' ? (
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
                                                            {challenge.players_count >
                                                            1
                                                                ? 's'
                                                                : ''}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <img
                                                            src={teamsIcon}
                                                            className="icon"
                                                            alt="icon"
                                                        />
                                                        <span className="icon-label">
                                                            {challenge.teams
                                                                .reduce(
                                                                    (
                                                                        string,
                                                                        item
                                                                    ) =>
                                                                        `${string +
                                                                            item.name}, `,
                                                                    ''
                                                                )
                                                                .slice(0, -2)}
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                            <td
                                                className={
                                                    challenge.percentage < 0
                                                        ? 'negative align-right'
                                                        : 'positive align-right'
                                                }
                                            >
                                                <span className="percentage-icon" />
                                                <span className="percentage">
                                                    {Math.abs(
                                                        challenge.percentage
                                                    ).toFixed(2)}
                                                    %
                                                </span>
                                            </td>
                                            <td className="align-right">
                                                <h1 className="title">
                                                    {challenge.current_steps}
                                                    <small>steps</small>
                                                </h1>
                                            </td>
                                        </tr>
                                    ))}
                                    {challenges.length === 0 ? (
                                        <tr className="no-items-row">
                                            <td>
                                                <span>
                                                    There are no challenges yet.
                                                </span>
                                            </td>
                                        </tr>
                                    ) : (
                                        ''
                                    )}
                                </tbody>
                            </table>
                        </div>
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
    challenges: getFilteredChallenges(state.challenges.items, {
        filterBy: state.challenges.listFilter,
        filterByValue: state.challenges.listFilterValue,
        sortBy: state.challenges.listSort
    }),
    loading: state.challenges.loading,
    listDate: state.challenges.listDate
});

const mapDispatchToProps = dispatch => ({
    getChallengesRequest: listDate => dispatch(getChallengesRequest(listDate)),
    viewChallengeRequest: id => dispatch(viewChallengeRequest(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChallengesPage);
