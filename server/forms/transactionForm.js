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
        required: true,
    },
    blockNumber: {
        type: Number,
        required: true,
    },
    transactionIndex: {
        type: Number,
        required: true,
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
    }
});

module.exports = mongoose.model("transactions", transactionForm);