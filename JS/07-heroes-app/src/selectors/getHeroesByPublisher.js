import {heroes} from '../data/heroes';

export const getHeroesByPublisher = (publisher) => {
    
    const validPublishers = ['DC Comics', 'Marvel Comics'];

    if (!validPublishers.includes(publisher)) {
        throw Error(`Publisher "${publisher}" is not valid`)
    }

    return heroes.filter(h => h.publisher === publisher);
}
