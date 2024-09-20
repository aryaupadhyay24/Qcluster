import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuestionContext from './QuestionContext/QuestionContext'
import { Link } from 'react-router-dom'



function MainQuestion() {
  const context=useContext(QuestionContext)
  const {fetchQuestion,particular,addComment,addAnswer}=context
  const [comm,setComm]=useState()
  const [answe,setAnswe]=useState()

  console.log(localStorage.getItem("que_id"))
  useEffect(() => {
    fetchQuestion(localStorage.getItem("que_id"))
  
  }, [])
  // fetchQuestion(localStorage.getItem("que_id"))
  // console.log("kya hai",particular)
  
  // console.log(particular[0].created_at.getDate())
  const handleClick=()=>{
    addComment(localStorage.getItem("user_id2"),particular[0]._id,comm,localStorage.getItem("user_name"))
    fetchQuestion(localStorage.getItem("que_id"))
    // console.log(particular)
    // console.log(particular[0].username)

  }

  const handleAns=()=>{
    addAnswer(localStorage.getItem("user_id2"),particular[0]._id,answe,localStorage.getItem("user_name"))
    fetchQuestion(localStorage.getItem("que_id"))

  }
  
  
  return (
    <div className="main">
    <div className="container mainques">
      <div className="header">
        <div className="heading d-flex justify-content-between align-items-center py-4">
          <h1>{particular&&particular[0].title}</h1>
          {/* <h1>This is</h1> */}
          <Link to='/askquestion' className="btn btn-primary btn-lg" >Ask question</Link>
        </div>
        <div className="info d-flex justify-content-around">
          <p className="mb-0">
            date of upload{" : "}
            <span>
              {" "}
              <strong> {particular&&particular[0].created_at.slice(0,10)}</strong>
            </span>
          </p>
          <p className="mb-0">
            uploaded by{" "}
            <span>
              {" "}
              <strong> {particular && particular[0].username}</strong>
            </span>
          </p>
        </div>
      </div>
      <hr className="mt-1" />
      <div className="questio">
        <div className="quesDesc container px-5">
          <p className="ques" dangerouslySetInnerHTML={{__html:particular && particular[0].body}}>
            
          </p>
        </div>
        <div className="comments px-5">
            <h3 className="my-3">Comments</h3>
            <div className="container">
          {particular&& particular[0].comments.map((co)=>(
            <div className="comment px-3">
            <p>{co.comment}</p>
           <h5 className="text-end"> <span className= "badge">{co.username}</span></h5>
            <hr />
          </div>
         
          ))}
          </div>
          
          <div className="entercomment">
            <h4 className="my-3">Add Comments</h4>
            <textarea name="comment" id="" placeholder="write your comment" rows="7" className="w-100 textarea"  onChange={(e)=>setComm(e.target.value)}></textarea>
            <button className="btn btn-primary btn-sm qbut" onClick={handleClick}>Add comment</button>
          </div>
        </div>
        <hr />
        <h2 className="my-3">Answers</h2>
        <div className="answers">
          {particular && particular[0].answerDetails.map((ans)=>(
             <div className="ans container">
             <p className="mb-0" dangerouslySetInnerHTML={{__html:ans.answer}}>
             </p>
             <h5 className="text-end "> <span className="badge">{ans.username}</span></h5>
             </div>


          ))}
           
         
        </div>
        <hr />
        <h1>Add Answers</h1>
        <ReactQuill theme="snow" value={answe} onChange={setAnswe}></ReactQuill>
        <button className="btn btn-primary btn-lg my-2" onClick={handleAns}>Add Qusetion</button>
      </div>
    </div>
    </div>
  );
}

export default MainQuestion;