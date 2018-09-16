import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import Footer from '../Footer';
import { Header } from '../Header';
import Loader from '../Loader';
import { editPlayerRequest } from '../../actions/players';
import { showLoader } from '../../actions/loader';
import PageHeader from './PlayerPage/PageHeader';
import OverviewChart from './PlayerPage/OverviewChart';
import TypicalChart from './PlayerPage/TypicalChart';

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
    player: state.players.player,
    loading: state.players.loading
});

const mapDispatchToProps = dispatch => ({
    editPlayerRequest: id => dispatch(editPlayerRequest(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerPage);
