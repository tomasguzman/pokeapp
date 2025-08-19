import React from 'react';

const LandingPage = ({ onStartClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-6 animate-fade-in">
        ¡Bienvenido a la PokeApp!
      </h2>
      <p className="text-md sm:text-lg text-gray-600 mb-12 animate-fade-in animation-delay-300">
        Descubre información sobre todos tus Pokémon favoritos.
      </p>
      <button
        onClick={onStartClick}
        className="px-8 py-4 bg-red-500 text-white font-bold rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2 animate-pulse-once"
      >
        START
      </button>
      <style jsx>{`
        /* Keyframes for a simple fade-in effect */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* A subtle pulsing animation for the button on load */
        @keyframes pulseOnce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-pulse-once {
          animation: pulseOnce 1.5s ease-in-out;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
