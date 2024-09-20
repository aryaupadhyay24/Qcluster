import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {answerDB} from '../models/answer.js'
const postanswer=asyncHandler(async(req,res)=>{
    try{
      const answerData = new answerDB({
        question_id: req.body.question_id,
        answer: req.body.answer,
        user: req.body.user,
        // username:req.body.username
      });
    
      await answerData
        .save()
        .then((doc) => {
            return res
            .status(200)
            .json(new ApiResponse(200, doc, "Answer added successfully"))
        })
        .catch((err) => {
            return res
            .status(200)
            .json(new ApiResponse(200, {}, "Answer not added successfully"))
        });
  
    }
    catch (error) {
      throw new ApiError(500, "Something went wrong while posting answer")
    }
  })

export {postanswer};