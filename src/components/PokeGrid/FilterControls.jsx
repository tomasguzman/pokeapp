import React from 'react';

const FilterControls = ({
  searchTerm,
  setSearchTerm,
  showFavoritesOnly,
  setShowFavoritesOnly,
  favoritesCount,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full sm:w-1/2 p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
      />
      <button
        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 w-full sm:w-auto ${
          showFavoritesOnly
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {showFavoritesOnly
          ? `Showing ${favoritesCount} Favorites`
          : `Show Favorites (${favoritesCount})`}
      </button>
    </div>
  );
};

export default FilterControls;