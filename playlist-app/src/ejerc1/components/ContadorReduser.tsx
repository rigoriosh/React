import { useReducer } from "react";

const initialState = {
    contador: 10
}

type Actiontypes = 
    |{ type: 'incrementar'}
    |{type: 'decrementar'}
    |{type: 'custom', payload: number};

const contadorReducer = (state: typeof initialState, action: Actiontypes) => {

    switch (action.type) {
        case 'incrementar':            
            return {
                ...state,
                contador: state.contador + 1
            };
        case 'decrementar':            
            return {
                ...state,
                contador: state.contador - 1
            };    
        case 'custom':            
            return {
                ...state,
                contador: action.payload
            };    
        default:
            return state;
    }
}

export const ContadorReduser = () => {
    const [stateContador, dispatchContador] = useReducer(contadorReducer, initialState);
    return (
        <>
            <hr/>
            <h1>use Reducer</h1>
            <h2>Contador: {stateContador.contador}</h2>
            <button onClick={()=>dispatchContador({type:'incrementar'})} className="btn btn-outline-success">+</button>
            <button onClick={()=>dispatchContador({type:'decrementar'})} className="btn btn-outline-warning">-</button>
            <button onClick={()=>dispatchContador({type:'custom', payload: 100})} className="btn btn-outline-light">100</button>

        </>
    )
}
