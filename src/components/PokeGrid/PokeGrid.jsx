import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import FilterControls from './FilterControls';
import Pagination from './Pagination';
import LoadingPage from '../LoadingPage/LoadingPage';
import './PokeGrid.css';

const POKEMONS_PER_PAGE = 30;
const TOTAL_POKEMONS = 850; 

const PokeGrid = ({ onPokemonSelect, favorites, onFavoriteToggle }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`);
        if (!response.ok) {
          throw new Error('Failed to load Pokémon list.');
        }
        const data = await response.json();
        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const detail = await res.json();
            return {
              id: detail.id,
              name: detail.name,
              sprite: detail.sprites.front_default,
              types: detail.types.map(typeInfo => typeInfo.type.name),
            };
          })
        );
        setPokemonList(detailedPokemon);
        setFilteredList(detailedPokemon);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    let listToFilter = showFavoritesOnly
      ? pokemonList.filter(p => favorites.has(p.id))
      : pokemonList;

    if (searchTerm) {
      listToFilter = listToFilter.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredList(listToFilter);
    setCurrentPage(1);
  }, [searchTerm, showFavoritesOnly, pokemonList, favorites]);

  const totalPages = Math.ceil(filteredList.length / POKEMONS_PER_PAGE);
  const startIndex = (currentPage - 1) * POKEMONS_PER_PAGE;
  const currentPokemon = filteredList.slice(startIndex, startIndex + POKEMONS_PER_PAGE);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center font-semibold">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl p-8 rounded-2xl flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-6">PokeGrid</h2>
      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        favoritesCount={favorites.size}
      />
      
      <div className="pokemon-grid">
        {currentPokemon.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={favorites.has(pokemon.id)}
            onFavoriteToggle={onFavoriteToggle}
            onSelect={() => onPokemonSelect(pokemon.id)}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PokeGrid;