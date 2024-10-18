// src/App.js
import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
// import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import LandingPage from './screens/LandingPage.jsx';
import { ThemeProvider } from '@mui/material';
import getTheme from './themes/theme.jsx';
import ThankYou from './screens/ThankYou.jsx';



function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="App">
      <ThemeProvider theme={getTheme(darkMode ? 'dark' : 'light')}>
        <Routes>
          <Route
            path="/"
            element={<LandingPage darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;