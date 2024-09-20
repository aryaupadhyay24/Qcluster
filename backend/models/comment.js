import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
  username:String,
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  comment: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

export const commentDB = mongoose.model("Comments", CommentSchema);
