import React, { Component } from 'react';

export const PageTitle = ({ title, isGreen }) => (
    <div className={isGreen ? 'green page-title' : 'page-title'}>
        <h1>{title}</h1>
    </div>
);
