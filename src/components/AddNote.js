import React, { useContext, useState } from 'react'
import notesContext from '../context/notes/noteContext'


export default function AddNote({showAlert}) {
    const {addNote} = useContext(notesContext);

    const [note, setNote] = useState({title:"", description:"", tag:""})
    const submit = (e)=>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({title:"", description:"", tag:""})
        showAlert("Added note successfully!", "success")
    }
    const change = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div>
      <h2 className='my-3'>Add Note here</h2>
<form onSubmit={submit}>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" value={note.title} required name='title'  onChange={change}/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Description</label>
    <input type="text" className="form-control" id="description" value={note.description} required name='description' onChange={change}/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" value={note.tag} required name='tag' onChange={change}/>
  </div>
 
  <button type="submit" disabled={note.description.length < 5 || note.title.length  < 5 || note.tag.length  < 4} className="btn btn-primary">Add</button>
</form>
    </div>
  )
}
