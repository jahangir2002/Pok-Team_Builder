export const PokemonCards = ({pokemonData}) => {
    return (
        <li className="flex justify-center ">
            <figure className="w-48 h-48">
                <img className="w-full h-full object-fit-cover" src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} />
            </figure>
        </li>
    )
}