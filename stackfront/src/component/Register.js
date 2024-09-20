import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import QuestionContext from './QuestionContext/QuestionContext'



export default function Register() {
  // const context=useContext(QuestionContext)
  // const {user_id,setUser}=context
  const navigate=useNavigate()
  const[credentials,setCredentials]=useState({name:"",email:"",password:""})
  const handleSubmit=async (e)=>{
    e.preventDefault();
    
    console.log("ruko dekhteh haiemail password sahi ai")
    // jaise hi submit pe click ho 
    // fetch se pata karo sahi hai login wale endpoint se
    const response = await fetch('http://localhost:8000/api/v1/users/register', {
        method: 'POST',
        headers: {


            'Content-Type': 'application/json',


        },
        body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})

    });
    const json=await response.json();
    console.log(json);
    if(json.success){
      navigate("/")
    }

    // console.log(json.exist._id);
    // setUser(json.exist._id)
    // console.log(user_id);
    
    
    

    

}

const onChange=(e)=>{
  setCredentials({...credentials,[e.target.name]:e.target.value})
}
  return (
   
        <div className='resister'>
        <div className="cards2">
            <div className="left2">
              <h1 className="tag" style={{fontSize:'80px'}}>Hello World</h1>
                {/* <span className='mess'>Don't Have an account</span> */}
              {/* <button className='Resister my-5'>Resister</button> */}
            </div>
            <div className="right2">
             <h1  className='text-center ll2'>Resister</h1>
             <form className='formlogin2 my-4' onSubmit={handleSubmit}>
                <input className='inputlogin2 ' type="text" placeholder='Username' name="name" onChange={onChange} value={credentials.name}/>
                <input className='inputlogin2' type="email" placeholder='email' name="email" onChange={onChange} value={credentials.email}/ >
                <input className='inputlogin2' type="password" placeholder='password' name="password" onChange={onChange} value={credentials.password}/>
                <input className='inputlogin2' type="password" placeholder='confirm password' />
              <button className='Resister3'>Sign Up</button>
                <Link className='Resister3 text-center' to="/">Login</Link>

             </form>
            </div>
        </div>

    
    </div>
  )
}
