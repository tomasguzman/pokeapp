import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PokeGrid from '../src/components/PokeGrid/PokeGrid';

global.fetch = jest.fn();

const mockPokemonData = {
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
  ],
};

const mockDetailedPokemon = (id, name) => ({
  id,
  name,
  sprites: { front_default: 'mock-sprite.png' },
  types: [{ type: { name: 'grass' } }],
});

describe('PokeGrid Component', () => {
  beforeEach(() => {
    fetch.mockImplementation((url) => {
      if (url.includes('pokemon?limit')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonData),
        });
      } else if (url.includes('pokemon/1')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockDetailedPokemon(1, 'bulbasaur')),
        });
      } else if (url.includes('pokemon/2')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockDetailedPokemon(2, 'ivysaur')),
        });
      } else if (url.includes('pokemon/3')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockDetailedPokemon(3, 'venusaur')),
        });
      }
      return Promise.resolve({ ok: false, status: 404 });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render and display the search bar and pagination', async () => {
    render(<PokeGrid />);
    

    expect(screen.getByText(/TU POKEGRID ESTÁ CARGANDO.../i)).toBeInTheDocument();


    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Search Pokémon.../i)).toBeInTheDocument();
    });
    

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
  });

  test('should filter pokemon correctly based on search term', async () => {
    render(<PokeGrid />);


    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText(/Search Pokémon.../i);
    fireEvent.change(searchInput, { target: { value: 'ivysaur' } });
    
    expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
  });
});
