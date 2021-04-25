import React, { useMemo } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = ({history}) => {
    const {heroId} = useParams();
    
    const hero = useMemo(() => getHeroById(heroId), [heroId]) ; // se activa solo cuando cambia heroId

    if(!hero) {return <Redirect to="/" />}
    const {id, superhero, alter_ego, first_appearance, characters, publisher} = hero;

    const regresar = ()=>{
        (history.length < 3)? history.push('/') : history.goBack();
    }
    return (
        <>
        <h3>HeroScreen</h3>
            <Link to="/">return</Link>    
        <div className="row mt-5">
            <div className="col-4">
                <img src={`../assets/heroes/${id}.jpg`}
                className="img-thumbnail animate__animated animate__fadeInLeft" alt={superhero} />
            </div>
            <div className="col-8">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b>Alter ego:</b> {alter_ego}
                    </li>
                    <li className="list-group-item">
                        <b>Publisher:</b> {publisher}
                    </li>
                    <li className="list-group-item">
                        <b>First appearance:</b> {first_appearance}
                    </li>
                </ul>
                <h5>Characteres</h5>
                <p>{characters}</p>
                <button className="btn btn-outline-info" onClick={regresar}>
                    Return
                </button>
            </div>
        </div>
        </>
    )
}
