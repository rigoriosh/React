import { dbFirebase } from "../firebase/firebaseConfig"



export const loadNotes = async(uid) => {

    const notesSnap = await dbFirebase.collection(`${uid}/journal/notes`).get();
    const notes = [];
    notesSnap.forEach(snapHijo => {
        /* 
            //console.log(
                {
                    id: snapHijo.id,
                    ...snapHijo.data()
                }
            );
        */
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        });        
    })
    //console.log(notes);

    return notes;
}