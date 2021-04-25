import React, { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReducer'

import './styles.css'
import { TodoList } from './TodoList'
import { TodoAdd } from './TodoAdd'

const init = () =>{
    // console.log('actualizando localStorage')
    return JSON.parse(localStorage.getItem('todos')) || []
}


export const TodoApp = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init)

    

    useEffect(() => {
        console.log('actualizando localStorage');
        localStorage.setItem('todos', JSON.stringify(todos));
        return () => {
            
        }
    }, [todos])

    

    const handleDelete = (todoId) => {
        console.log(todoId)
        dispatch({
            type: 'delete',
            payload: todoId
        })
    }

    const handleToggle = (todoId) => {
        dispatch({
            type: 'todoEnd',
            payload: todoId
        })
    }

    const handleAddTodo = (newTodo) => {
        dispatch({
            type: 'add',
            payload: newTodo
        })
    }

    return (
        <>
           <h3>TodoApp ( {todos.length} )</h3> 
           <hr/>
           <div className="row">
               <div className="col-7">
                   <TodoList todos={todos} handleDelete={handleDelete} handleToggle={handleToggle}/>                    
               </div>
               <div className="col-5">
                   <TodoAdd handleAddTodo={handleAddTodo}/>
               </div>
           </div>



           <div className="linea" ></div>
        </>
    )
}
