import React, { useEffect, useMemo, useState } from 'react'
import {of, interval} from 'rxjs'
import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import List from './components/List'
import useObservable from './hooks/useObservable';

const source = ['Adam', 'Brian', 'Christine'];
export const App = () => {
    
    const [names, setNames] = useState([]);
    const api = `https://randomuser.me/api/?results=15&seed=rx-react&nat=us&inc=name&noinfo`;
    const getName = user => `${user.name.title} ${user.name.first} ${user.name.last}`;
    
    console.log(names);
    //const names$ = of(source);
    /* const names$ = interval(1000).pipe(map(i => {        
        return source.slice(0, i + 1)
    })); */
    const names$ = ajax.getJSON(api).pipe(
        map(({results: users}) => users.map(getName))
    );       
   

    const name = useObservable(names$)
    console.log(name);

    /* useMemo(() => {
        console.log(name);
        setNames(name)
    }, [name]) */

    useEffect(() => {
        console.log(name);
        setNames(name)
        return () => {}
    }, [name])

    

    return (
        <div className="App">
            <h1>RxJS with React</h1>

            

            {
                !!names && names.length > 0 && <List items={names} />
            }
            
        </div>
    )
}
