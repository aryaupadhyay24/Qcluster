import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router";
import { TagsInput } from "react-tag-input-component";
import QuestionContext from './QuestionContext/QuestionContext'
function Textarea() {
  const navigate = useNavigate()
  const [text, settext] = useState("");
  const [tags, settags] = useState([]);
  const [title,setTitle]=useState("");
  const context=useContext(QuestionContext)
  const {addQuestion,question,setQuestion,user_id}=context
  
  // console.log(tags);

  const handleClick=async ()=>{
    console.log("ruko dekhteh haiemail password sahi ai")
    // jaise hi submit pe click ho 
    // fetch se pata karo sahi hai login wale endpoint se
    settext("this is my first text")
    // console.log(user_id);
    let s=localStorage.getItem("user_id2")
    let q=localStorage.getItem("user_name")
    
    // console.log(s)
    const response = await fetch('http://localhost:80/api/question', {
      
        method: 'POST',
        headers: {


            'Content-Type': 'application/json',


        },
        
        body: JSON.stringify({title,tag:tags,body:text,user:s,username:q})

    });
    const json=await response.json();
    console.log(json.doc);
    if(json.success){
      navigate("/main")
    }




  }

  return (
    <div className="container main">
      <h1 className="p-3 mb-0">Ask your Question</h1>
      <div className="container ques-modal pb-3">
        <h3 className="pt-2">Title</h3>
        <p className="mb-0">enter your title appropriately</p>
        <input  className="w-100 title-inp mt-0 mb-4" type="text" placeholder="Enter the title" onChange={(e)=>setTitle(e.target.value)}/>
        <h3 className="pt-2">Body</h3>
        <p className="pb-0 mb-0">enter your question in detail</p>
        <ReactQuill
          className="mb-4"
          theme="snow"
          value={text}
          onChange={settext}
        ></ReactQuill>
        <h3 className="pt-2">Tags</h3>
        <p className="pb-0 mb-0">add upto 5 tags</p>
        <TagsInput name="tags" placeHolder="enter tags" value={tags} onChange={settags}></TagsInput>
      </div>
      <button className="btn btn-primary btn-lg m-3" onClick={handleClick}>Add Question</button>
    </div>
  );
}

export default Textarea;