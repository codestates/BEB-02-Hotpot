const mongoose = require("mongoose");
// const autoIncrement = require("mongoose-auto-increment");
// var connection = mongoose.createConnection("mongodb://localhost/community");
// autoIncrement.initialize(mongoose.connect);

const addNewContent = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
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
  viewed: {
    type: Number,
    default: 0,
  },
});

// addNewContent.plugin(autoIncrement.plugin, {
//   model: "addNewContent",
//   field: "id",
//   startAt: 1,
//   increment: 1,
// });

module.exports = mongoose.model("CommunityTable", addNewContent);
