import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../Footer';
import Loader from '../Loader';
import EditTeamForm from './EditTeamPage/EditTeamForm';
import PlayersList from './EditTeamPage/PlayersList';
import ChallengesList from './EditTeamPage/ChallengesList';
import Alert from '../Alert';

export class EditTeamPage extends Component {
    render() {
        return (
            <div className="container">
                {!this.props.loading ? (
                    <div className="content">
                        <EditTeamForm id={this.props.match.params.id} />
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
                <Alert />
                <Loader />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    team: state.teams.team,
    players: state.teams.players,
    challenges: state.teams.challenges,
    loading: state.teams.loading
});

export default connect(mapStateToProps)(EditTeamPage);
