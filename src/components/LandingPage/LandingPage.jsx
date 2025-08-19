import React from 'react';

const LandingPage = ({ onStartClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-6">
        ¡Bienvenido a la PokeApp!
      </h2>
      <p className="text-md sm:text-lg text-gray-600 mb-12">
        Descubre información sobre todos tus Pokémon favoritos.
      </p>
      <button
        onClick={onStartClick}
        className="px-8 py-4 bg-red-500 text-white font-bold rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2"
      >
        START
      </button>

    </div>
  );
};

export default LandingPage;
