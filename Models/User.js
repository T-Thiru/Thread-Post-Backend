const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },
  account: {
    username: {
      required: true,
      type: String,
    },
    avatar: Object,
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;

// const PostSchema = mongoose.Schema({
//   email: {
//     unique: true,
//     type: String,
//   },
//   account: {
//     username: {
//       required: true,
//       type: String,
//     },
//     avatar: Object,
//   },
//   token: String,
//   hash: String,
//   salt: String,
// });

// module.exports = mongoose.model("User", PostSchema);
