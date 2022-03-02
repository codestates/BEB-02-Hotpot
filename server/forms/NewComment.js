const mongoose = require("mongoose");

const addNewComment = new mongoose.Schema({
  contentid: { type: String, require: true },
  username: {
    type: String,
    required: true,
  },
  comment: {
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

module.exports = mongoose.model("CommentTable", addNewComment);
