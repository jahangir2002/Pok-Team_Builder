import React, { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";
import SpotlightCard from "./components/SpotlightCard";
import { useNavigate } from "react-router-dom";
import RotatingTitle from "./components/RotatingTitle";

const MyFavorites = ({
  theme,
  favoritePokemon,
  toggleFavorite,
  myTeamPokemon,
  toggleMyTeam,
}) => {
  const [favoritePokemonData, setFavoritePokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoritePokemon = async () => {
      setLoading(true);
      try {
        const storedFavorites = localStorage.getItem("favoritePokemon");
        if (storedFavorites) {
          const favoriteIds = JSON.parse(storedFavorites);
          const pokemonDetailsPromises = favoriteIds.map(async (id) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            if (!res.ok) {
              throw new Error(`Failed to fetch Pokémon with ID: ${id}`);
            }
            return await res.json();
          });
          const details = await Promise.all(pokemonDetailsPromises);
          setFavoritePokemonData(details);
        }
      } catch (err) {
        console.error("Error fetching favorite Pokémon:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritePokemon();
  }, [favoritePokemon]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div
            className={`loading loading-spinner loading-lg ${
              theme === "dark" ? "text-cyan-500" : "text-red-600"
            }`}
          ></div>
          <h1
            className={`text-xl font-semibold mt-4 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Loading your favorite Pokémon...
          </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <h1
            className={`text-xl font-semibold ${
              theme === "dark" ? "text-red-400" : "text-red-600"
            }`}
          >
            Error: {error.message}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-screen-xl md:px-4 m-auto mb-10">
        <RotatingTitle theme={theme} />
        <div className="flex flex-col md:flex-row justify-between">
          <h1
            className={`text-3xl font-bold px-5 md:px-0 mb-6 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            My Favorite Pokémon
          </h1>
          <div className="flex justify-start md:justify-end  gap-4 px-5 md:px-0 mb-6">
            <button
              className={`btn btn-outline ${
                theme === "dark" ? "btn-info" : "btn-error"
              }`}
              onClick={() => navigate("/")}
            >
              View All Pokémon
            </button>
            <button
              className={`btn btn-outline ${
                theme === "dark" ? "btn-info" : "btn-error"
              }`}
              onClick={() => navigate("/MyTeam")}
            >
              My Team
            </button>
          </div>
        </div>

        {favoritePokemonData.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p
              className={`text-lg ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No favorite Pokémon added yet.
            </p>
          </div>
        ) : (
          <ul className="cards px-5 md:px-0 grid md:grid-cols-3 gap-5">
            {favoritePokemonData.map((pokemon) => (
              <SpotlightCard
                key={pokemon.id}
                className="custom-spotlight-card transition-transform duration-300 hover:scale-105 cursor-pointer"
                spotlightColor={
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.2)"
                }
                theme={theme}
              >
                <PokemonCards
                  pokemonData={pokemon}
                  theme={theme}
                  favoritePokemon={favoritePokemon}
                  toggleFavorite={toggleFavorite}
                  myTeamPokemon={myTeamPokemon}
                  toggleMyTeam={toggleMyTeam}
                />
              </SpotlightCard>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default MyFavorites;
