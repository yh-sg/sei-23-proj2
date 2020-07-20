const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = Schema(
    {
      name: {
          type: String,
          require: true
        },
      toDoBy: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      // post: [
      //   {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "Post",
      //   }],
    });
  
  const List = mongoose.model("List", listSchema);
  module.exports = List;