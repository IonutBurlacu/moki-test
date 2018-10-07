import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showAlert } from '../actions/alert';
import { hideLoader } from '../actions/loader';

let waitTimeout = null;

export class Loader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            waitTimeout: null
        };
    }

    componentDidMount() {
        if (this.props.loading) {
            waitTimeout = setTimeout(() => {
                this.props.showAlert('There was an error. Please try again.');
                this.props.hideLoader();
            }, 10000);
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.loading === false) {
            clearTimeout(waitTimeout);
        }
    }

    render() {
        return this.props.loading ? (
            <div className="loader-wrapper">
                <div className="lds-roller">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        ) : (
            <span />
        );
    }
}

const mapStateToProps = state => ({
    loading: state.loader.loading
});

const mapDispatchToProps = dispatch => ({
    showAlert: message => dispatch(showAlert(message)),
    hideLoader: () => dispatch(hideLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Loader);
