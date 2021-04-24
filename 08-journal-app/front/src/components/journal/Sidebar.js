import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogOut } from '../../actions/auth';
import { startNewNotes } from '../../actions/notesActions';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(startLogOut());
    }
    const {name} = useSelector( state => state.authReducer );   

    const journalNewEntry = () => {
        dispatch(startNewNotes()); //esta action almacenó la plantilla de una nueva entrada en cloudfireStore

    }
    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon mr-3"></i>
                    <span> Hola { name}</span>
                </h3>
                <button className="btn btn-primary" onClick={handleLogOut}>Salir</button>
            </div>
            <div className="journal__new-entry mb-5" onClick={journalNewEntry}>
                <i className="far fa-calendar-plus fa-1x"></i>
                <p className="mt-5">Nueva Nota</p>
            </div>
            <JournalEntries/>
        </aside>
    )
}
 