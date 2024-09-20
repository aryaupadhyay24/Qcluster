import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import QuestionContext from './QuestionContext/QuestionContext'


export default function Login() {
  const context=useContext(QuestionContext)
  const navigate=useNavigate()
  // const {user_id,setUser,setting}=context
  const [exi,setExist]=useState("")

  const[credentials,setCredentials]=useState({email:"",password:""})


  const handleSubmit=async (e)=>{
    e.preventDefault(); 
    
    console.log("ruko dekhteh haiemail password sahi ai")
    // jaise hi submit pe click ho 
    // fetch se pata karo sahi hai login wale endpoint se
    const response = await fetch('http://localhost:8000/api/v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:credentials.email,password:credentials.password})

    });
    const json=await response.json();
    const p=json.data.user._id;
    const name=json.data.user.name;
    console.log(json.data);
    localStorage.setItem('accessToken',json.data.user.accessToken);
    localStorage.setItem('refreshToken',json.data.user.refreshToken);
    localStorage.setItem("user_id2",p)
    localStorage.setItem("user_name",name)
    setExist(localStorage.getItem("user_id2"));



    
    if(json.success){
      navigate("/main")
    }

  
    
    
    

}
  
    
  
  

const onChange=(e)=>{
  setCredentials({...credentials,[e.target.name]:e.target.value})
}


  return (
    <div className='Login'>
        <div className="cards">
            <div className="left">
              <h1 className="tag" style={{fontSize:'80px'}}>Hello World</h1>
                <span className='mess'>Don't Have an account</span>
              {/* <button className='Resister my-5'>Resister</button> */}
            </div>
            <div className="right">
             <h1  className='text-center ll'>login</h1>
             <form className='formlogin my-3' >
                <input className='inputlogin my-3' type="email" placeholder='Email' name='email' value={credentials.email} onChange={onChange} />
                <input className='inputlogin' type="password" placeholder='password' name='password' value={credentials.password} onChange={onChange}/>

                <button className='Resister2 ' onClick={handleSubmit} id="buttonL">Login</button>
              <Link to='/reg' className='Resister2 text-center' >   Sign Up</Link>
             </form>
            </div>
        </div>

    </div>
  )
}
