import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroList = ({publisher}) => {
    //const heroesFunt = getHeroesByPublisher(publisher);
    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]); // se activa solo cuando cambia publisher
    return (
        <div className="card-columns animate__animated animate__backInDown">
            {
                heroes.map(h => (
                    <HeroCard key={h.id} hero={h}/>
                ))
            }
        </div>
    )
}
