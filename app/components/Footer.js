import React from 'react';
import { Link } from 'react-router-dom';
import playersIcon from '../images/players_icon.png';
import teamsIcon from '../images/teams_icon.png';
import challengesIcon from '../images/challenges_icon.png';
import reportsIcon from '../images/reports_icon.png';
import settingsIcon from '../images/settings_icon.png';

export default () => (
  <ul className="footer">
    <li>
      <Link to="/players" className="footer__menu-item">
        <img src={playersIcon} className="footer__icon" alt="players-icon" />
        <span className="footer__text">Players</span>
      </Link>
    </li>
    <li>
      <Link to="/teams" className="footer__menu-item">
        <img src={teamsIcon} className="footer__icon" alt="teams-icon" />
        <span className="footer__text">Teams</span>
      </Link>
    </li>
    <li>
      <Link to="/challenges" className="footer__menu-item">
        <img
          src={challengesIcon}
          className="footer__icon"
          alt="challenges-icon"
        />
        <span className="footer__text">Challenges</span>
      </Link>
    </li>
    <li>
      <Link to="/reports" className="footer__menu-item">
        <img src={reportsIcon} className="footer__icon" alt="reports-icon" />
        <span className="footer__text">Reports</span>
      </Link>
    </li>
    <li>
      <Link to="/settings" className="footer__menu-item">
        <img src={settingsIcon} className="footer__icon" alt="settings-icon" />
        <span className="footer__text">Settings</span>
      </Link>
    </li>
  </ul>
);
