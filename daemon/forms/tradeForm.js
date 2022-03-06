const mongoose = require("mongoose");

const tradeForm = new mongoose.Schema({
    seller_address: {
        type: String,
        required: true,
    },
    buyer_address: {
        type: String,
        required: true,
    },
    tokenId: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    tokenTx: {
        type: String,
        required: true,
    },
    NFTTx: {
        type: String,
        default: "",
    }
});

module.exports = mongoose.model("tradetables", tradeForm);
