import React, { Component } from 'react';
import logo from '../images/logo.png';

export const Header = ({ leftButton, rightButton }) => (
  <header className="header">
    <div className="left-side">{leftButton}</div>
    <div className="center-side">
      <img src={logo} className="logo" alt="logo" />
    </div>
    <div className="right-side">{rightButton}</div>
  </header>
);

export default Header;
