// src/components/DonateQRCode.js
import React from 'react';
import qrImage from '../assets/qrPaypalDonate.jpeg';
import './styles/DonateQRCode.css';

const DonateQRCode = () => (
  <div className="donate-qrcode">
    <h2>Support Amber's Garden</h2>
    <p>You can donate by scanning the QR code below or clicking the button to donate via PayPal.</p>
    <img src={qrImage} alt="Donate via QR Code" className="qr-code" />
    <a href="https://www.paypal.com/donate?hosted_button_id=EXAMPLE" target="_blank" rel="noopener noreferrer" className="btn-main">Donate Now</a>
  </div>
);

export default DonateQRCode;
