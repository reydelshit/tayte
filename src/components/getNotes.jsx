import { collection, getDocs } from "firebase/firestore"
import { useContext } from "react"
import { db } from "../config/firebase-config"
import { MainContext } from "./context/MainContext"

export const getNotes = async (id, setUpdatedNotes, setNotesStorage, auth) => {
    const notesCollectionRef = collection(db, "notes")

    try {
        const data = await getDocs(notesCollectionRef)
        const notess = data.docs.map((note) => ({
            ...note.data(), id: note.id
        }))

        if (auth?.currentUser?.uid) {
            const filteredNotes = notess.filter(
                (note) => note.userID === auth?.currentUser?.uid
            );

            const currentNote = filteredNotes.find((note) => note.id === id)

            if (currentNote) {
                setUpdatedNotes({
                    title: currentNote.title,
                    body: currentNote.body,
                });
            }

            console.log(filteredNotes)
            setNotesStorage(filteredNotes)
        }

    } catch (err) {
        console.error(err)
    }
}
