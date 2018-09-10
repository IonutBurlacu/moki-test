import React, { Component } from 'react';
import { connect } from 'react-redux';

const Loader = ({ loading }) =>
  loading ? (
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
    <div />
  );

const mapStateToProps = state => ({
  loading: state.loader.loading
});

export default connect(mapStateToProps)(Loader);
