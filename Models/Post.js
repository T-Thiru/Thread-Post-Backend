const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
