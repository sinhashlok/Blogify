const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "Blogs",
    required: true,
  },
  createdByName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
