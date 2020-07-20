const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
});

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

const User = mongoose.model("User", userSchema);
module.exports = User;