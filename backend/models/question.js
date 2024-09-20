// const mongoose = require("mongoose");
import mongoose from 'mongoose'
const questionSchema = new mongoose.Schema({
  username:String,
  title: String,
  body: String,
  tags: {
    type:Array,
    default:[]
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
  },
});

export const QuestionDB = mongoose.model("Questions", questionSchema);
