import { useState } from 'react'
import LandingPage from './components/LandingPage/LandingPage';
import PokeGrid from './components/PokeGrid/PokeGrid';

const App = () => {

  const [currentView, setCurrentView] = useState('landing');
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);


  const navigateTo = (view) => {
    setCurrentView(view);
  };

  const handlePokemonSelect = (id) => {
    setSelectedPokemonId(id);
    navigateTo('pokedex');
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onStartClick={() => navigateTo('pokegrid')} />;
      case 'pokegrid':
        return <PokeGrid onPokemonSelect={handlePokemonSelect} />;
      case 'pokedex':
        return <Pokedex pokemonId={selectedPokemonId} onBackClick={() => navigateTo('pokegrid')} />;
      default:
        return <LandingPage onStartClick={() => navigateTo('pokegrid')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-6xl bg-gray-200 p-8 rounded-2xl shadow-xl flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">PokeApp</h1>
        {renderView()}
      </div>
    </div>
  );
};

export default App
