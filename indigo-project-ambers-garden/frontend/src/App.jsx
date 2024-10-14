// src/App.js
import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
// import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import LandingPage from './screens/LandingPage.jsx';
import { ThemeProvider } from '@mui/material';
import theme from '../themes/theme.jsx';
import ThankYou from './screens/ThankYou.jsx';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;