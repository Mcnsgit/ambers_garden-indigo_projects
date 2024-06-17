// src/components/Header.js
import React from 'react';
import logo from '../assets/logo2.png';
import './styles/Header.css';

const Header = () => (
  <header>
    <nav>
      <div className="logo">
        <img src={logo} alt="Amber's Garden Logo" />
      </div>
      <ul>
        <li><a href="/">Home</a></li> {/* Changed Link to a standard anchor tag */}
        <li><a href="/#intro">PTSD Awareness </a></li> {/* Changed Link to a standard anchor tag */}
        <li><a href="/amber-garden">Amber's Garden</a></li> {/* Changed Link to a standard anchor tag */}
        <li><a href="/#donate">Donate</a></li> {/* Changed Link to a standard anchor tag */}
      </ul>
    </nav>
  </header>
);
export default Header;