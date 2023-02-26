import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login({showAlert}) {

    const [cred, setCred] = useState({email:"", password:""})
    let nevigate = useNavigate()

    const submit = async (e)=>{
        e.preventDefault()
        try{

            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                //   'auth-token':token
                },
                body: JSON.stringify({email:cred.email, password:cred.password})
                
              });
               const data = await response.json();
               if(data.success){
                //save token in local 
                localStorage.setItem('token', data.token)
                nevigate("/")
                showAlert("Login successfully!", "success")
               }
               else{
                showAlert("Login failed as credantial is not correct!", "danger")
               }
        }catch(e){
            showAlert("connectionm refused server down"+e.message, "danger")
        }

    }

    const onChange = (e)=>{
        setCred({...cred, [e.target.name]:e.target.value})
    }

  return (
    <div className='container '>
        <h2>Login here</h2>
      <form onSubmit={submit}>
  <div className="form-group ">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" name='email' onChange={onChange}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" name='password' onChange={onChange} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div className="form-group my-3 ">
  <button type="submit" className="btn btn-primary ">Login</button>
  <Link to="/signup" className='link mx-3'>click here for new user</Link>
  </div>
</form>
    </div>
  )
}
