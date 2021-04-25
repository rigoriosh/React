import Swal from "sweetalert2";
import { dbFirebase } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { subirArchivo } from "../helpers/subirArchivo";
import { types } from "../types/types";

/* como es una asyncorona por eso retorna una fun callBack */
export const startNewNotes = () => {
    return async(dispath, getState) => { /* getState, sirve para leer el store */
        const {uid} = getState().authReducer;
        //console.log(uid);
        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime()
        }

         const docRef = await dbFirebase.collection(`${uid}/journal/notes`).add(newNote);         
         //console.log(docRef.id)
         dispath(activarNota(docRef.id, newNote));
         dispath(actualizarNotaSideBar(docRef.id, newNote));
    }
}

export const activarNota = (id, nota) => {/* el id es el id de la nota en DB, no el UID */
    return {
        type: types.notesActive,
        payload: {id, ...nota} // ...nota es el espret de la nota para q se valla destructurada
    }
}

export const actualizarNotaSideBar = (id, newNote) => (
    {
        type: types.notesAddNew,
        payload: {id, ...newNote}
    }
)

export const startLoadingNotes = (uid) => {
    return (dispath) => {
        /* // trae las notas desde la DB de firestore */
        loadNotes(uid).then(notes => {
            dispath(setNotesInStore(notes));
        });
    }
}

export const setNotesInStore = (notes) => {
    //console.log(notes)
    return {
        type: types.notesLoad,
        payload: notes
    }
}

export const updateNote = (note) => { //actualiza solo la nota activa, mas no el listado de notas
    return {
        type: types.notesUpDated,
        payload: note
    }
}

/*  
    la forma ({ es para evitarse el return x por lo que es directo, 
    se utiliza en este caso para el midleware por q retorrna una funcion en este caso el callback
 */
export const startSaveNote = (note) => {
    /* logica para guarda en firebase */
    return async(dispath, getState) => {
        const {uid} = getState().authReducer;

        const noteToFireStore = {...note};
        delete noteToFireStore.id;
        if(!noteToFireStore.url) delete noteToFireStore.url
        
        await dbFirebase.doc(`${uid}/journal/notes/${note.id}`).update(noteToFireStore);

        /*  Ahora actualiza el registro guardado y que se refleje en la lista del bideSide*/
        dispath(refreshNote(note.id, noteToFireStore));
        Swal.fire('Guardado', note.title, 'success');
    }
}
/*  
    la forma ({ es para evitarse el return x lo q es directo, se utiliza en este caso un bojeto
 */
export const refreshNote = (id, note) => (/* refrescar la nota en el bidesider derecho, pero no actualiza toda la lista, solo el guardado o modificado */
    { 
        type: types.updateNoteById, //actualiza solo un registro q coincida con el id
        payload: {
            id,
            note: {
                id,
                ...note
            }
        }
    }
)

/* Inicial el proceso de carga de una imagen, es asincrona por eso retorna un callback ({*/
export const startUpLoadig = (archivo) => {
    return async(dispath, getState) => { //el dispath es para tener acceso a todas als actiones y el getState es para tener acceso al store        
        const {noteActive} = getState().notesReducer;

        Swal.fire({
            title: 'Uploading....',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
            allowEnterKey: false
        })
        const urlImagen = await subirArchivo(archivo);
        noteActive.url = urlImagen;
        dispath(startSaveNote(noteActive));
        Swal.close();
        //console.log(urlImagen)
    }
}

export const startDeleteNote = (idNote) => {
    return async(dispath, getState)=>{ // gracias a redux-thunk se cuenta con el dispatch y el getSate
        const {uid} = getState().authReducer;
        //console.log({uid})
        //console.log({idNote})
        const url = `${uid}/journal/notes/${idNote}`
        await dbFirebase.doc(url).delete();
        dispath(deleteNote(idNote))

    }
}

export const deleteNote = (idNote) => (
    {
        type: types.notesDelete,
        payload: idNote
    }
)

export const notesLogOutCleaning = () => (
    {
        type: types.notesLogOutCleaning
    }
)

