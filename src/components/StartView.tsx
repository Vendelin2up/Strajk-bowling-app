import React from 'react';
import '../StartView.css';
import logo from '../assets/logo.svg';



interface StartViewProps {
    onProceed: () => void;
}

const StartView: React.FC<StartViewProps> = ({ onProceed }) => {
    return (
        <div className='start-view' onClick={onProceed}>
            <img src={logo} alt='Strajk Logo' className='logo' />
            <h1 className='title'>STRAJK</h1>
            <p className='subtitle'>BOWLING</p>
        </div>
    );
};

export default StartView;