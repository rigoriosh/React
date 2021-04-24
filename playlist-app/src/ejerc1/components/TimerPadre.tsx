import { useState } from "react";
import { Timer } from "./Timer"


export const TimerPadre = () => {
    const [millisegundos, setMillisegundos] = useState(1000);
    return (
        <>
            <span>Milisegundos {millisegundos}</span>
            <br/>
            <button onClick={() => setMillisegundos(1000)} className="btn btn-outline-info">1000</button>
            <button onClick={() => setMillisegundos(5000)} className="btn btn-outline-info">2000</button>
            <Timer millisegundos={millisegundos}/>
        </>
    )
}
