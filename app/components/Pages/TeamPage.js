import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import Footer from '../Footer';
import { Header } from '../Header';
import Loader from '../Loader';
import { editTeamRequest } from '../../actions/teams';
import { showLoader } from '../../actions/loader';
import PageHeader from './TeamPage/PageHeader';
import OverviewChart from './TeamPage/OverviewChart';
import TypicalChart from './TeamPage/TypicalChart';

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
                        <div className="charts-container">
                            <OverviewChart />
                            <TypicalChart />
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
    team: state.teams.team,
    loading: state.teams.loading
});

const mapDispatchToProps = dispatch => ({
    editTeamRequest: id => dispatch(editTeamRequest(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamPage);
