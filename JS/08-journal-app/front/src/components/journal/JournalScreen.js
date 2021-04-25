import React from 'react'
import { useSelector } from 'react-redux';
import { NoteScreen } from '../note/NoteScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {
    const {noteActive} = useSelector( state => state.notesReducer );
    //console.log({notes}, {noteActive})
    return (
        <div className="journal__main-content animate__animated animate__bounce">
            
            <Sidebar/>

            <main>
                {
                    (noteActive.id !== '')
                        ?  (<NoteScreen/>)
                        : (<NothingSelected/>)
                }
            </main>
        </div>
    )
}
