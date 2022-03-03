const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Web3 = require("web3");
const transactionForm = require("./forms/transactionForm");
dotenv.config();

const rpcURL = process.env.RPC_URL;
const web3 = new Web3(rpcURL);

//완료되지 않은 transaction 체크
mongoose.connect(process.env.DB_URI, () => {
    console.log("DB 연결됨");
    transactionForm.find({ status: "pending" }, (err, txList) => {
        //pending 상태인 tx 있는지 체크
        if (txList.length) {
            for (const tx of txList) {
                web3.eth.getTransaction(tx.hash)
                    .then(async (info) => {
                        //transaction이 완료되어 블록에 담겼는지 확인
                        if (info.blockNumber) {
                            try {
                                const { blockHash, blockNumber, transactionIndex } = info;

                                const newInfo = await transactionForm.findById(tx._id);
                                newInfo.blockHash = blockHash;
                                newInfo.blockNumber = blockNumber;
                                newInfo.transactionIndex = transactionIndex;
                                newInfo.status = "complete";

                                let result = await newInfo.save();
                                console.log(result)
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    });
            }
        }
    })
})

