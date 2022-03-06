const transactionForm = require("../../forms/transactionForm");
const tradeForm = require("../../forms/tradeForm");
const exchageForm = require("../../forms/exchangeForm");
const Web3 = require("web3");
const dotenv = require("dotenv");
const exchangeForm = require('../../forms/exchangeForm');
dotenv.config();

const rpcURL = process.env.RPC_URL;
const web3 = new Web3(rpcURL);

module.exports = {
    buyNFT: async (req, res) => {
        const { seller_address, buyer_address, hash, type, tokenId } = req.body;
        if (hash) {
            //트랜잭션 db에 기록
            web3.eth.getTransaction(hash)
                .then(async (info) => {
                    const { nonce, from, to, value, gas, gasPrice, input, v, r, s } = info;

                    const newTx = new transactionForm({
                        hash, nonce, from, to, value, gas, gasPrice, input, v, r, s, type,
                        status: "pending"
                    })
                    newTx.save((err) => {
                        if (err) {
                            res.send(err);
                        } else {
                            //거래 기록
                            const newTrade = new tradeForm({
                                seller_address,
                                buyer_address,
                                tokenId,
                                status: "토큰전송중",
                                tokenTx: hash
                            })

                            newTrade.save((e) => {
                                if (e) {
                                    res.send(e);
                                } else {
                                    res.send({
                                        message: "트랜잭션이 기록되었습니다.",
                                        data: { newTx, newTrade },
                                    });
                                }
                            })

                            //exchange 상태 거래중으로
                            exchangeForm.findOneAndUpdate({ tokenId, trade_state: "판매중" },
                                { trade_state: "거래중" },
                                { new: true, upsert: true },
                                (err) => { if (err) { console.log(err) } })
                        }
                    })
                })

        }
    }
}