import React, { useState, useEffect } from 'react';

const Pokedex = ({ pokemonId, onBackClick }) => {
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
          throw new Error('No se pudo encontrar el Pokémon.');
        }
        const data = await response.json();
        setPokemon(data);

        const speciesResponse = await fetch(data.species.url);
        if (!speciesResponse.ok) {
          throw new Error('No se pudo encontrar la descripción del Pokémon.');
        }
        const speciesData = await speciesResponse.json();

        const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
        if (flavorText) {

          setDescription(flavorText.flavor_text.replace(/[\n\f]/g, ' '));
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, [pokemonId]);

  const getBackgroundColor = (type) => {
    const colors = {
      fire: '#FDDFDF',
      grass: '#DEFDE0',
      electric: '#FCF7DE',
      water: '#DEF3FD',
      ground: '#f4e7da',
      rock: '#d5d5d4',
      fairy: '#fceaff',
      poison: '#d6b6e5',
      bug: '#f8d5a3',
      dragon: '#97b3e6',
      psychic: '#eaeda1',
      flying: '#F5F5F5',
      fighting: '#E6E0D4',
      normal: '#F5F5F5',
    };
    return colors[type] || '#F5F5F5';
  };
  

  const getTypeTextColor = (type) => {
    const colors = {
      fire: '#C42F2D',
      grass: '#4CAF50',
      electric: '#FFC107',
      water: '#2196F3',
      ground: '#795548',
      rock: '#607D8B',
      fairy: '#FF4081',
      poison: '#9C27B0',
      bug: '#8BC34A',
      dragon: '#3F51B5',
      psychic: '#FFEB3B',
      flying: '#BDBDBD',
      fighting: '#E64A19',
      normal: '#9E9E9E',
    };
    return colors[type] || '#BDBDBD';
  };


  const formatDescription = (text, breakLength = 33) => {
    if (!text) return null;
    let result = [];
    let currentLine = '';
    const words = text.split(' ');

    words.forEach(word => {
      if ((currentLine + word).length > breakLength && currentLine.length > 0) {
        result.push(<span key={result.length}>{currentLine.trim()}<br /></span>);
        currentLine = '';
      }
      currentLine += word + ' ';
    });

    if (currentLine.trim().length > 0) {
      result.push(<span key={result.length}>{currentLine.trim()}</span>);
    }
    return result;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="ml-4 text-xl text-gray-600">Cargando la Pokedex...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center font-semibold">
        <p>Error: {error}</p>
        <button onClick={onBackClick} className="mt-6 px-8 py-4 bg-gray-500 text-white font-bold rounded-full shadow-lg hover:bg-gray-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-lg">
          Volver a PokeGrid
        </button>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="text-gray-500 text-center">
        <p>No se encontró información del Pokémon.</p>
        <button onClick={onBackClick} className="mt-6 px-8 py-4 bg-gray-500 text-white font-bold rounded-full shadow-lg hover:bg-gray-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-lg">
          Volver a PokeGrid
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center p-4 md:p-8">
      <div className="rounded-2xl shadow-2xl flex flex-col transition-transform duration-300 hover:scale-105 overflow-hidden w-full md:max-w-xl">
        <div 
          className="flex flex-col items-center p-10 w-full"
          style={{ backgroundColor: getBackgroundColor(pokemon.types[0].type.name) }}
        >
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-auto h-auto scale-[4] mx-auto"
          style={{ imageRendering: 'pixelated' }}
        />

        </div>


        <div 
          className="w-full p-10 flex flex-col items-center"
          style={{ backgroundColor: '#1e1e1eff' }}
        >
          <span className="text-xl text-white font-mono">#{String(pokemon.id).padStart(3, '0')}</span>
          <h3 className="text-5xl font-extrabold capitalize mt-2 mb-4 text-white">
            {pokemon.name}
          </h3>
          <div className="flex space-x-4 mb-6">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className={`px-4 py-2 text-sm font-semibold rounded-full capitalize`}
                style={{ color: getTypeTextColor(type.type.name), backgroundColor: 'transparent' }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <div className="text-lg text-gray-300 text-center leading-relaxed max-w-md mx-auto">
            <p>{formatDescription(description)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-base text-gray-400 mt-6 w-full max-w-md">
            <p><strong className="font-semibold text-white">ID:</strong> {pokemon.id}</p>
            <p><strong className="font-semibold text-white">Altura:</strong> {pokemon.height / 10} m</p>
            <p><strong className="font-semibold text-white">Peso:</strong> {pokemon.weight / 10} kg</p>
          </div>
        </div>
      </div>
      
      <button
        onClick={onBackClick}
        className="mt-8 px-8 py-4 bg-gray-500 text-white font-bold rounded-full shadow-xl hover:bg-gray-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-xl"
      >
        Volver a PokeGrid
      </button>
    </div>
  );
};

export default Pokedex;