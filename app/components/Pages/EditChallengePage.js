import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../Footer';
import EditChallengeForm from './EditChallengePage/EditChallengeForm';
import TeamsList from './EditChallengePage/TeamsList';
import PlayersList from './EditChallengePage/PlayersList';
import { deleteChallengeRequest } from '../../actions/challenges';
import { showLoader } from '../../actions/loader';
import { showConfirm, hideConfirm } from '../../actions/confirm';

export class EditChallengePage extends Component {
    handleDelete = () => {
        this.props.showConfirm(
            'Are you sure you want to delete this Challenge?',
            () => {
                this.props.showLoader();
                this.props.hideConfirm();
                this.props.deleteChallengeRequest(this.props.match.params.id);
            }
        );
    };

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
                        <div className="delete-wrapper">
                            <button
                                type="button"
                                className="delete-button"
                                onClick={() => this.handleDelete()}
                            >
                                Delete
                            </button>
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
    loading: state.challenges.loading,
    challenge: state.challenges.challenge,
    teams: state.challenges.teams,
    players: state.challenges.players
});

const mapDispatchToProps = dispatch => ({
    deleteChallengeRequest: id => dispatch(deleteChallengeRequest(id)),
    showLoader: () => dispatch(showLoader()),
    hideConfirm: () => dispatch(hideConfirm()),
    showConfirm: (message, doConfirm) =>
        dispatch(showConfirm(message, doConfirm))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditChallengePage);
