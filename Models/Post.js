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
    photo: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
