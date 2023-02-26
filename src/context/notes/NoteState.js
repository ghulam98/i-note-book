
import { useState } from 'react'
import NotesContext from './noteContext'
//const token = localStorage.getItem('token')//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmMjIwYzBmNDQ3NjM0ZmNlYzRkZTRkIn0sImlhdCI6MTY3NjgxMjc1N30.gLiL9VAeWQv4sSQ-Mr7Y91e-N2FxuMpjm1b0q0oCEpM"
const host = "http://localhost:5000/"

const NoteState = (props)=>{
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)
    
    //Get All notes
    const getAllNotes = async()=>{
        try{

            const response = await fetch(`${host}api/notes/fetchallnotes`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                  'auth-token':localStorage.getItem('token')
                },
                
              });
               const data = await response.json();
               setNotes(data)
        }catch(e){
            console.log("connectionm refused server down", e.message)
        }
    }



    //ADD note
    const addNote = async(title, desc, tag)=>{
 
        try{

            const response = await fetch(`${host}api/notes/addnote`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                  'auth-token':localStorage.getItem('token')
                },
                body: JSON.stringify({title, description:desc, tag})
                
              });
              console.log(response)
               getAllNotes()// for fetching all notes including just added new one
        }catch(e){
            console.log("connectionm refused server down", e.message)
        }

        
    }
    
    //Edit note
    const editNote = async(updatedData,showAlert)=>{
        try{

            const response = await fetch(`${host}api/notes/updatenote/${updatedData.id}`, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                  'auth-token':localStorage.getItem('token')
                },
                body: JSON.stringify({title:updatedData.etitle, description:updatedData.edescription, tag:updatedData.etag})
                
              });
              console.log(response)
            getAllNotes()// for fetching all notes so that we can see wether note is deletd or not
            showAlert("Note updated successfully!", "success")
        }catch(e){
            console.log("connectionm refused server down", e.message)
        }
        
    }
    
    //DELETE note
    const deleteNote = async(id,showAlert)=>{
        try{

            const response = await fetch(`${host}api/notes/deletenote/${id}`, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                  'auth-token':localStorage.getItem('token')
                },
                
              });
            //    setNotes(data)
            getAllNotes()// for fetching all notes so that we can see wether note is deletd or not
            showAlert("Note deleted successfully!", "danger")
            console.log(response)
        }catch(e){
            console.log("connectionm refused server down", e.message)
        }


    }

    return(
        <NotesContext.Provider value={{notes, addNote, deleteNote, editNote, getAllNotes}}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState

