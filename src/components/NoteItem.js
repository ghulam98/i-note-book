import React, { useContext } from "react";
import notesContext from "../context/notes/noteContext";


export default function NoteItem(props) {
    const {deleteNote} = useContext(notesContext)
    const deleteN = (id, showAlert)=>{
        deleteNote(id, showAlert)

    }

  return (

    
    <div className="card" >
      <div className="card-body">
        <h5 className="card-title">    {props.note.title}</h5>
        <p className="card-text">    {props.note.description}
        </p>

      </div>
      <div >
      <button className=" btn btn-outline-danger btn-sm mx-2" onClick={()=>deleteN(props.note._id, props.showAlert)}>Delete</button>
      <button className="btn btn-sm btn-outline-primary" onClick={()=>props.update(props.note)} >Edit</button>
      </div>
    </div>

   
  );
}
