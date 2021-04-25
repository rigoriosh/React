import moment from 'moment';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUpLoadig } from '../../actions/notesActions';

export const NotesAppBar = () => {
    
    const dispatch = useDispatch();
    const {noteActive} = useSelector( state => state.notesReducer );

    
    const save = () => {
        /* Realiza la logica para guardar en fireBase */
        dispatch(startSaveNote(noteActive));
    }
    
    const cargarImagen = () => {        
        document.querySelector('#idSelectArchvio').click(); //simula que se dió un click en el input tipo file
    }

    const handleChangeFile = (e) => {
        //console.log(e.target.files)
        const file = e.target.files[0];
        if (file) {
            dispatch(startUpLoadig(file));
        } else {
            
        }
    }
    return (
        <div className="notes__appbar">
            <span>{moment().format("MMM Do YY")}</span>
            {/* Cargar imagen */}
            <input id="idSelectArchvio" type="file" style={{display: 'none'}} onChange={handleChangeFile} name='archivoCargado'/>
            <div>
                <button onClick={cargarImagen} className="btn fz-1">Cargar imagen</button>
                <button onClick={save} className="btn fz-1">Guarda nota</button>
            </div>
        </div>
    )
}
