import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import notesContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

export default function Note() {
    const {notes, getAllNotes, editNote} = useContext(notesContext)
    useEffect(()=>{
        getAllNotes();

    },[])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [updatedNote, setupdatedNote] = useState({id:"","etitle":"", "edescription":"", "etag":""})
    const update = (note)=>{
        console.log("updadt", note)
        ref.current.click()
        setupdatedNote({id:note._id,"etitle":note.title, "edescription":note.description, "etag":note.tag})
        console.log("updadt2")
    }
    const change = (e)=>{
        setupdatedNote({...updatedNote,[e.target.name]:e.target.value, })

        console.log(updatedNote)
    }

    const clickHandle = ()=>{
        console.log("updating note.....",updatedNote)
        editNote(updatedNote)
        setTimeout(() => {
            
            refClose.current.click()
        }, 1000);
    }

  return (
 
    
        <>
  <AddNote/>

<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Note here</h5>
       
      </div>
      <div className="modal-body">
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input type="text" name='etitle' value={updatedNote.etitle} onChange={change} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title"/>
                </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Description</label>
                <input type="text" name='edescription' value={updatedNote.edescription} onChange={change} className="form-control" id="exampleInputPassword1" placeholder="Enter description"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Tag</label>
                <input type="text" name='etag' value={updatedNote.etag} onChange={change} className="form-control" id="exampleInputPassword1" placeholder="Enter tag"/>
            </div>
            

      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={clickHandle}>Update Note</button>
      </div>
    </div>
  </div>
</div>     


        <div className='row'>
        <h2>All notes here</h2>
        {
            notes.map((note)=>{
                return    (
                    <div className='col-md-3 my-3' key={note._id}>
                <NoteItem note={note} update={update}/>
                </div>
                )
                
            })
        }
    </div>
    </>
  )
}
