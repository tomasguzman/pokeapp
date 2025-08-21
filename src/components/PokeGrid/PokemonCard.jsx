import React from 'react';

const PokemonCard = ({ pokemon, isFavorite, onFavoriteToggle, onSelect }) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavoriteToggle(pokemon.id);
  };

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

  return (
    <div
      className="rounded-xl shadow-lg flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105 overflow-hidden "
      onClick={() => onSelect(pokemon.id)}
    >

      <div 
        className="flex flex-col items-center p-4 w-full"
        style={{ backgroundColor: getBackgroundColor(pokemon.types[0]) }}
      >
        <div className="flex justify-end w-full">
          <button onClick={handleFavoriteClick} className="focus:outline-none text-2xl">
            {isFavorite ? '❤️' : '♡'}
          </button>
        </div>
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="w-24 h-24"
        />
      </div>

      <div 
        className="w-full p-4 flex flex-col items-center"
        style={{ backgroundColor: '#1e1e1eff' }}
      >
        <span className="text-sm text-white">#{String(pokemon.id).padStart(3, '0')}</span>
        <h3 className="text-xl font-bold capitalize mt-1 mb-2 text-white">
          {pokemon.name}
        </h3>
        <div className="flex space-x-2">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs font-semibold rounded-full capitalize`}
              style={{ color: getTypeTextColor(type), backgroundColor: 'transparent' }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;