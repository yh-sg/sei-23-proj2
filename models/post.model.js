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
      priority: {
          type: Number,
          require: [true, "Please input data priority level"],
          min: 1,
          max: 5,
          default: 1
      },
      createdDate: {
        type: Date,
        default: Date.now
      },
      status: {
          type: String,
          enum: ["Nil", "In Progress", "Done"],
          default: "Nil"
      },
    writtenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;