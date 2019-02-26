import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import Footer from '../Footer';
import { Header } from '../Header';
import { editTeamRequest } from '../../actions/teams';
import { showLoader } from '../../actions/loader';
import PageHeader from './TeamPage/PageHeader';
import TeamChart from './TeamPage/TeamChart';
import PlayersList from './TeamPage/PlayersList';
import ChallengesList from './TeamPage/ChallengesList';
import TopFilters from './TeamPage/TopFilters';

export class TeamPage extends Component {
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
                        this.props.team.locked ? (
                            ''
                        ) : (
                            <button
                                type="button"
                                onClick={() =>
                                    this.handleEdit(this.props.match.params.id)
                                }
                            >
                                Edit
                            </button>
                        )
                    }
                />
                {!this.props.loading ? (
                    <div className="content">
                        <PageHeader team={this.props.team} />
                        <TopFilters />
                        <div className="charts-container">
                            <TeamChart />
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
    challenges: state.teams.challenges
});

const mapDispatchToProps = dispatch => ({
    editTeamRequest: id => dispatch(editTeamRequest(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamPage);
