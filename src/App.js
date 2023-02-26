
import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';
import About from './components/About';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';
import Alert from './components/Alert';


function App() {
  const [alert,alertfun] = useState(null);
  const showAlert = (msg='Alret',type='success')=>{
    alertfun({
      msg:msg,
      type:type
    })
  setTimeout(() => {alertfun(null)
    
  }, 1800);
  
  }
  return (
    <NoteState>
    <Router>
    <>
    
      <Navbar/>
      <Alert alert={alert}/>
      <div className='container'>
 
      
      <Routes>
                 <Route exact path='/' element={< Home showAlert={showAlert} />}></Route>
                 <Route exact path='/about' element={< About  />}></Route>
                 <Route exact path='/login' element={< Login showAlert={showAlert} />}></Route>
                 <Route exact path='/signup' element={< Signup showAlert={showAlert} />}></Route>
      </Routes>
        </div>
      <Footer/>

    </>
    </Router>
    </NoteState>

  );
}

export default App;
