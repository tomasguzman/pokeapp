import React, { useState } from 'react';
import './LandingPage.css';
import closedPokeball from '../../assets/ClosePokeball.png';
import openPokeball from '../../assets/openPokeball.png';


const LandingPage = ({ onStartClick }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPokeballOpen, setIsPokeballOpen] = useState(false);

  const handleStartClick = () => {
    setIsTransitioning(true);
    setIsPokeballOpen(true);
    
    setTimeout(() => {
        onStartClick();
    }, 500);
  };

  const pokeballImage = isPokeballOpen ? openPokeball : closedPokeball;

  return (
    <div className="landing-container">
      <h1 className="landing-title">POKEAPP</h1>
      <div className={`transition-overlay ${isTransitioning ? 'active' : ''}`}></div>
      <div className="pokeball-container">
        <img 
          src={pokeballImage} 
          alt="Pokeball" 
          className="pokeball-image"
          onClick={handleStartClick}
        />
        <button
          onClick={handleStartClick}
          className="start-button"
        >
          START
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
