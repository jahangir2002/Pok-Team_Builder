import React, { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";
import SpotlightCard from "./components/SpotlightCard";

const Pokemon = () => {
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

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-[1400px] m-auto">
        <div>
          <ul className="cards px-5 md:px-0 grid md:grid-cols-3 gap-5">
            {poke.map((currentpokemon) => {
              return (
                <SpotlightCard
                  className="custom-spotlight-card transition-transform duration-300 hover:scale-105 cursor-pointer"
                  spotlightColor="rgba(255, 255, 255, 0.2)"
                >
                  <PokemonCards
                    key={currentpokemon.id}
                    pokemonData={currentpokemon}
                  />
                </SpotlightCard>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Pokemon;
