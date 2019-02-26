import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import Footer from '../Footer';
import { Header } from '../Header';
import { editPlayerRequest } from '../../actions/players';
import { showLoader } from '../../actions/loader';
import PageHeader from './PlayerPage/PageHeader';
import PlayerChart from './PlayerPage/PlayerChart';
import TeamsList from './PlayerPage/TeamsList';
import ChallengesList from './PlayerPage/ChallengesList';
import TopFilters from './PlayerPage/TopFilters';

export class PlayerPage extends Component {
    handleEdit = id => {
        this.props.showLoader();
        this.props.editPlayerRequest(id);
        this.props.history.push(`/players/edit/${id}`);
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
                        <PageHeader player={this.props.player} />
                        <TopFilters />
                        <div className="charts-container">
                            <PlayerChart />
                        </div>
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
    player: state.players.player,
    loading: state.players.loading,
    teams: state.players.teams,
    challenges: state.players.challenges
});

const mapDispatchToProps = dispatch => ({
    editPlayerRequest: id => dispatch(editPlayerRequest(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerPage);
