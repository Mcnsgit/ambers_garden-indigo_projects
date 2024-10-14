// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo2.png';
import './styles/Header.css';
import DarkModeToggle from './DarkModeToggle.jsx';

const Header = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkModeEnabled(!isDarkModeEnabled);
  };

  useEffect(() => {
    document.body.className = isDarkModeEnabled ? 'dark-mode' : '';
  }, [isDarkModeEnabled]);

  return (
    <header className="header">
      <img src={logo} alt="Indigo Project Logo" className="logo" />
      <DarkModeToggle
        isDarkModeEnabled={isDarkModeEnabled}
        toggleDarkMode={toggleDarkMode}
      />
    </header>
  );
};

export default Header;