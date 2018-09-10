// @flow
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { login } from '../actions/auth';
import Routes from '../Routes';

export class Root extends Component {
  componentWillMount() {
    const token = sessionStorage.getItem('Authorization');
    const { login } = this.props;
    if (token) {
      login(token);
    }
  }

  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: token => dispatch(login(token))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Root);
