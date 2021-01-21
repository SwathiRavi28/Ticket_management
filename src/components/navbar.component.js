import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-dark navbar-expand-lg ml-auto">
            	<div className="container-fluid">
				<center><img src={logo} className="navbar-brand" width="30" alt="Tech support" /></center>
                </div>
            </nav>
        );
    }
}
