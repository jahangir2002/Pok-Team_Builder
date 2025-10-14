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

export const PokemonCards = ({ pokemonData }) => {
  return (
    <li className="flex justify-center items-center flex-col ">
      <figure className="w-48 h-48">
        <img
          className="w-full h-full object-fit-cover"
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
        />
      </figure>
      <h1 className="text-2xl font-black py-4">{pokemonData.name}</h1>

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

      <div className="grid grid-cols-2 gap-3 text-center pt-4 font-semibold">
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
    </li>
  );
};
