const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Web3 = require("web3");
const transactionForm = require("./forms/transactionForm");
const exchangeForm = require("./forms/exchangeForm");
const tradeForm = require("./forms/tradeForm");
const axios = require("axios");
dotenv.config();

const rpcURL = process.env.RPC_URL;
const web3 = new Web3(rpcURL);

//완료되지 않은 transaction 체크
mongoose.connect(process.env.DB_URI, () => {
    console.log("DB 연결됨");
    /* fail 처리 테스트중
    const testTx = "0x5309c63947b167cc1c3ba778222223db15aacf6537fd64fe94b2e75399997668"
    web3.eth.getTransactionReceipt(testTx)
        .then((res) => console.log(res));
    web3.eth.getTransaction(testTx)
        .then((res) => console.log(res));
    */

    transactionForm.find({ status: "pending" }, (err, txList) => {
        //pending 상태인 tx 있는지 체크
        if (txList.length) {
            for (const tx of txList) {
                web3.eth.getTransaction(tx.hash)
                    .then(async (info) => {
                        //transaction이 완료되어 블록에 담겼는지 확인
                        console.log(info);
                        if (info.blockNumber) {
                            try {
                                //업데이트 된 정보를 갱신 및 상태 complete로
                                const { blockHash, blockNumber, transactionIndex } = info;
                                transactionForm.findOneAndUpdate(
                                    { hash: tx.hash },
                                    { blockHash, blockNumber, transactionIndex, status: "compelete" },
                                    { new: true, upsert: true },
                                    (err) => { if (err) { console.log(err) } });
                                console.log(`${tx.hash} 완료[${tx.type}]`)

                                if (tx.type === "buyNFT") {
                                    // 완료된 type이 buyNFT인 경우 토큰 지급 후 NFT전송이 이루어져야 하므로 서버에 요청
                                    const transferURI = "http://localhost:8888/exchange/transferNFT"
                                    axios.post(transferURI, { tokenTx: tx.hash })
                                    console.log(`NFT_Id: ${tx.tokenId} 토큰지급완료, nft전송요청`)
                                } else if (tx.type === "transferNFT") {
                                    //완료된 type이 transfetNFT인 경우 모든 거래가 완료되었으므로 거래상태 및 판매상태 변경
                                    //거래상태 변경
                                    exchangeForm.findOneAndUpdate(
                                        { tokenId: tx.tokenId, trade_state: "거래중" },
                                        { trade_state: "판매완료" },
                                        { new: true, upsert: true },
                                        (err) => { if (err) { console.log(err) } })

                                    //판매상태 변경
                                    tradeForm.findOneAndUpdate(
                                        { NFTTx: tx.hash },
                                        { status: "거래완료" },
                                        { new: true, upsert: true },
                                        (err) => { if (err) { console.log(err) } })

                                }

                            } catch (e) {
                                console.log(e);
                            }
                        }
                    });
            }
        }
    })
})

