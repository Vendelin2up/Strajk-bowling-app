// src/components/Booking.tsx
import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import '../Booking.css';

interface BookingProps {
  onBookingSubmit: (bookingData: BookingRequest) => void;
}

export interface BookingRequest {
  when: string;
  lanes: number;
  people: number;
  shoes: number[];
}

const Booking: React.FC<BookingProps> = ({ onBookingSubmit }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [lanes, setLanes] = useState(1); // Default antal banor är 1
  const [people, setPeople] = useState(1);
  const [shoes, setShoes] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null); // Ny state för felmeddelanden

  const handlePeopleChange = (value: number) => {
    setPeople(value);
    setShoes((prevShoes) => {
      const newShoes = [...prevShoes];
      if (newShoes.length > value) {
        newShoes.length = value;
      } else {
        while (newShoes.length < value) {
          newShoes.push(0);
        }
      }
      return newShoes;
    });
  };

  const handleSubmit = () => {
    setError(null);

    if (shoes.length !== people) {
      setError(`Du måste ange exakt ${people} skostorlekar.`);
      return;
    }

    if (shoes.some((size) => size <= 0 || isNaN(size))) {
      setError("Alla skostorlekar måste vara ifyllda och större än 0.");
      return;
    }

    if (people > lanes * 4) {
      setError(`Max antal spelare är ${lanes * 4} för ${lanes} banor.`);
      return;
    }

    const bookingData: BookingRequest = {
      when: `${date}T${time}`,
      lanes: lanes,
      people: people,
      shoes: shoes,
    };

    onBookingSubmit(bookingData);
  };

  return (
    <div className='booking-container'>
      <img src={logo} alt="Bowling Logo" className='logo' />
      <h1 className='title'>BOOKING</h1>
      
      <div className="form-section">
        <label>DATE</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" />

        <label>TIME</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input-field" />
      </div>

      <div className="form-section">
        <label>NUMBER OF AWESOME BOWLERS</label>
        <input
          type="number"
          value={people}
          onChange={(e) => handlePeopleChange(parseInt(e.target.value))}
          min={1}
          className="input-field"
        />

        <label>NUMBER OF LANES</label>
        <input
          type="number"
          value={lanes}
          onChange={(e) => setLanes(parseInt(e.target.value))}
          min={1}
          className="input-field"
        />
      </div>

      <div className="form-section">
        <label>SHOES</label>
        {Array.from({ length: people }).map((_, index) => (
          <input
            key={index}
            type="number"
            placeholder={`Shoe Size / Person ${index + 1}`}
            value={shoes[index] || ''}
            onChange={(e) => {
              const newShoes = [...shoes];
              newShoes[index] = parseInt(e.target.value);
              setShoes(newShoes);
            }}
            className="input-field"
          />
        ))}
      </div>

      <button className="submit-button" onClick={handleSubmit}>STRIIIIKE!</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Booking;
