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

      <div>
        <p className="font-mono bg-red-600 p-2 rounded-full">
          {pokemonData.types.map((curtype) => curtype.type.name).join(", ")}
        </p>
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
