const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const postSchema = Schema(
  {
    title: {
      type: String,
      require: true
    },
    name: {
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
        //moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
        //default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
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

//this method will be added to the post every time the post was being made
postSchema.methods.date = function () {
  return moment(this.createdDate).format("dddd, MMMM Do YYYY, h:mm:ss a");
};

const Post = mongoose.model("Post", postSchema);
module.exports = Post;