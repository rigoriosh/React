import React from 'react'
import { ContadorReduser } from './components/ContadorReduser'
import { Counter } from './components/Counter'
import { Formulario } from './components/Formulario'
import { TimerPadre } from './components/TimerPadre'
import { Usuario } from './components/Usuario'

export const HomeE1 = () => {
    return (
        <div>
            <hr/>
            <Counter/>
            <Usuario/>
            <hr/>
            <h2>useEffec - useRef</h2>
            <TimerPadre/>
            <ContadorReduser/>
            <hr/>
            <Formulario/>
        </div>
    )
}
