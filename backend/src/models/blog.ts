const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdByName: {
    type: String,
    required: true,
  },
  coverImgURL: {
    type: String || null,
    required: false,
  },
});

const Blogs = model("Blog", blogSchema);

module.exports = Blogs;
