import React from 'react';
import './WhatsApp.css';

const WhatsApp: React.FC = () => {
  return (
    <div className="whatsapp-container">
      <h1>WhatsApp Business API Access</h1>
      <div className="legal-info">
        <div className="info-card">
          <h2>Display Name</h2>
          <p className="name">Invoice Buddy</p>
          <p className="description">
            The brand name that appears to customers when interacting with our WhatsApp Business account.
          </p>
        </div>
        <div className="relationship-arrow">
          <span>operates as</span>
        </div>
        <div className="info-card">
          <h2>Legal Entity</h2>
          <p className="name">Dvatia Technologies OPC Private Limited</p>
          <p className="description">
            The registered business entity responsible for all WhatsApp Business API operations and communications.
          </p>
        </div>
      </div>
      <div className="additional-info">
        <p>
          Our WhatsApp Business API implementation complies with Meta's business verification
          and naming policies. This ensures transparency in our business communications
          while maintaining brand recognition through our display name "Invoice Buddy".
        </p>
      </div>
    </div>
  );
};

export default WhatsApp;
