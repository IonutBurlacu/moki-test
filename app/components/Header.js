import React from 'react';

export const Header = ({ leftButton, rightButton }) => (
	<header className="header">
		<div className="left-side">{leftButton}</div>
		<div className="center-side">
			<img src="/images/logo.png" className="logo" />
		</div>
		<div className="right-side">{rightButton}</div>
	</header>
);

export default Header;
