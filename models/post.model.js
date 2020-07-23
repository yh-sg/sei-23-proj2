const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

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
          default: 3
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
    comment: [{
      name:
      {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      },
      message: String,
      messageDate: {
        type: Date, 
        default: Date.now
    }
    }]
  }
);

//this method will be added to the post every time the post was being made
postSchema.methods.date = function () {
  return moment(this.createdDate).format("dddd, MMMM Do YYYY, h:mm:ss A");
};

postSchema.methods.commentDate = function (index) {
 return moment(this.comment[index].messageDate).fromNow();
};

const Post = mongoose.model("Post", postSchema);
module.exports = Post;