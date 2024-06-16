// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';
// import logo from '../assets/logo.jpg';

const Header = () => (
  <header>
    <nav>
      <div className="logo">
        <h1>
        Indigo Projects Logo
        </h1>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/#intro">About PTSD</Link></li>
        <li><Link to="/#donate">Donate</Link></li>
        <li><Link to="/amber-garden">Amber's Garden</Link></li>
      </ul>
    </nav>
  </header>

);
export default Header;
