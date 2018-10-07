import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../Footer';
import EditChallengeForm from './EditChallengePage/EditChallengeForm';
import TeamsList from './EditChallengePage/TeamsList';
import PlayersList from './EditChallengePage/PlayersList';
import Alert from '../Alert';

export class EditChallengePage extends Component {
    render() {
        return (
            <div className="container">
                {!this.props.loading ? (
                    <div className="content">
                        <EditChallengeForm id={this.props.match.params.id} />
                        {this.props.challenge.type === 'player' ? (
                            <PlayersList
                                items={this.props.challenge.players}
                                players={this.props.players}
                                id={this.props.match.params.id}
                            />
                        ) : (
                            <TeamsList
                                items={this.props.challenge.teams}
                                teams={this.props.teams}
                                id={this.props.match.params.id}
                            />
                        )}
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
    loading: state.challenges.loading,
    challenge: state.challenges.challenge,
    teams: state.challenges.teams,
    players: state.challenges.players
});

export default connect(mapStateToProps)(EditChallengePage);
