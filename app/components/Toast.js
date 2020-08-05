import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { hideToast } from '../actions/toast';

export class Toast extends Component {
    render() {
        const { show, message, hideToast } = this.props;
        return show ? <div className="toast">{message}</div> : <span />;
    }
}

const mapStateToProps = state => ({
    show: state.toast.show,
    message: state.toast.message
});

const mapDispatchToProps = dispatch => ({
    hideToast: () => dispatch(hideToast())
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
