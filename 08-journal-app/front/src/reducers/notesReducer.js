import { types } from "../types/types";

const initialState = {
    notes: [],
    noteActive: {
        id:'',
        title: '',
        body: '',
        imageUrl: '',
        date: 0
    }
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActive:        
            return {
                ...state,
                noteActive: {
                    ...action.payload
                }
            }
        case types.notesAddNew:
            //console.log(state.notes);
            
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            }
        case types.notesLoad:            
            return {
                ...state,
                notes: action.payload
            }
        case types.notesUpDated:
            return {
                ...state,
                noteActive: action.payload
            }
        case types.updateNoteById:
            return {
                ...state,
                /* recorre todas la notas y si coinciden sus id's, modifica esa nota del array de lo contrario lo mantiene */
                notes: state.notes.map(note => (note.id === action.payload.id) ? action.payload.note : note )
            }
            case types.notesDelete:
                return {
                    ...state,
                    noteActive: initialState.noteActive,
                    notes: state.notes.filter(note => note.id !== action.payload)//devuelve arreglo de notas pero menos la q coincidan los ids
                } 
            case types.notesLogOutCleaning:
                return initialState   
        default:
            return state;
    }
}
