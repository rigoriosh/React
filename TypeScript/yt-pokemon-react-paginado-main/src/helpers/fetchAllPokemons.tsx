import { pokemonApi } from '../api/pokemonApi';
import { FetchAllPokemonResponse, Pokemon, SmallPokemon } from '../interfaces/fetchAllPokemonResponse';


export const fetchAllPokemons = async(): Promise<Pokemon[]> => {
    
    const resp = await pokemonApi.get<FetchAllPokemonResponse>('/pokemon?limit=1500');
    console.log(resp);
    const smallPokemonList = resp.data.results;

    return transformSmallPokemonIntoPokemon( smallPokemonList );
}

// ajsuta la data como se necesita
const transformSmallPokemonIntoPokemon = ( smallPokemonList: SmallPokemon[] ): Pokemon[] => {

    const pokemonArr: Pokemon[] = smallPokemonList.map( poke => {

        const pokeArr = poke.url.split('/');
        //console.log(pokeArr)
        const id  = pokeArr[6];
        const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`;

        return {
            id,
            pic,
            name: poke.name,
        }
    });
    
    return pokemonArr;
}