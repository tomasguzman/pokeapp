import React, { useEffect } from 'react';
import './LoadingPage.css';
import openPokeball from '../../assets/OpenPokeball.png';

const LoadingPage = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2000); 

    return () => clearTimeout(timer); 
  }, [onLoadingComplete]);

  return (
    <div className="loading-container">
      <img
        src={openPokeball}
        alt="Open Pokeball"
        className="open-pokeball-image"
      />
      <h1 className="loading-text">TU POKEGRID ESTÁ CARGANDO...</h1>
    </div>
  );
};

export default LoadingPage;
