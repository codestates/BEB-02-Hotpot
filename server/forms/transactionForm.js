const mongoose = require("mongoose");

const transactionForm = new mongoose.Schema({
    hash: {
        type: String,
        required: true,
    },
    nonce: {
        type: Number,
        required: true,
    },
    blockHash: {
        type: String,
        default: "",
    },
    blockNumber: {
        type: Number,
        default: 0,
    },
    transactionIndex: {
        type: Number,
        default: 0,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    gas: {
        type: Number,
        required: true,
    },
    gasPrice: {
        type: String,
        required: true,
    },
    input: {
        type: String,
        required: true,
    },
    v: {
        type: String,
        required: true,
    },
    r: {
        type: String,
        required: true,
    },
    s: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    tokenId: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("transactions", transactionForm);