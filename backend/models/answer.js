import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  username:String,
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  answer: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
  },
});

export const answerDB = mongoose.model("Answers", answerSchema);
