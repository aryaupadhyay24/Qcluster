import React, { useContext } from 'react'
import {  useNavigate } from 'react-router'
import question from './question.png'
import QuestionContext from './QuestionContext/QuestionContext'

export default function Navbar() {
  const navigate=useNavigate()
  const context=useContext(QuestionContext)
  const {fetchQuestionTag}=context

  const handleremove=()=>{
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_id2')
    navigate("/")
  }
  const handleTag=()=>{
    fetchQuestionTag()
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg ">
        <img src={question} style={{ width: '5rem', height: '3rem' }} className="img-fluid" />

  <a className="navbar-brand" href="/">Qcluster</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto text-center">
      <li className="nav-item active">
        <a className="nav-link" href="/">Home </a>
      </li>

      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item d-flex justify-content-around" href="/">User <i className="fa-solid fa-user"></i></a>
          <a className="dropdown-item d-flex justify-content-around"  >Tags<i className="fa-solid fa-tags" onClick={handleTag}></i></a>
          <a className="dropdown-item d-flex justify-content-around" href="/">Question<i className="fa-duotone fa-question"></i></a>

          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="/">Something else here</a>
        </div>
      </li>
     
      <input className="form-control mr-sm-2 mx-3" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      <button className="btn btn-outline-danger my-2 mx-3 my-sm-0" onClick={handleremove} >Logout</button>
   
    </ul>
 
  </div>
</nav>
    </div>
  )
}
