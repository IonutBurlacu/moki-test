import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../Footer';
import EditPlayerForm from './EditPlayerPage/EditPlayerForm';
import TeamsList from './EditPlayerPage/TeamsList';
import ChallengesList from './EditPlayerPage/ChallengesList';
import Alert from '../Alert';
import { deletePlayerRequest } from '../../actions/players';
import { showLoader } from '../../actions/loader';

export class EditPlayerPage extends Component {
    handleDelete = () => {
        this.props.showLoader();
        this.props.deletePlayerRequest(this.props.match.params.id);
    };

    render() {
        return (
            <div className="container">
                {!this.props.loading ? (
                    <div className="content">
                        <EditPlayerForm id={this.props.match.params.id} />
                        <div className="two-sides">
                            <div className="side">
                                <TeamsList
                                    items={this.props.player.teams}
                                    teams={this.props.teams}
                                    id={this.props.match.params.id}
                                />
                            </div>
                            <div className="side">
                                <ChallengesList
                                    items={this.props.player.challenges}
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
    loading: state.players.loading,
    player: state.players.player,
    teams: state.players.teams,
    challenges: state.players.challenges
});

const mapDispatchToProps = dispatch => ({
    deletePlayerRequest: id => dispatch(deletePlayerRequest(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPlayerPage);
