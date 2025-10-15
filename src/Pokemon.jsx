import React, { useEffect, useState, useMemo } from "react";
import { PokemonCards } from "./PokemonCards";
import SpotlightCard from "./components/SpotlightCard";

const Pokemon = ({ searchTerm }) => {
  const [poke, setPoke] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = "https://pokeapi.co/api/v2/pokemon/?limit=120";

  const fetchpokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      // console.log(data);

      const detailpokemon = data.results.map(async (currentpokemon) => {
        // console.log(currentpokemon.url)

        const currentres = await fetch(currentpokemon.url);
        const currentdata = await currentres.json();
        return currentdata;
      });

      // console.log(detailpokemon);

      const finalpoklemondata = await Promise.all(detailpokemon);
      console.log(finalpoklemondata);

      setPoke(finalpoklemondata);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchpokemon();
  }, []); // Empty dependency array means this runs only once on mount

  // Filter Pokemon based on search term
  const filteredPokemon = useMemo(() => {
    if (!searchTerm.trim()) {
      return poke;
    }

    const searchLower = searchTerm.toLowerCase();
    return poke.filter((pokemon) => {
      // Search by name
      const nameMatch = pokemon.name.toLowerCase().includes(searchLower);
      
      // Search by type
      const typeMatch = pokemon.types.some(type => 
        type.type.name.toLowerCase().includes(searchLower)
      );
      
      // Search by abilities
      const abilityMatch = pokemon.abilities.some(ability => 
        ability.ability.name.toLowerCase().includes(searchLower)
      );

      return nameMatch || typeMatch || abilityMatch;
    });
  }, [poke, searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-red-600"></div>
          <h1 className="text-xl font-semibold mt-4">Loading Pokémon...</h1>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-red-600">Error: {error.message}</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-[1400px] m-auto">
        {searchTerm && (
          <div className="px-5 md:px-0 mb-4">
            <p className="text-lg text-gray-700">
              {filteredPokemon.length} Pokémon found for "{searchTerm}"
            </p>
          </div>
        )}
        
        {filteredPokemon.length === 0 && searchTerm ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No Pokémon found</h2>
              <p className="text-gray-500">Try searching for a different name, type, or ability</p>
            </div>
          </div>
        ) : (
          <div>
            <ul className="cards px-5 md:px-0 grid md:grid-cols-3 gap-5">
              {filteredPokemon.map((currentpokemon) => {
                return (
                  <SpotlightCard
                    key={currentpokemon.id}
                    className="custom-spotlight-card transition-transform duration-300 hover:scale-105 cursor-pointer"
                    spotlightColor="rgba(255, 255, 255, 0.2)"
                  >
                    <PokemonCards
                      pokemonData={currentpokemon}
                    />
                  </SpotlightCard>
                );
              })}
            </ul>
          </div>
        )}
      </section>
    </>
  );
};

export default Pokemon;
