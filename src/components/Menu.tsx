import React from 'react';
import '../Menu.css';
import '../App.css';

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Om menyn inte är öppen, rendera ingenting
  
    return (
      <div className='menu-overlay'>
        <div className='menu-container'>
          <button onClick={onClose} className='close-button'>Stäng</button>
          <nav>
            <ul>
              <li><a href="#home">Hem</a></li>
              <li><a href="#booking">Boka</a></li>
              <li><a href="#contact">Kontakt</a></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  };
  
  
  
  export default Menu;