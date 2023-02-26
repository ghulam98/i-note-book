import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup({showAlert}) {
    const [cred, setCred] = useState({name:"",email:"", password:""})
    let nevigate = useNavigate()

    const submit = async (e)=>{
        e.preventDefault()
        try{

            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                //   'auth-token':token
                },
                body: JSON.stringify({name:cred.name ,email:cred.email, password:cred.password})
                
              });
               const data = await response.json();
               if(data.success){
                //save token in local 
                // localStorage.setItem('token', token)
                nevigate("/login")
                showAlert("User created successfully!", "success")
               }
               else{
                showAlert("Use with same email is already exist!", "danger")
               }
        }catch(e){
            console.log("connectionm refused server down", e.message)
        }

    }

    const onChange = (e)=>{
        setCred({...cred, [e.target.name]:e.target.value})
    }

  return (
    <div className="container ">
      <h2>Register here</h2>
      <form onSubmit={submit}>
        <div className="form-group ">
          <label htmlFor="exampleInputName1">Name</label>
          <input
          onChange={onChange}
          name='name'
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group ">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
          name="email"
          onChange={onChange}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">

          <label htmlFor="exampleInputPassword1">Password</label>
          <input
          onChange={onChange}
          name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-group my-3 ">
          <button type="submit" className="btn btn-primary ">
            Register
          </button>
          <Link to="/login" className="link mx-3">
            click here if you r already Register
          </Link>
        </div>
      </form>
    </div>
  );
}
