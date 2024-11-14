// src/components/Confirmation.tsx
import React from 'react';
import '../Confirmation.css';
import logo from '../assets/logo.svg';

// Skapa en interface för props som vår komponent tar emot
export interface ConfirmationProps {
  bookingDetails: {
    when: string;
    lanes: number;
    people: number;
    shoes: number[];
    price: number;
    id: string;
  } | null; // Vi tillåter null om ingen bekräftelse ännu finns
  onRestart: () => void; //Leder tillbaka till start, lägger till onRestart som en prop
}

// Skapa själva Confirmation-komponenten
const Confirmation: React.FC<ConfirmationProps> = ({ bookingDetails, onRestart }) => {
  // Kontrollera om bookingDetails är null
  if (!bookingDetails) {
    return <p>Ingen bekräftelse finns ännu.</p>;
  }

  return (
    <div className="confirmation-container">
      <img src={logo} alt="Bowling Logo" className='logo' />
      <h1 className="confirmation-title">SEE YOU SOON!</h1>
      
      <div className="details-container">
        <div className="detail-item">
          <span className="detail-label">WHEN</span>
          <span>{bookingDetails.when}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">WHO</span>
          <span>{bookingDetails.people} pers</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">LANES</span>
          <span>{bookingDetails.lanes} lane</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">BOOKING NUMBER</span>
          <span>{bookingDetails.id}</span>
        </div>
      </div>
      
      <div className="total-container">
        <span className="total-label">Total</span>
        <span className="total-amount">{bookingDetails.price} sek</span>
      </div>
      
      <button className="confirm-button" onClick={onRestart}>SWEET, LET'S GO!</button>
    </div>
  );
};

export default Confirmation;