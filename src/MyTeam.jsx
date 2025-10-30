import React, { useState, useEffect } from 'react'
import { PokemonCards } from "./PokemonCards";
import SpotlightCard from "./components/SpotlightCard";
import { useNavigate } from 'react-router-dom';
import RotatingTitle from './components/RotatingTitle';

const MyTeam = ({ theme, favoritePokemon, toggleFavorite, myTeamPokemon, toggleMyTeam }) => {
  const [teamPokemonDetails, setTeamPokemonDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPokemonDetails = async (pokemonIds) => {
    setLoading(true);
    setError(null);
    try {
      const detailsPromises = Array.from(pokemonIds).map(async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch Pokémon with ID ${id}`);
        }
        return res.json();
      });
      const details = await Promise.all(detailsPromises);
      setTeamPokemonDetails(details);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (myTeamPokemon.size > 0) {
      fetchPokemonDetails(myTeamPokemon);
    } else {
      setTeamPokemonDetails([]);
      setLoading(false);
    }
  }, [myTeamPokemon]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className={`loading loading-spinner loading-lg ${theme === "dark" ? "text-cyan-500" : "text-red-600"}`}></div>
          <h1 className={`text-xl font-semibold mt-4 ${theme === "dark" ? "text-white" : "text-black"}`}>Loading your team...</h1>
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
    <section className="max-w-screen-xl md:px-4 m-auto pb-5">
      <RotatingTitle theme={theme}/>
        <div className='flex justify-between'>
<h1 className={`text-3xl font-bold text-start mb-6 ${theme === "dark" ? "text-white" : "text-black"}`}>My Pokémon Team ({myTeamPokemon.size}/6)</h1>

      <div className='flex justify-end gap-4'>
      <button className={`btn btn-outline ${theme === "dark" ? "btn-info" : "btn-error"}`} onClick={() => navigate("/")}>View All Pokémon</button>
      <button className={`btn btn-outline ${theme === "dark" ? "btn-info" : "btn-error"}`}onClick={()=> navigate("/MyFavorites")}>My Favorite Pokémon</button>
      </div>
        </div>
      
      {teamPokemonDetails.length === 0 ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <h2 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Your team is empty!</h2>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Add some Pokémon to your team from the main page.</p>
          </div>
        </div>
      ) : (
        <ul className="cards px-5 md:px-0 grid md:grid-cols-3 gap-5">
          {teamPokemonDetails.map((currentpokemon) => (
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
          ))}
        </ul>
      )}
    </section>
  )
}

export default MyTeam