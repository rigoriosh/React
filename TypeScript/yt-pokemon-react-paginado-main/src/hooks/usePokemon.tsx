import { useState, useEffect } from 'react';

import { fetchAllPokemons } from '../helpers/fetchAllPokemons';
import { Pokemon } from '../interfaces/fetchAllPokemonResponse';


export const usePokemon = () => {
    
    const [ isLoading, setisLoading ] = useState(true);
    const [ pokemons, setPokemons ] = useState<Pokemon[]>([])
    console.log({pokemons})

    useEffect(() => {
        // Carga de los Pokemons
        fetchAllPokemons()
            .then( pokemons => { // toca utilizar el then , por lo que useEffect no se puede configurar como funcion async
                setisLoading(false);
                setPokemons( pokemons );
            })
    }, [])


    return {
        isLoading,
        pokemons
    }
}
