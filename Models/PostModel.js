const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    posts: {
      message: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      likes: {
        type: [String],
      },
    },
    comments: {
      message: {
        type: [String],
        required: false,
      },
      author: {
        type: String,
        required: false,
      },
      likes: {
        type: [String],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
