// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png';
import './styles/Header.css';

const Header = () => (
  <header>
    <nav>
      <div className="logo">
        <img src={logo} alt="Amber's Garden Logo" />
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/intro">PTSD Awareness</Link></li>
        <li><Link to="/amber-garden">Amber's Garden</Link></li>
        <li><Link to="/donate">Donate</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
