
import { useEffect, useState } from 'react'

export const useFetch = (url) => {

    const dataInit = {data: null, loading: true, error: null}

    const [state, setState] = useState(dataInit)

    const [show, setshow] = useState(true)


    useEffect(() => {

        setState(dataInit);
        
        fetch(url)
        .then(resp => resp.json())
        .then(data => {
            if(show){
                setTimeout(() => {
                    setState({
                        error: null,
                        loading: false,
                        data
                    })
                }, 2000);
                
            }else{
                //console.log('se cancelo el setState')
            }
            
        })
        return () => {
            //console.log(show)
            setshow(s => s = !show)
        }
        
    }, [url, show])

    return state
}
