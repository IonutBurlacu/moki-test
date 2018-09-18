import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import Loader from '../Loader';
import { getTeamsRequest, viewTeamRequest } from '../../actions/teams';
import { showLoader } from '../../actions/loader';
import getFilteredTeams from '../../selectors/teams';
import defaultAvatar from '../../images/default_avatar.png';
import challengesIcon from '../../images/challenges_icon.png';
import playersIconWide from '../../images/players_icon_wide.png';
import TopFilters from './TeamsPage/TopFilters';

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

    render() {
        const { teams, loading } = this.props;
        console.log(teams);
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
                                        <tr
                                            onClick={() =>
                                                this.handleView(team.id)
                                            }
                                            key={team.id}
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
                                                        src={challengesIcon}
                                                        className="icon"
                                                        alt="icon"
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                                <span className="icon-label">
                                                    {team.challenges
                                                        .reduce(
                                                            (string, item) =>
                                                                `${string +
                                                                    item.name}, `,
                                                            ''
                                                        )
                                                        .slice(0, -2)}
                                                </span>
                                            </td>
                                            <td className="align-right">
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
                                                    team.percentage < 0
                                                        ? 'negative align-right'
                                                        : 'positive align-right'
                                                }
                                            >
                                                <span className="percentage-icon" />
                                                <span className="percentage">
                                                    {Math.abs(
                                                        team.percentage
                                                    ).toFixed(2)}
                                                    %
                                                </span>
                                            </td>
                                            <td className="align-right">
                                                <h1 className="title">
                                                    {team.current_steps}
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
    teams: getFilteredTeams(state.teams.items, {
        filterBy: state.teams.listFilter,
        filterByValue: state.teams.listFilterValue,
        sortBy: state.teams.listSort
    }),
    listDate: state.teams.listDate,
    loading: state.teams.loading
});

const mapDispatchToProps = dispatch => ({
    getTeamsRequest: listDate => dispatch(getTeamsRequest(listDate)),
    viewTeamRequest: id => dispatch(viewTeamRequest(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamsPage);
