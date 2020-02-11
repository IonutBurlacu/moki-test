import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import Footer from '../Footer';
import { Header } from '../Header';
import { viewPlayerRequest, editPlayerRequest } from '../../actions/players';
import { showLoader } from '../../actions/loader';
import PageHeader from './PlayerPage/PageHeader';
import PlayerChart from './PlayerPage/PlayerChart';
import TeamsList from './PlayerPage/TeamsList';
import ChallengesList from './PlayerPage/ChallengesList';
import TopFilters from './PlayerPage/TopFilters';
import SideDetails from '../SideDetails';

export class PlayerPage extends Component {
    componentWillMount() {
        this.props.viewPlayerRequest(
            this.props.match.params.id,
            this.props.dateByType,
            this.props.dateByStartDate,
            this.props.dateByEndDate
        );
        this.props.showLoader();
    }

    handleEdit = id => {
        this.props.showLoader();
        this.props.editPlayerRequest(id);
        this.props.history.push(`/players/edit/${id}`);
    };

    render() {
        return (
            <div className="container">
                <Header
                    leftButton={
                        <Link to={`/bands/pair/${this.props.player.id}`}>
                            Pair Bands
                        </Link>
                    }
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
                        <div className="charts-container chart-with-scale">
                            <PlayerChart />
                            <SideDetails
                                daily_steps={
                                    this.props.player.data.average.daily_steps
                                }
                                mvpa_minutes={
                                    this.props.player.data.average.mvpa_minutes
                                }
                                grade={this.props.player.data.average.grade}
                            />
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
    challenges: state.players.challenges,
    dateByType: state.players.dateByType,
    dateByStartDate: state.players.dateByStartDate,
    dateByEndDate: state.players.dateByEndDate
});

const mapDispatchToProps = dispatch => ({
    editPlayerRequest: id => dispatch(editPlayerRequest(id)),
    viewPlayerRequest: (id, dateByType, dateByStartDate, dateByEndDate) =>
        dispatch(
            viewPlayerRequest(id, dateByType, dateByStartDate, dateByEndDate)
        ),
    showLoader: () => dispatch(showLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
