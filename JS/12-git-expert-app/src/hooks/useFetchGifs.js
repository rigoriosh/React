import { useEffect, useState } from "react";
import { getGifs } from "../helpers/utils";

export const useFetchGifs = (category) => {

    const [imagenes, setGifts] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const traerGifs = async()=>{
        const data = await getGifs(category)
        setGifts(data);
        console.log(data);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        traerGifs();
      return () => {}
    }, [])
    
    return {
        imagenes,
        isLoading
    }
}
