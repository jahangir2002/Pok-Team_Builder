import { FaPlus, FaMinus } from "react-icons/fa";

// Pokemon type color mapping
const getTypeColor = (typeName) => {
  const typeColors = {
    normal: 'bg-gray-500',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-cyan-400',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-600',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-800',
    steel: 'bg-gray-400',
    fairy: 'bg-pink-300'
  };
  return typeColors[typeName] || 'bg-gray-500';
};

export const PokemonCards = ({ pokemonData, theme, favoritePokemon, toggleFavorite, myTeamPokemon, toggleMyTeam }) => {
  const isFavorite = favoritePokemon.has(pokemonData.id);
  const isInMyTeam = myTeamPokemon.has(pokemonData.id);
  
  const handleFavoriteClick = () => {
    toggleFavorite(pokemonData.id);
  };
  return (
    <li className="flex justify-center items-center flex-col">
      <button 
        className="w-full transition-transform duration-200 cursor-pointer" 
        onClick={handleFavoriteClick}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill={isFavorite ? "#ef4444" : "none"} 
          stroke={isFavorite ? "#ef4444" : (theme === "dark" ? "#ffffff" : "#000000")} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
        </svg>
      </button>
      
      <figure className="w-40 h-40">
        <img
          className="w-full h-full object-fit-cover"
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
        />
      </figure>
      <h1 className={`text-2xl font-black py-4 ${theme === "dark" ? "text-white" : "text-black"}`}>{pokemonData.name}</h1>

      <div className="flex flex-wrap gap-2 justify-center">
        {pokemonData.types.map((curtype, index) => (
          <p 
            key={index}
            className={`font-mono ${getTypeColor(curtype.type.name)} text-white px-3 py-2 rounded-full text-sm font-semibold`}
          >
            {curtype.type.name.charAt(0).toUpperCase() + curtype.type.name.slice(1)}
          </p>
        ))}
      </div>

      <div className={`grid grid-cols-2 gap-3 text-center pt-4 font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
        <p>Height : {pokemonData.height}</p>
        <p>Weight : {pokemonData.weight}</p>
        <p>
          Attack :{" "}
          {pokemonData.stats.find((stat) => stat.stat.name === "attack")
            ?.base_stat || "N/A"}
        </p>
        <p>
          Speed :{" "}
          {pokemonData.stats.find((stat) => stat.stat.name === "speed")
            ?.base_stat || "N/A"}
        </p>
        <p>
          Abilities :{" "}
          {pokemonData.abilities
            .map((curAbility) => curAbility.ability.name)
            .join(", ")}
        </p>
        <p>Experience: {pokemonData.base_experience}</p>
      </div>
      <button 
        className={`btn btn-outline mt-4 ${theme === "dark" ? "btn-info" : "btn-error"}`}
        onClick={() => toggleMyTeam(pokemonData.id)}
      >
        {isInMyTeam ? <><FaMinus /> REMOVE FROM TEAM</> : <><FaPlus /> ADD TO TEAM</>}
      </button>
    </li>
  );
};
