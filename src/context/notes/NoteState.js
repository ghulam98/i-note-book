
import { useState } from 'react'
import NotesContext from './noteContext'

const NoteState = (props)=>{
    const state = {
        "name":"Harrywmdbj",
        "class":"50b"
    }
const [data, setData] = useState(state)
const update = ()=>{
    setTimeout(()=>{
        setData({"name":"Hanji", "class":"987"})
    }, 2000)
}
    return(
        <NotesContext.Provider value={{data,update}}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState

