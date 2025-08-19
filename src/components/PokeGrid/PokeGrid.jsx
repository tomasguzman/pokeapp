import React, { useState, useEffect } from 'react';

const PokeGrid = ({ onPokemonSelect }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=300');
        if (!response.ok) {
          throw new Error('No se pudo cargar la lista de Pokémon.');
        }
        const data = await response.json();
        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon, index) => {
            const res = await fetch(pokemon.url);
            const detail = await res.json();
            return {
              id: detail.id,
              name: detail.name,
              sprite: detail.sprites.front_default,
            };
          })
        );
        setPokemonList(detailedPokemon);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="ml-4 text-gray-600">Cargando la PokeGrid...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center font-semibold">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">PokeGrid</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonList.map(pokemon => (
          <div
            key={pokemon.id}
            onClick={() => onPokemonSelect(pokemon.id)}
            className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img src={pokemon.sprite} alt={pokemon.name} className="w-24 h-24 mb-2" />
            <span className="text-lg font-semibold text-gray-700 capitalize">
              {pokemon.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokeGrid;