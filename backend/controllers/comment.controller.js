import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {commentDB} from '../models/comment.js'
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
const postcomment=asyncHandler(async(req,res)=>{
    try {
        await commentDB
          .create({
            question_id: req.body.question_id,
            comment: req.body.comment,
            user: req.body.user,
            // username:req.body.username
          })
          .then((doc) => {
            res.status(201).send({
              message: "Comment added successfully",
            });
          })
          .catch((err) => {
            res.status(400).send({
              message: "Bad format",
            });
          });
      } catch (err) {
        res.status(500).send({
          message: "Error while adding comments",
        });
      }
})

export {postcomment};