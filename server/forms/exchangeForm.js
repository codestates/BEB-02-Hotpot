const mongoose = require("mongoose");

const exchangeForm = new mongoose.Schema({
    seller: {
        type: String,
        required: true,
    },
    seller_address: {
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
        default: "판매중",
    },
    nft_name: {
        type: String,
        required: true,
    },
    ex_date: {
        type: Date,
        default: function () {
            let today = new Date();
            let date = new Date(today.setDate(today.getDate() + 1)).toISOString().split("T")[0];
            let time = new Date().toTimeString().split(" ")[0];
            return date + " " + time;
        },
    },

    tokenId: {
        type: Number,
        required: true,
    },
    createAt: {
        type: Date,
        default: function () {
            let date = new Date().toISOString().split("T")[0];
            let time = new Date().toTimeString().split(" ")[0];
            return date + " " + time;
        },
    },
});

module.exports = mongoose.model("exchangeposts", exchangeForm);
