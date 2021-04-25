 import { useCounter } from '../../hooks/useCounter';
import { useFetch } from '../../hooks/useFetch'

export const MultipleCustomHooks = () => {

    const {contador, accion} = useCounter(1);    
       const fech = useFetch(`https://www.breakingbadapi.com/api/quotes/${contador}`);
   
    const {data, loading} = fech;

    const {author, quote} = !!data && data[0];   
    
    function myAccion(params) {
        //console.log('here')
        accion('sumar');
    }

    return (
        <>
        <h1>BreakingBad Post</h1>
        <hr/>

        {
            loading ?
            (<div className="alert alert-info text-center">Loading...</div>)
            :
            (
                <blockquote className="blockquote text-right">
                    <p className="mb-0">{quote}</p>
                    <footer className="blockquote-footer">{author}</footer>
                </blockquote>
            )        
        }
        <button className="btn btn-primary" onClick={myAccion}>Next Quote</button>

        <div className="linea"></div>        
        </>
    )
}
