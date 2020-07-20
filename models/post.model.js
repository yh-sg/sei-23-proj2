const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema(
  {
    title: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: true
    },
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;