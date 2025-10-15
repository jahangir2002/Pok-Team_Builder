import React, { useEffect, useState, useMemo } from "react";
import { PokemonCards } from "./PokemonCards";
import SpotlightCard from "./components/SpotlightCard";

const Pokemon = ({ searchTerm, theme }) => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [totalPokemon, setTotalPokemon] = useState(0);

  const POKEMON_PER_PAGE = 50;
  const API_BASE = "https://pokeapi.co/api/v2/pokemon";

  const fetchAllPokemon = async () => {
    try {
      setLoading(true);
      // First, get the total count of Pokemon
      const countRes = await fetch(`${API_BASE}?limit=1`);
      const countData = await countRes.json();
      const totalCount = countData.count;
      setTotalPokemon(totalCount);

      // Fetch all Pokemon URLs (without details first)
      const allRes = await fetch(`${API_BASE}?limit=${totalCount}`);
      const allData = await allRes.json();

      // Fetch details for first 50 Pokemon
      const firstBatch = allData.results.slice(0, POKEMON_PER_PAGE);
      const detailPokemon = firstBatch.map(async (currentpokemon) => {
        const currentres = await fetch(currentpokemon.url);
        const currentdata = await currentres.json();
        return currentdata;
      });

      const finalPokemonData = await Promise.all(detailPokemon);
      
      setAllPokemon(allData.results); // Store all URLs for search
      setDisplayedPokemon(finalPokemonData); // Store detailed Pokemon for display
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  const fetchMorePokemon = async () => {
    if (loadingMore || !hasMoreData) return;

    try {
      setLoadingMore(true);
      const startIndex = currentPage * POKEMON_PER_PAGE;
      const endIndex = Math.min(startIndex + POKEMON_PER_PAGE, allPokemon.length);
      
      if (startIndex >= allPokemon.length) {
        setHasMoreData(false);
        setLoadingMore(false);
        return;
      }

      const nextBatch = allPokemon.slice(startIndex, endIndex);
      const detailPokemon = nextBatch.map(async (currentpokemon) => {
        const currentres = await fetch(currentpokemon.url);
        const currentdata = await currentres.json();
        return currentdata;
      });

      const newPokemonData = await Promise.all(detailPokemon);
      setDisplayedPokemon(prev => [...prev, ...newPokemonData]);
      setCurrentPage(prev => prev + 1);
      setLoadingMore(false);
    } catch (error) {
      console.log(error);
      setLoadingMore(false);
      setError(error);
    }
  };

  const showLessPokemon = () => {
    setDisplayedPokemon(prev => prev.slice(0, POKEMON_PER_PAGE));
    setCurrentPage(1);
    setHasMoreData(true);
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []); // Empty dependency array means this runs only once on mount

  // Filter Pokemon based on search term
  const filteredPokemon = useMemo(() => {
    if (!searchTerm.trim()) {
      return displayedPokemon;
    }

    const searchLower = searchTerm.toLowerCase();
    return displayedPokemon.filter((pokemon) => {
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
  }, [displayedPokemon, searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className={`loading loading-spinner loading-lg ${theme === "dark" ? "text-cyan-500" : "text-red-600"}`}></div>
          <h1 className={`text-xl font-semibold mt-4 ${theme === "dark" ? "text-white" : "text-black"}`}>Loading Pokémon...</h1>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <h1 className={`text-xl font-semibold ${theme === "dark" ? "text-red-400" : "text-red-600"}`}>Error: {error.message}</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-[1400px] m-auto">
        {searchTerm && (
          <div className="px-5 md:px-0 mb-4">
            <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              {filteredPokemon.length} Pokémon found for "{searchTerm}"
            </p>
          </div>
        )}

        {!searchTerm && (
          <div className="px-5 md:px-0 mb-4">
            <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Showing {displayedPokemon.length} of {totalPokemon} Pokémon
            </p>
          </div>
        )}
        
        {filteredPokemon.length === 0 && searchTerm ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <h2 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>No Pokémon found</h2>
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Try searching for a different name, type, or ability</p>
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
                    spotlightColor={theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}
                    theme={theme}
                  >
                    <PokemonCards
                      pokemonData={currentpokemon}
                      theme={theme}
                    />
                  </SpotlightCard>
                );
              })}
            </ul>

            {/* Pagination Buttons - Only show when not searching */}
            {!searchTerm && (
              <div className="flex justify-center items-center gap-4 mt-8 pb-8">
                {hasMoreData && displayedPokemon.length < totalPokemon && (
                  <button
                    onClick={fetchMorePokemon}
                    disabled={loadingMore}
                    className={`btn ${theme === "dark" ? "btn-primary" : "btn-secondary"} ${loadingMore ? "loading" : ""}`}
                  >
                    {loadingMore ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More Pokémon
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                )}

                {displayedPokemon.length > POKEMON_PER_PAGE && (
                  <button
                    onClick={showLessPokemon}
                    className={`btn ${theme === "dark" ? "btn-outline" : "btn-outline"} btn-sm`}
                  >
                    Show Less
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Pokemon;
