// src/components/DarkModeToggle.js
import React from 'react';
import './styles/DarkModeToggle.css';

const DarkModeToggle = ({ darkMode, setDarkMode }) => (
  <div className="dark-mode-toggle">
    <input 
      type="checkbox" 
      id="dark-mode-toggle" 
      aria-label="Toggle Dark Mode"
      checked={darkMode}
      onChange={() => setDarkMode(!darkMode)}
    />
    <label htmlFor="dark-mode-toggle">
      <i className="fas fa-moon"></i><i className="fas fa-sun"></i>
    </label>
  </div>
);

export default DarkModeToggle;
