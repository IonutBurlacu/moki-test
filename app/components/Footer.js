import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setActiveMenu } from '../actions/footer';
import playersIcon from '../images/players_icon.png';
import playersIconActive from '../images/players_icon_active.png';
import teamsIcon from '../images/teams_icon.png';
import teamsIconActive from '../images/teams_icon_active.png';
import challengesIcon from '../images/challenges_icon.png';
import challengesIconActive from '../images/challenges_icon_active.png';
import reportsIcon from '../images/reports_icon.png';
import reportsIconActive from '../images/reports_icon_active.png';
import settingsIcon from '../images/settings_icon.png';
import settingsIconActive from '../images/settings_icon_active.png';

export class Footer extends Component {
    handleClick = menu => {
        this.props.setActiveMenu(menu);
    };

    render() {
        return (
            <ul className="footer">
                <li>
                    <Link
                        to="/players"
                        className={
                            this.props.active === 'players'
                                ? 'footer__menu-item active'
                                : 'footer__menu-item'
                        }
                        onClick={() => this.handleClick('players')}
                    >
                        <img
                            src={
                                this.props.active === 'players'
                                    ? playersIconActive
                                    : playersIcon
                            }
                            className="footer__icon"
                            alt="players-icon"
                        />
                        <span className="footer__text">Players</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/teams"
                        className={
                            this.props.active === 'teams'
                                ? 'footer__menu-item active'
                                : 'footer__menu-item'
                        }
                        onClick={() => this.handleClick('teams')}
                    >
                        <img
                            src={
                                this.props.active === 'teams'
                                    ? teamsIconActive
                                    : teamsIcon
                            }
                            className="footer__icon"
                            alt="teams-icon"
                        />
                        <span className="footer__text">Teams</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/challenges"
                        className={
                            this.props.active === 'challenges'
                                ? 'footer__menu-item active'
                                : 'footer__menu-item'
                        }
                        onClick={() => this.handleClick('challenges')}
                    >
                        <img
                            src={
                                this.props.active === 'challenges'
                                    ? challengesIconActive
                                    : challengesIcon
                            }
                            className="footer__icon"
                            alt="challenges-icon"
                        />
                        <span className="footer__text">Challenges</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/reports"
                        className={
                            this.props.active === 'reports'
                                ? 'footer__menu-item active'
                                : 'footer__menu-item'
                        }
                        onClick={() => this.handleClick('reports')}
                    >
                        <img
                            src={
                                this.props.active === 'reports'
                                    ? reportsIconActive
                                    : reportsIcon
                            }
                            className="footer__icon"
                            alt="reports-icon"
                        />
                        <span className="footer__text">Reports</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/settings"
                        className={
                            this.props.active === 'settings'
                                ? 'footer__menu-item active'
                                : 'footer__menu-item'
                        }
                        onClick={() => this.handleClick('settings')}
                    >
                        <img
                            src={
                                this.props.active === 'settings'
                                    ? settingsIconActive
                                    : settingsIcon
                            }
                            className="footer__icon"
                            alt="settings-icon"
                        />
                        <span className="footer__text">Settings</span>
                    </Link>
                </li>
            </ul>
        );
    }
}

const mapStateToProps = state => ({
    active: state.footer.active
});

const mapDispatchToProps = dispatch => ({
    setActiveMenu: menu => dispatch(setActiveMenu(menu))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);
