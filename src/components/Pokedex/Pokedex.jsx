import React, { useState, useEffect } from 'react';

const Pokedex = ({ pokemonId, onBackClick }) => {
  const [pokemon, setPokemon] = useState(null);
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, [pokemonId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="ml-4 text-gray-600">Cargando la Pokedex...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center font-semibold">
        <p>Error: {error}</p>
        <button onClick={onBackClick} className="mt-4 px-6 py-3 bg-gray-500 text-white font-bold rounded-full shadow-lg hover:bg-gray-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
          Volver a PokeGrid
        </button>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="text-gray-500 text-center">
        <p>No se encontró información del Pokémon.</p>
        <button onClick={onBackClick} className="mt-4 px-6 py-3 bg-gray-500 text-white font-bold rounded-full shadow-lg hover:bg-gray-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
          Volver a PokeGrid
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 w-full max-w-sm">
        <h2 className="text-3xl font-bold text-gray-800 capitalize mb-4 text-center">
          {pokemon.name}
        </h2>
        <div className="flex justify-center mb-4">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-48 h-48"
          />
        </div>
        <div className="text-left text-gray-700 space-y-2">
          <p><strong className="font-semibold">ID:</strong> {pokemon.id}</p>
          <p>
            <strong className="font-semibold">Tipo(s):</strong>{' '}
            {pokemon.types.map(t => (
              <span key={t.slot} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-1">
                {t.type.name}
              </span>
            ))}
          </p>
          <p><strong className="font-semibold">Altura:</strong> {pokemon.height / 10} m</p>
          <p><strong className="font-semibold">Peso:</strong> {pokemon.weight / 10} kg</p>
        </div>
      </div>
      <button
        onClick={onBackClick}
        className="mt-6 px-6 py-3 bg-gray-500 text-white font-bold rounded-full shadow-lg hover:bg-gray-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Volver a PokeGrid
      </button>
    </div>
  );
};

export default Pokedex;