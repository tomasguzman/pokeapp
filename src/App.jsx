import { useState } from 'react'
import LandingPage from './components/LandingPage/LandingPage';
import PokeGrid from './components/PokeGrid/PokeGrid';
import Pokedex from './components/Pokedex/Pokedex';
import './App.css';

const App = () => {

  const [currentView, setCurrentView] = useState('landing');
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const handleFavoriteToggle = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };
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
        return <LandingPage onStartClick={() => setCurrentView('pokedex')} />;
      case 'pokedex':
        return (
          <PokeGrid
            onPokemonSelect={id => {
              setSelectedPokemonId(id);
              setCurrentView('pokemon-details');
            }}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
          />
        );
      case 'pokemon-details':
        return <Pokedex pokemonId={selectedPokemonId} onBackClick={() => setCurrentView('pokedex')} />;
      default:
        return <LandingPage onStartClick={() => setCurrentView('pokedex')} />;
    }
  };

  return (
    <div className="app-container">
      {renderView()}
    </div>
  );
};

export default App
