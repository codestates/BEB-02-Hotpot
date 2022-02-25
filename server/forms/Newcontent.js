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
    type: Date,
    default: Date.now,
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
