// src/components/DarkModeToggle.jsx
import React, { useState, useEffect } from 'react';
import './styles/DarkModeToggle.css';
import { Switch } from '@mui/material';

const DarkModeToggle = ({ isDarkModeEnabled, toggleDarkMode }) => {

  return (
    <div className="dark-mode-toggle">
      <Switch
        checked={isDarkModeEnabled}
        onChange={toggleDarkMode}
        color="secondary"
        inputProps={{ 'aria-label': 'Toggle Dark Mode' }}
      />
    </div>
  );
};

export default DarkModeToggle;