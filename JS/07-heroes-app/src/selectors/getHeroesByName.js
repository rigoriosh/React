import { heroes } from "../data/heroes"


export const getHeroesByName = (name = '') => {
    if(name === '') return []
    name = name.toLowerCase();
    return heroes.filter(h => h.superhero.toLowerCase().includes(name))
}
