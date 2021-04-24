import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {
    
    const {notes} = useSelector( state => state.notesReducer );
    
    //console.log(notes)
    return (
        <div className="journal__entries">
            {
                notes.map((e, i) => (
                    <JournalEntry key={e.id} {...e}/>
                ))
            }
        </div>
    )
}
