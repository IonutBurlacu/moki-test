import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import { getTeamsRequest, viewTeamRequest } from '../../actions/teams';
import { viewChallengeRequest } from '../../actions/challenges';
import { showLoader } from '../../actions/loader';
import getFilteredTeams from '../../selectors/teams';
import defaultAvatar from '../../images/default_avatar.png';
import challengesIconWide from '../../images/challenges_icon_wide.png';
import playersIconWide from '../../images/players_icon_wide.png';
import TopFilters from './TeamsPage/TopFilters';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class TeamsPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getTeamsRequest(this.props.listDate);
    }

    handleView = id => {
        this.props.viewTeamRequest(id);
        this.props.showLoader();
        this.props.history.push(`/teams/view/${id}`);
    };

    handleChallengeView = id => {
        this.props.viewChallengeRequest(id);
        this.props.showLoader();
        this.props.history.push(`/challenges/view/${id}`);
    };

    render() {
        const { teams, loading } = this.props;
        return (
            <div className="container container-with-title">
                <Header
                    leftButton={<Link to="/bands/pair">Pair Bands</Link>}
                    rightButton={<Link to="/teams/add">Add</Link>}
                />

                {!loading ? (
                    <div className="content">
                        <PageTitle title="Teams" />
                        <TopFilters />
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>
                                    {teams.map(team => (
                                        <tr key={team.id}>
                                            <td>
                                                <img
                                                    src={
                                                        team.avatar
                                                            ? `${s3URL}${
                                                                  team.avatar
                                                              }`
                                                            : defaultAvatar
                                                    }
                                                    className="avatar"
                                                    alt="avatar"
                                                />
                                            </td>
                                            <td
                                                onClick={() =>
                                                    this.handleView(team.id)
                                                }
                                            >
                                                <h1 className="title">
                                                    {team.name}
                                                </h1>
                                                <span className="subtitle">
                                                    Last Sync:{' '}
                                                    {team.last_sync_at === null
                                                        ? 'Never'
                                                        : moment
                                                              .utc(
                                                                  team.last_sync_at
                                                              )
                                                              .local()
                                                              .format(
                                                                  'DD/MM/YYYY \\at HH.mma'
                                                              )}
                                                </span>
                                            </td>
                                            <td>
                                                {team.challenges.length > 0 ? (
                                                    <img
                                                        src={challengesIconWide}
                                                        className="icon"
                                                        alt="icon"
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                                <span className="icon-label">
                                                    {team.challenges.map(
                                                        item => (
                                                            <span
                                                                key={item.id}
                                                                onClick={() =>
                                                                    this.handleChallengeView(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="table-link"
                                                            >
                                                                {item.name}
                                                            </span>
                                                        )
                                                    )}
                                                </span>
                                            </td>
                                            <td>
                                                <img
                                                    src={playersIconWide}
                                                    className="icon"
                                                    alt="icon"
                                                />{' '}
                                                <span className="icon-label">
                                                    {team.players_count} Player
                                                    {team.players_count !== 1
                                                        ? 's'
                                                        : ''}
                                                </span>
                                            </td>
                                            <td
                                                className={
                                                    team.current_steps <
                                                    team.previous_steps
                                                        ? 'negative align-right'
                                                        : 'positive align-right'
                                                }
                                            >
                                                <span className="percentage-icon" />
                                                <span className="percentage">
                                                    {team.percentage}%
                                                </span>
                                            </td>
                                            <td className="align-right">
                                                <h1 className="title">
                                                    {team.current_steps.toLocaleString()}
                                                    <small>steps</small>
                                                </h1>
                                            </td>
                                        </tr>
                                    ))}
                                    {teams.length === 0 ? (
                                        <tr className="no-items-row">
                                            <td>
                                                <span>
                                                    There are no teams yet.
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
    teams: getFilteredTeams(state.teams.items, {
        filterByValues: state.teams.listFilterValues,
        sortBy: state.teams.listSort
    }),
    listDate: state.teams.listDate,
    loading: state.teams.loading
});

const mapDispatchToProps = dispatch => ({
    getTeamsRequest: listDate => dispatch(getTeamsRequest(listDate)),
    viewTeamRequest: id => dispatch(viewTeamRequest(id)),
    viewChallengeRequest: id => dispatch(viewChallengeRequest(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamsPage);
