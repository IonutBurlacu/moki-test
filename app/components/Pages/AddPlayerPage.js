import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import Footer from '../Footer';
import { Header } from '../Header';
import Loader from '../Loader';
import AddPlayerForm from './AddPlayerPage/AddPlayerForm';
import { createPlayerRequest } from '../../actions/players';
import { showLoader } from '../../actions/loader';
import Alert from '../Alert';

export class AddPlayerPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.createPlayerRequest();
    }

    render() {
        return (
            <div className="container">
                {!this.props.loading ? (
                    <div className="content">
                        <AddPlayerForm
                            handleInputChange={this.handleInputChange}
                            handleSuggestionInputChange={
                                this.handleSuggestionInputChange
                            }
                        />
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
    loading: state.players.loading
});

const mapDispatchToProps = dispatch => ({
    createPlayerRequest: () => dispatch(createPlayerRequest()),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPlayerPage);
