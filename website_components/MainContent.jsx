// src/components/MainContent.jsx
import React from 'react';
import './styles/MainContent.css';

const MainContent = () => (
  <section className="main-content">
    <h1>Welcome to the Indigo Project</h1>
    <p>
      {/* Insert the client's speech or dynamically load it */}
      [ speech about the Indigo Project will be placed here.]
    </p>
  </section>
);

export default MainContent;