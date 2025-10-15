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
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const POKEMON_PER_PAGE = 20;
  const API_BASE = "https://pokeapi.co/api/v2/pokemon";

  const fetchAllPokemon = async () => {
    try {
      setLoading(true);
      // First, get the total count of Pokemon
      const countRes = await fetch(`${API_BASE}?limit=1`);
      const countData = await countRes.json();
      const totalCount = countData.count;
      setTotalPokemon(totalCount);
      setTotalPages(Math.ceil(totalCount / POKEMON_PER_PAGE));

      // Fetch all Pokemon URLs (without details first)
      const allRes = await fetch(`${API_BASE}?limit=${totalCount}`);
      const allData = await allRes.json();

      // Fetch details for first page Pokemon
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

  const fetchPagePokemon = async (pageNumber) => {
    if (loadingMore || pageNumber === currentPage) return;

    try {
      setLoadingMore(true);
      const startIndex = (pageNumber - 1) * POKEMON_PER_PAGE;
      const endIndex = Math.min(startIndex + POKEMON_PER_PAGE, allPokemon.length);
      
      const pageBatch = allPokemon.slice(startIndex, endIndex);
      const detailPokemon = pageBatch.map(async (currentpokemon) => {
        const currentres = await fetch(currentpokemon.url);
        const currentdata = await currentres.json();
        return currentdata;
      });

      const newPokemonData = await Promise.all(detailPokemon);
      setDisplayedPokemon(newPokemonData);
      setCurrentPage(pageNumber);
      setLoadingMore(false);
    } catch (error) {
      console.log(error);
      setLoadingMore(false);
      setError(error);
    }
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

            {/* DaisyUI Pagination - Only show when not searching */}
            {!searchTerm && totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 pb-8">
                <div className={`join ${theme === "dark" ? "join-ghost" : ""}`}>
                  {/* Previous Button */}
                  <button
                    onClick={() => fetchPagePokemon(currentPage - 1)}
                    disabled={currentPage === 1 || loadingMore}
                    className={`join-item btn ${theme === "dark" ? "btn-ghost" : "btn-outline"}`}
                  >
                    {loadingMore && currentPage > 1 ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </>
                    )}
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => fetchPagePokemon(pageNum)}
                        disabled={loadingMore}
                        className={`join-item btn ${
                          currentPage === pageNum
                            ? theme === "dark" 
                              ? "btn-primary" 
                              : "btn-secondary"
                            : theme === "dark" 
                              ? "btn-ghost" 
                              : "btn-outline"
                        }`}
                      >
                        {loadingMore && currentPage === pageNum ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          pageNum
                        )}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => fetchPagePokemon(currentPage + 1)}
                    disabled={currentPage === totalPages || loadingMore}
                    className={`join-item btn ${theme === "dark" ? "btn-ghost" : "btn-outline"}`}
                  >
                    {loadingMore && currentPage < totalPages ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>
                        Next
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Pokemon;
