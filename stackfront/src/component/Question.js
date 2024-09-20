import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
// import QuestionContext from './QuestionContext/QuestionContext'

export default function Question(props) {
    let x=props.detail.tags
    // console.log("this is ",x)
    // const context=useContext(QuestionContext)
    // const {que_id,setQue}=context
    const handleClick=()=>{
        // console.log(props.detail._id)
        // setQue(props.detail._id)
        // console.log(que_id)
        localStorage.setItem("que_id",props.detail._id)
        // console.log(localStorage.getItem("que_id"))


    }

    
    // console.log(props.detail.title)
  return (
    <div className="container">
        <div className="question ">
           

            <div className="qright">
                <Link className='hello' to='/mainquestion' onClick={handleClick}>{props.detail.title}</Link>
                <div className="answer">
                    <p dangerouslySetInnerHTML={{__html:props.detail.body}}></p>
                </div>
                

            </div>
            <div className="qtag ms-auto">
                {x&&x.map(k=>(
                    <span className='badge'>{k}</span>

                ))}
                
                
                

            </div>

            <div className="auther">
                <div className="details">
                {props.detail.username}
                    <p><i class="fa-solid fa-user user"></i></p>
                </div>
            </div>


        </div>
    </div>
  )
}
