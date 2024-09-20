import React, { useContext, useEffect } from 'react'
import Question from './Question'
import { Link } from 'react-router-dom'
import QuestionContext from './QuestionContext/QuestionContext'

export default function Main() {
    const context=useContext(QuestionContext)
    const {question,fetchallQuestion}=context
    useEffect(()=>{
        fetchallQuestion()
    },[])
    console.log(question);
  return (
<div className="main">
    <div className="container">
        <div className="top">
            <h2>All Question</h2>
            <Link to="/askquestion"><button className='btn btn-primary'>Ask Question</button></Link>
        </div>
        <div className="filter">
        <div className="desc">
            <p>No of question</p>
        </div>

            <div className="tabs">
                <div className="tab">
                    <a href=""className='lll'>Newest</a>
                </div>
                <div className="tab">
                    <a href=""className='lll'>Active</a>
                </div>
                <div className="tab">
                    <a href="" className='lll'>More</a>
                </div>
                <div className="filter-icon">
                <i className="fa-sharp fa-solid fa-filter">Filter</i>
                </div>

            </div>
        </div>
        {question.map(question=>(
            <div className="questions">
            <Question detail={question}/>
           </div>
            

        ))}
                
                    
               
    </div>
</div>
  )
}
