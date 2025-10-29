import React, { useEffect, useState, useMemo } from "react";
import { PokemonCards } from "./PokemonCards";
import SpotlightCard from "./components/SpotlightCard";
import MyFavorites from "./MyFavorites";
import { useNavigate } from "react-router-dom";

const Pokemon = ({ searchTerm, theme, favoritePokemon, toggleFavorite, myTeamPokemon, toggleMyTeam }) => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Search-specific state
  const [isSearching, setIsSearching] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchUrls, setSearchUrls] = useState([]); // URLs of pokemon that match search
  const [searchDisplayed, setSearchDisplayed] = useState([]); // detailed data for current search page
  const [searchPage, setSearchPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(0);

  const navigate = useNavigate();

  const POKEMON_PER_PAGE = 20;
  const API_BASE = "https://pokeapi.co/api/v2/pokemon";
  const TYPE_API = "https://pokeapi.co/api/v2/type";
  const ABILITY_API = "https://pokeapi.co/api/v2/ability";

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
      // console.log("All Pokemon URLs fetched:", allData.results);

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

  // Fetch detailed data for a list of pokemon resource objects { name, url }
  const fetchDetailsForList = async (list) => {
    const detailPromises = list.map(async (p) => {
      const res = await fetch(p.url);
      const data = await res.json();
      return data;
    });
    return await Promise.all(detailPromises);
  };

  // SEARCH: query API across name/type/ability; paginate results client-side with POKEMON_PER_PAGE
  const performApiSearch = useMemo(() => {
    return async (term, page) => {
      const q = term.trim().toLowerCase();
      if (!q) return { urls: [], pageData: [] };

      setSearchLoading(true);
      try {
        // Name matches from allPokemon list (preloaded URLs)
        const nameMatches = allPokemon.filter(p => p.name.toLowerCase().includes(q));

        // Type matches: GET /type/{q} if exists
        let typeMatches = [];
        try {
          const typeRes = await fetch(`${TYPE_API}/${q}`);
          if (typeRes.ok) {
            const typeData = await typeRes.json();
            typeMatches = typeData.pokemon.map((wrapper) => wrapper.pokemon);
          }
        } catch (_) {}

        // Ability matches: GET /ability/{q} if exists
        let abilityMatches = [];
        try {
          const abilityRes = await fetch(`${ABILITY_API}/${q}`);
          if (abilityRes.ok) {
            const abilityData = await abilityRes.json();
            abilityMatches = abilityData.pokemon.map((wrapper) => wrapper.pokemon);
          }
        } catch (_) {}

        // Merge urls unique by name
        const byName = new Map();
        [...nameMatches, ...typeMatches, ...abilityMatches].forEach((p) => {
          byName.set(p.name, p);
        });
        const mergedList = Array.from(byName.values());

        // Paginate
        const start = (page - 1) * POKEMON_PER_PAGE;
        const pageSlice = mergedList.slice(start, start + POKEMON_PER_PAGE);
        const pageData = await fetchDetailsForList(pageSlice);

        return { urls: mergedList, pageData };
      } finally {
        setSearchLoading(false);
      }
    };
  }, [allPokemon]);

  // Manage search lifecycle
  useEffect(() => {
    const run = async () => {
      const term = searchTerm.trim();
      if (!term) {
        setIsSearching(false);
        setSearchUrls([]);
        setSearchDisplayed([]);
        setSearchPage(1);
        return;
      }

      setIsSearching(true);
      setSearchPage(1);
      const { urls, pageData } = await performApiSearch(term, 1);
      setSearchUrls(urls);
      setSearchDisplayed(pageData);
      setSearchTotalPages(Math.ceil(urls.length / POKEMON_PER_PAGE));
    };
    run();
  }, [searchTerm, performApiSearch]);

  const goToSearchPage = async (page) => {
    if (page < 1) return;
    if (page > searchTotalPages) return;
    const term = searchTerm.trim();
    if (!term) return;
    setSearchPage(page);
    const start = (page - 1) * POKEMON_PER_PAGE;
    const slice = searchUrls.slice(start, start + POKEMON_PER_PAGE);
    const pageData = await fetchDetailsForList(slice);
    setSearchDisplayed(pageData);
  };

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
      <section className="max-w-screen-xl md:px-4 m-auto">
        <div className="text-end px-5 pb-2 flex justify-end gap-4">
          <button className={`btn btn-soft ${theme === "dark" ? "btn-info" : "btn-error"}`}onClick={()=> navigate("/MyFavorites")}>My Favorite Pokémon</button>
          <button className={`btn btn-outline ${theme === "dark" ? "btn-info" : "btn-error"}`}onClick={()=> navigate("/MyTeam")}>My Team</button>
        </div>
        {isSearching && (
          <div className="px-5 md:px-0 mb-4">
            <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              {searchUrls.length} Pokémon found for "{searchTerm}"
            </p>
          </div>
        )}

        {!isSearching && (
          <div className="px-5 md:px-0 mb-4">
            <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Showing {displayedPokemon.length} of {totalPokemon} Pokémon
            </p>
          </div>
        )}
        
        {isSearching && searchUrls.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <h2 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>No Pokémon found</h2>
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Try searching for a different name, type, or ability</p>
            </div>
          </div>
        ) : (
          <div>
            <ul className="cards px-5 md:px-0 grid md:grid-cols-3 gap-5">
              {(isSearching ? searchDisplayed : displayedPokemon).map((currentpokemon) => {
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
                      favoritePokemon={favoritePokemon}
                      toggleFavorite={toggleFavorite}
                      myTeamPokemon={myTeamPokemon}
                      toggleMyTeam={toggleMyTeam}
                    />
                  </SpotlightCard>
                );
              })}
            </ul>

            {/* DaisyUI Pagination - normal mode */}
            {!isSearching && totalPages > 1 && (
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

            {/* DaisyUI Pagination - search mode */}
            {isSearching && searchTotalPages > 1 && (
              <div className="flex justify-center items-center mt-8 pb-8">
                <div className={`join ${theme === "dark" ? "join-ghost" : ""}`}>
                  <button
                    onClick={() => goToSearchPage(searchPage - 1)}
                    disabled={searchPage === 1 || searchLoading}
                    className={`join-item btn ${theme === "dark" ? "btn-ghost" : "btn-outline"}`}
                  >
                    {searchLoading && searchPage > 1 ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>Previous</>
                    )}
                  </button>

                  {Array.from({ length: Math.min(5, searchTotalPages) }, (_, i) => {
                    let pageNum;
                    if (searchTotalPages <= 5) {
                      pageNum = i + 1;
                    } else if (searchPage <= 3) {
                      pageNum = i + 1;
                    } else if (searchPage >= searchTotalPages - 2) {
                      pageNum = searchTotalPages - 4 + i;
                    } else {
                      pageNum = searchPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToSearchPage(pageNum)}
                        disabled={searchLoading}
                        className={`join-item btn ${
                          searchPage === pageNum
                            ? theme === "dark" 
                              ? "btn-primary" 
                              : "btn-secondary"
                            : theme === "dark" 
                              ? "btn-ghost" 
                              : "btn-outline"
                        }`}
                      >
                        {searchLoading && searchPage === pageNum ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          pageNum
                        )}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => goToSearchPage(searchPage + 1)}
                    disabled={searchPage === searchTotalPages || searchLoading}
                    className={`join-item btn ${theme === "dark" ? "btn-ghost" : "btn-outline"}`}
                  >
                    {searchLoading && searchPage < searchTotalPages ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>Next</>
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
