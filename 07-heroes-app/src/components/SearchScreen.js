import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useForm } from '../hooks/useForm';
import { HeroCard } from './heroes/HeroCard';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../selectors/getHeroesByName';

export const SearchScreen = ({history}) => {

    const location = useLocation();
    
    const { q = '' } = queryString.parse(location.search);
    
    const [fields, handledInputChange] = useForm({textHero: q});

    const {textHero} = fields
    const heroresFilter = useMemo(() => getHeroesByName(q), [q])

    const handleSubmit = (e)=>{
        e.preventDefault();
        history.push(`?q=${textHero}`);
    }
    return (
        <div>
            <h1>Search screen</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Search form</h4>
                    <hr/>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Find your hero" name="textHero"
                            className="form-control" value={textHero} onChange={handledInputChange}/>
                        <button type="submit" className="btn m-1 btn-block btn-outline-primary">
                            Search...
                        </button>
                    </form>
                </div>
                {
                    (q === '' ) &&
                        <div className="alert alert-info">Search a Hero</div>
                }
                {
                    (q !== '' && heroresFilter.length === 0) &&
                        <div className="alert alert-info">There is not a Hero with {q}</div>
                }
                {
                    (heroresFilter.length > 0 || q !== '') &&
                        <div className="col-7">
                            <h4>Results</h4>
                            <hr/>
                            {
                                heroresFilter.map(h => (
                                    <HeroCard key={h.id} hero={h}/>
                                ))
                            }
                        </div>
                }
                
            </div>
        </div>
    )
}
