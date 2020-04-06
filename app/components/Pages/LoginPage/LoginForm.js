import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import Store from 'electron-store';
import { showLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import { loginRequest } from '../../../actions/auth';

const store = new Store();

export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: store.get('email', ''),
            password: ''
        };
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        if (navigator.onLine) {
            if (this.state.email === '' || this.state.password === '') {
                this.props.showAlert(
                    'Please complete all the required fields.'
                );
            } else {
                store.set('email', this.state.email);
                this.props.showLoader();
                this.props.loginRequest(this.state.email, this.state.password);
            }
        } else {
            this.props.showAlert('No internet connection.');
        }
    };

    render() {
        return (
            <div className="login-form">
                <form action="">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-input"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            placeholder="Enter email"
                        />
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-input"
                            id="password"
                            name="password"
                            onChange={this.handleInputChange}
                            placeholder="Enter password"
                        />
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                    </div>
                    <div className="login-buttons">
                        <button
                            type="button"
                            className="login-form__button"
                            onClick={this.handleSubmit}
                        >
                            Log in
                        </button>
                        <Link
                            className="forgot-password-link"
                            to="/forgot_password"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    showLoader: () => dispatch(showLoader()),
    showAlert: message => dispatch(showAlert(message)),
    loginRequest: (email, password) => dispatch(loginRequest(email, password))
});

export default connect(undefined, mapDispatchToProps)(LoginForm);
