// src/components/Donate.js
import React from 'react';
import './styles/Donate.css';

const Donate = () => (
  <section id="donate">
    <h2>Make a Donation</h2>
    <p>Your contributions make a real difference in the lives of those affected by PTSD.</p>
    <form>
      <label htmlFor="amount">Select Donation Amount:</label>
      <select id="amount" name="amount">
        <option value="10">£10</option>
        <option value="25">£25</option>
        <option value="50">£50</option>
        <option value="100">£100</option>
        <option value="custom">Custom Amount</option>
      </select>
      <button type="submit">Donate</button>
    </form>
    <p>Or choose a monthly donation to provide ongoing support.</p>
  </section>
);

export default Donate;
