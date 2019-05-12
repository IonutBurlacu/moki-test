import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import { forgotPasswordRequest } from '../../../actions/auth';

export class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        if (this.state.email === '') {
            this.props.showAlert('All fields are required.');
        } else {
            this.props.showLoader();
            this.props.forgotPasswordRequest(this.state.email);
        }
    };

    render() {
        return (
            <div className="login-form">
                <h1 className="login-form__title">
                    Please enter your email address
                </h1>
                <form action="">
                    <div className="login-form__separator" />
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            id="email"
                            name="email"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="login-form__separator" />
                    <button
                        type="button"
                        className="login-form__button"
                        onClick={this.handleSubmit}
                    >
                        Done
                    </button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    showAlert: message => dispatch(showAlert(message)),
    forgotPasswordRequest: (email, className) =>
        dispatch(forgotPasswordRequest(email, className))
});

export default connect(
    undefined,
    mapDispatchToProps
)(ForgotPasswordForm);
