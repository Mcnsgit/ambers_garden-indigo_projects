// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home.js';
import AmberGarden from './components/AmberGarden';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';
// import CTA from './components/CTA';
import ErrorBoundary from './ErrorBoundary.js';
function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  return (
    <ErrorBoundary>

    <Router>
      <div className="App">
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/amber-garden" element={<AmberGarden />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
