const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = Schema(
    {
      name: {
          type: String,
          require: true
        },
      priority: {
          type: Number,
          require: [true, "Please input data priority level"],
          min: 1,
          max: 10
      },
      dueDate: Date,
      status: {
          type: String,
          enum: ["nil", "inprogress", "done"]
      },
    //   users: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Users",
    //     }],
    });
  
  const List = mongoose.model("List", listSchema);
  module.exports = List;