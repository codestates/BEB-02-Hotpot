const mongoose = require("mongoose");

const ethFaucetForm = new mongoose.Schema({
  userName: {
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
  privateKey: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", ethFaucetForm);
