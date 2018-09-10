import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
	return (
		<ul className="footer">
			<li>
				<Link to="/players" className="footer__menu-item">
					<img
						src="/images/players_icon.png"
						className="footer__icon"
					/>
					<span className="footer__text">Players</span>
				</Link>
			</li>
			<li>
				<Link to="/teams" className="footer__menu-item">
					<img
						src="/images/teams_icon.png"
						className="footer__icon"
					/>
					<span className="footer__text">Teams</span>
				</Link>
			</li>
			<li>
				<Link to="/challenges" className="footer__menu-item">
					<img
						src="/images/challenges_icon.png"
						className="footer__icon"
					/>
					<span className="footer__text">Challenges</span>
				</Link>
			</li>
			<li>
				<Link to="/reports" className="footer__menu-item">
					<img
						src="/images/reports_icon.png"
						className="footer__icon"
					/>
					<span className="footer__text">Reports</span>
				</Link>
			</li>
			<li>
				<Link to="/settings" className="footer__menu-item">
					<img
						src="/images/settings_icon.png"
						className="footer__icon"
					/>
					<span className="footer__text">Settings</span>
				</Link>
			</li>
		</ul>
	);
};
