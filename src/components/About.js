import React, { useContext, useEffect } from 'react'
import notesContext from '../context/notes/noteContext'

export default function About() {
    const a = useContext(notesContext);
    useEffect(()=>{
        a.update()
        // eslint-disable-next-line
        console.log("useEffact")
    }, [])
  return (
    <div>
      This is about page of {a.data.name} and class is {a.data.class}
    </div>
  )
}
