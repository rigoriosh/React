import React from 'react'
import { useForm } from '../../hooks/useForm';

export const TodoAdd = ({handleAddTodo}) => {

    const [{description}, handledInputChange, resetFields] =  useForm({description:''});

    const handleSubmit = (e) => {
        e.preventDefault();
        if(description.trim().length <= 1) return;
        handleAddTodo({
            type: 'add',
            payload: {
                id: new Date().getTime(),
                desc: description,
                done: false
            }
        });
        resetFields();
    }
    return (
        <>
            <h4>Agregar TODO</h4>
            <hr/>
            <form onSubmit={handleSubmit}>
                <input type="text" name="description" placeholder="Aprender ..." className="form-control"
                        onChange={handledInputChange} value={description}/>
                <button type="submit" onClick={handledInputChange} className="btn btn-success mt-1 btn-block">Agregar</button>
            </form>
        </>
    )
}
