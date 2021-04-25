import React from 'react'
import { CounterApp } from './components/01-useState7/CounterApp'
import { SimpleForm } from './components/02-useEffect/SimpleForm'
import { MultipleCustomHooks } from './components/03-examples/MultipleCustomHooks'
import { FocusScreem } from './components/04-useRefe/FocusScreem'
import { RealExampleRef } from './components/04-useRefe/RealExampleRef'
import { Padre } from './components/07-tarea-memo/Padre'
import { TodoApp } from './components/08-useReducer/TodoApp'

export const HookApp = () => {
    return (
        <>
            <h2><i className="fas fa-h1    "> Hi Rigo</i></h2>
            <TodoApp/>
            <Padre/>
            <RealExampleRef/>
            <FocusScreem/>
            <MultipleCustomHooks/>
            <CounterApp/>            
            <SimpleForm/>            
        </>
    )
}
