// src/App.tsx
import React, { useState } from 'react';
import Booking from './components/Booking';
import { BookingRequest } from './components/Booking';
import Confirmation, { ConfirmationProps } from './components/Confirmation';
import Menu from './components/Menu';
import StartView from './components/StartView';
import './App.css';
import './Menu.css';

type View = 'start' | 'booking' | 'confirmation';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('start');
  const [confirmation, setConfirmation] = useState<ConfirmationProps['bookingDetails']>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Funktion för att växla till StartView
  const handleRestart = () => {
    setCurrentView('start');
    setConfirmation(null); // Återställ bekräftelsen om du vill börja om
  };

  // Funktion för att hantera vyväxling från StartView till Booking
  const handleProceed = () => {
    setCurrentView('booking');
  };

  // Funktion för att hantera bekräftelsevy när bokningen är klar
  const handleConfirmation = () => {
    setCurrentView('confirmation');
  };

  const handleBookingSubmit = async (bookingData: BookingRequest) => {
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '738c6b9d-24cf-47c3-b688-f4f4c5747662',
        },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      setConfirmation(data);
      handleConfirmation(); // Växla till bekräftelsevyn efter bokningen är skickad
    } catch (error) {
      console.error('Error booking lane:', error);
    }
  };

  return (
    <div>
      {/* Nav-ikon för att öppna menyn */}
      <button onClick={() => setIsMenuOpen(true)} className="nav-button">
        ☰
      </button>

      {/* Visning av aktuella vyer baserat på currentView */}
      {currentView === 'start' && <StartView onProceed={handleProceed} />}
      {currentView === 'booking' && <Booking onBookingSubmit={handleBookingSubmit} />}
      {currentView === 'confirmation' && confirmation && (
        <Confirmation bookingDetails={confirmation} onRestart={handleRestart} />
      )}

      {/* Meny-komponenten */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default App;
