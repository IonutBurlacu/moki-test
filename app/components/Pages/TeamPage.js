import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import Footer from '../Footer';
import { Header } from '../Header';
import { viewTeamRequest, editTeamRequest } from '../../actions/teams';
import { showLoader } from '../../actions/loader';
import PageHeader from './TeamPage/PageHeader';
import TeamChart from './TeamPage/TeamChart';
import PlayersList from './TeamPage/PlayersList';
import ChallengesList from './TeamPage/ChallengesList';
import TopFilters from './TeamPage/TopFilters';
import SideDetails from '../SideDetails';

export class TeamPage extends Component {
    componentWillMount() {
        this.props.viewTeamRequest(
            this.props.match.params.id,
            this.props.dateByType,
            this.props.dateByStartDate,
            this.props.dateByEndDate
        );
        this.props.showLoader();
    }

    handleEdit = id => {
        this.props.showLoader();
        this.props.editTeamRequest(id);
        this.props.history.push(`/teams/edit/${id}`);
    };

    render() {
        return (
            <div className="container">
                <Header
                    leftButton={<Link to="/bands/pair">Pair Bands</Link>}
                    rightButton={
                        <button
                            type="button"
                            onClick={() =>
                                this.handleEdit(this.props.match.params.id)
                            }
                        >
                            Edit
                        </button>
                    }
                />
                {!this.props.loading ? (
                    <div className="content">
                        <PageHeader team={this.props.team} />
                        <TopFilters />
                        <div className="charts-container chart-with-scale">
                            <TeamChart />
                            <SideDetails
                                daily_steps={
                                    this.props.team.average.daily_steps
                                }
                                mvpa_minutes={
                                    this.props.team.average.mvpa_minutes
                                }
                                grade={this.props.team.average.grade}
                            />
                        </div>
                        <div className="two-sides">
                            <div className="side">
                                <PlayersList
                                    items={this.props.team.players}
                                    players={this.props.players}
                                    id={this.props.match.params.id}
                                />
                            </div>
                            <div className="side">
                                <ChallengesList
                                    items={this.props.team.challenges}
                                    challenges={this.props.challenges}
                                    id={this.props.match.params.id}
                                />
                            </div>
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
    team: state.teams.team,
    loading: state.teams.loading,
    players: state.teams.players,
    challenges: state.teams.challenges,
    dateByType: state.teams.dateByType,
    dateByStartDate: state.teams.dateByStartDate,
    dateByEndDate: state.teams.dateByEndDate
});

const mapDispatchToProps = dispatch => ({
    editTeamRequest: id => dispatch(editTeamRequest(id)),
    viewTeamRequest: (id, dateByType, dateByStartDate, dateByEndDate) =>
        dispatch(
            viewTeamRequest(id, dateByType, dateByStartDate, dateByEndDate)
        ),
    showLoader: () => dispatch(showLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);
