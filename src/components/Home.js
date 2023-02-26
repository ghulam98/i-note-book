
import { useNavigate } from 'react-router-dom'
import AddNote from './AddNote'
import Note from './Note'
export default function Home({showAlert}) {
    const navigate = useNavigate()
  return (
    <>
    {localStorage.getItem('token')?
    <Note showAlert={showAlert}/>:
    navigate('/signup')
    }




</>
  )
}
