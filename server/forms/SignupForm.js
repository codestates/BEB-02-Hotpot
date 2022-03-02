const mongoose = require("mongoose");

const signupForm = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: function () {
      let date = new Date().toISOString().split("T")[0];
      let time = new Date().toTimeString().split(" ")[0];
      return date + " " + time;
    },
  },
});

module.exports = mongoose.model("signUpTable", signupForm);