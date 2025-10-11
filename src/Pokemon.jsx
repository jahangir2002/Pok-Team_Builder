import React, { useEffect } from 'react'

const Pokemon = () => {

    const API = "https://pokeapi.co/api/v2/pokemon/?limit=24";

    const fetchpokemon =  async()=> {
        try {
            const res = await fetch(API);
            const data = await res.json();
            // console.log(data);

            const detailpokemon = data.results.map(async(currentpokemon)=> {
                // console.log(currentpokemon.url)

                const currentres = await fetch(currentpokemon.url)
                const currentdata = await currentres.json();
                console.log(currentdata);
            })



        } catch (error) {
            console.log(error);
            
        }
    }



    useEffect(() => {
        fetchpokemon();
        
    })

  return (

    <>
    <div className='max-w-[1400px] m-auto'>Pokemon</div>
    </>

  )
}

export default Pokemon