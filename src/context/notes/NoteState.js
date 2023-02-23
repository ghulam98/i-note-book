
import { useState } from 'react'
import NotesContext from './noteContext'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmMjIwYzBmNDQ3NjM0ZmNlYzRkZTRkIn0sImlhdCI6MTY3NjgxMjc1N30.gLiL9VAeWQv4sSQ-Mr7Y91e-N2FxuMpjm1b0q0oCEpM"
const host = "http://localhost:5000/"

const NoteState = (props)=>{
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)
    
    //Get All notes
    const getAllNotes = async()=>{
        console.log("all nodecalll",token)
        try{

            const response = await fetch(`${host}api/notes/fetchallnotes`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                  'auth-token':token
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
        console.log("inside add",title,desc, tag)
 
        try{

            const response = await fetch(`${host}api/notes/addnote`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                  'auth-token':token
                },
                body: JSON.stringify({title, description:desc, tag})
                
              });
               const data = await response.json();
               console.log(data)
               getAllNotes()// for fetching all notes including just added new one
        }catch(e){
            console.log("connectionm refused server down", e.message)
        }

        
    }
    
    //Edit note
    const editNote = async(updatedData)=>{
        console.log("inside edit", updatedData)
        try{

            const response = await fetch(`${host}api/notes/updatenote/${updatedData.id}`, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                  'auth-token':token
                },
                body: JSON.stringify({title:updatedData.etitle, description:updatedData.edescription, tag:updatedData.etag})
                
              });
               const respData = await response.json();
            //    setNotes(respData)
            console.log("updated respData saved inside server successfully...",respData)
            getAllNotes()// for fetching all notes so that we can see wether note is deletd or not
        }catch(e){
            console.log("connectionm refused server down", e.message)
        }
        
    }
    
    //DELETE note
    const deleteNote = async(id)=>{
        console.log("inside delete",id)
        // setNotes(notes.filter((note)=>note._id !== id))
        try{

            const response = await fetch(`${host}api/notes/deletenote/${id}`, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                  'auth-token':token
                },
                
              });
               const data = await response.json();
            //    setNotes(data)
            getAllNotes()// for fetching all notes so that we can see wether note is deletd or not
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

