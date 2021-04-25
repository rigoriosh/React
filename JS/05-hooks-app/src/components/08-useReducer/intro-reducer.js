

const initialState = [{
    id: 1,
    todo: 'buy bread',
    done: false
}]

const todoReducer = (state = initialState, action) => {
    if(action?.type === 'agregar'){
        return [...state, action.payload]
    }
    return state;
}

let todos = todoReducer();

const newTodo = {
    id: 2,
    todo: 'buy milk',
    done: false
}

const agregarToDo = {
    type: 'agregar',
    payload: newTodo
}

todos = todoReducer(todoReducer(), agregarToDo);

//console.log(todos)