import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../Footer';
import EditTeamForm from './EditTeamPage/EditTeamForm';
import PlayersList from './EditTeamPage/PlayersList';
import ChallengesList from './EditTeamPage/ChallengesList';
import Alert from '../Alert';
import { deleteTeamRequest } from '../../actions/teams';
import { showLoader } from '../../actions/loader';
import { showConfirm, hideConfirm } from '../../actions/confirm';

export class EditTeamPage extends Component {
    handleDelete = () => {
        this.props.showConfirm(
            'Are you sure you want to delete this Team?',
            () => {
                this.props.showLoader();
                this.props.hideConfirm();
                this.props.deleteTeamRequest(this.props.match.params.id);
            }
        );
    };

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
    team: state.teams.team,
    players: state.teams.players,
    challenges: state.teams.challenges,
    loading: state.teams.loading
});

const mapDispatchToProps = dispatch => ({
    deleteTeamRequest: id => dispatch(deleteTeamRequest(id)),
    showLoader: () => dispatch(showLoader()),
    hideConfirm: () => dispatch(hideConfirm()),
    showConfirm: (message, doConfirm) =>
        dispatch(showConfirm(message, doConfirm))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTeamPage);
