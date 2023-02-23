import React, { useContext, useState } from 'react'
import notesContext from '../context/notes/noteContext'


export default function AddNote() {
    const {addNote} = useContext(notesContext);

    const [note, setNote] = useState({title:"", description:"", tag:""})
    const submit = (e)=>{
        e.preventDefault()
        console.log("submiting")
        addNote(note.title, note.description, note.tag)
    }
    const change = (e)=>{
        console.log(e.target.name, e.target.value, "chnage")
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div>
      <h2 className='my-3'>Add Note here</h2>
<form onSubmit={submit}>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title'  onChange={change}/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name='description' onChange={change}/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name='tag' onChange={change}/>
  </div>
 
  <button type="submit" className="btn btn-primary">Add</button>
</form>
    </div>
  )
}
