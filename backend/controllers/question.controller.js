import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import {QuestionDB} from '../models/question.js'
const postquestion=async(req,res)=>{
    try{
        let success=false
        const questionData = new QuestionDB({
          title: req.body.title,
          body: req.body.body,
          tags: req.body.tag,
          user: req.body.user,
        //   username:req.body.username
        });
      
        await questionData
          .save()
          .then((doc) => {
            success=true;
            return res
            .status(200)
            .json(new ApiResponse(200, {doc}, "Question added successfully"))
          })
          .catch((err) => {
            return res
            .status(200)
            .json(new ApiResponse(200, {err}, "Questions not added succesfully"))
          });
    }
    catch(error){
        throw new ApiError(500,"Something went wrong while posting question")
    }
}
const fetchquestion= async(req,res)=>{
    try {
        console.log(req.params.id)
        QuestionDB.aggregate([
          {
            $match: { _id: mongoose.Types.ObjectId(req.params.id) },
          },
          {
            $lookup: {
              from: "answers",
              let: { question_id: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$question_id", "$$question_id"],
                    },
                  },
                },
                {
                  $project: {
                    _id: 1,
                    user: 1,
                    answer: 1,
                    // created_at: 1,
                    question_id: 1,
                    created_at: 1,
                    username:1,
                  },
                },
              ],
              as: "answerDetails",
            },
          },
          {
            $lookup: {
              from: "comments",
              let: { question_id: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$question_id", "$$question_id"],
                    },
                  },
                },
                {
                  $project: {
                    _id: 1,
                    question_id: 1,
                    user: 1,
                    comment: 1,
                    username:1,
                    // created_at: 1,
                    // question_id: 1,
                    created_at: 1,
                  },
                },
              ],
              as: "comments",
            },
          },
          {
            $project: {
              __v: 0,
            },
          },
        ])
          .exec()
          .then((questionDetails) => {
            return res
            .status(200)
            .json(new ApiResponse(200, {questionDetails}, "Question Fetched succussfully"))
          })
          .catch((e) => {
            console.log("Error: ", e);
            return res
            .status(200)
            .json(new ApiResponse(200, {e}, "Question Not Fteched Succesfully"))
          });
      } catch(error){
        throw new ApiError(500,"Something went wrong while fecthing the question")
    }
}

const fetchall=async(req,res)=>{
    const error = {
        message: "Error in retrieving questions",
        error: "Bad request",
      };
    
      QuestionDB.aggregate([
        {
          $lookup: {
            from: "comments",
            let: { question_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$question_id", "$$question_id"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  // user_id: 1,
                  comment: 1,
                  created_at: 1,
                  // question_id: 1,
                },
              },
            ],
            as: "comments",
          },
        },
        {
          $lookup: {
            from: "answers",
            let: { question_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$question_id", "$$question_id"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  // user_id: 1,
                  // answer: 1,
                  // created_at: 1,
                  // question_id: 1,
                  // created_at: 1,
                },
              },
            ],
            as: "answerDetails",
          },
        },
        // {
        //   $unwind: {
        //     path: "$answerDetails",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        {
          $project: {
            __v: 0,
            // _id: "$_id",
            // answerDetails: { $first: "$answerDetails" },
          },
        },
      ])
        .exec()
        .then((questionDetails) => {
            return res
            .status(200)
            .json(new ApiResponse(200, {questionDetails}, "Question Fetched succussfully"))
        })
        .catch((e) => {
          console.log("Error: ", e);
          throw new ApiError(500,"Something went wrong while fecthing all the question")
        });
}
export {
    postquestion,
    fetchquestion,
    fetchall
}