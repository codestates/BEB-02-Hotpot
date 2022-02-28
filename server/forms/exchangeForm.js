const mongoose = require("mongoose");

const exchangeForm = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    },
    img_url: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    trade_state: {
        type: String,
        required: true,
    },
    nft_name: {
        type: String,
        required: true,
    }
    ,
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("exchangeposts", exchangeForm);
