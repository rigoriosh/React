import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startDeleteNote, updateNote } from '../../actions/notesActions';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const {noteActive} = useSelector( state => state.notesReducer );  
    const [fields, handledInputChange, resetFields] = useForm(noteActive);
    const {title, url, /* date,  */body, id} = fields; 
    const activeId = useRef(noteActive.id);
    const dispatch = useDispatch();

    useEffect(() => {
        /* logica para reset useForm y poder actualizar el useForm y que no entre en ciclo infinito*/
        if (noteActive.id !== activeId.current) {
            resetFields(noteActive);
            activeId.current = noteActive.id;
        }
    }, [noteActive, resetFields])  
    //console.log(fields)
    
    useEffect(() => {
        dispatch(updateNote(fields));//actualiza solo la nota activa, mas no el listado de notas
    }, [dispatch, fields])

    const deleteNoteToDB = () => {
        dispatch(startDeleteNote(id));
    }
    return (
        <div className="notes__main-content animate__animated animate__bounce">
            <NotesAppBar/>
            <div className="notes__content">
                <input type="text" placeholder="Ingresa un titulo para esta nota" className="notes__title-input"
                    onChange={handledInputChange} name="title" value={title}/>

                <textarea value={body} onChange={handledInputChange} name="body" id="" cols="30" rows="10" 
                    placeholder="y la descrición de la nota, y opcional sube una imagen" className="notes__textarea"/>
                {
                    url &&
                    <div className="notes__image">
                        <img src={url} alt="Imagen"/>
                    </div>
                }
            </div>
            <button onClick={deleteNoteToDB} className="btn btn-danger">Eliminar Nota</button>
        </div>
    )
}
