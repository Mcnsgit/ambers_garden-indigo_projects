// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo2.png';
import './styles/Header.css';
import DarkModeToggle from './DarkModeToggle.jsx';
import { Box, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const Header = ({darkMode, setDarkMode}) => {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <img src={logo} alt="Indigo Project Logo" style={{ height: 60 }} />
      <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
};

export default Header;