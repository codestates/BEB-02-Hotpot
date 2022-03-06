const tradeForm = require("../../forms/tradeForm");
const transactionForm = require("../../forms/transactionForm");
const HotNFTAbi = require("../../HotNFTAbi");
const dotenv = require("dotenv");
const Web3 = require("web3");
dotenv.config();

const ownerAddress = process.env.OWNER_ADDRESS;
const ownerKey = process.env.OWNER_KEY;
const rpcURL = process.env.RPC_URL;
const web3 = new Web3(rpcURL);
const NFTaddr = "0xCc1108f7c353e5d12DfdeD369ec21C46570afd6D";


module.exports = {
    trasferNFT: async (req, res) => {
        // tokenTx는 토큰 지급된 transaction의 hash값
        const { tokenTx } = req.body;

        //db에서 seller buyer 읽어오기
        tradeForm.findOne({ tokenTx }, async (err, trade) => {
            const contract = new web3.eth.Contract(HotNFTAbi, NFTaddr, { from: ownerAddress });
            const data = contract.methods
                .safeTransferFrom(
                    trade.seller_address,
                    trade.buyer_address,
                    trade.tokenId).encodeABI();
            const rawTransaction = { "to": NFTaddr, "gas": 100000, "data": data };

            //safeTransferFrom 실행
            web3.eth.accounts.signTransaction(rawTransaction, ownerKey)
                .then(signedTx => {
                    web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                    console.log("nft 지급 트랜잭션 생성");

                    //발생한 transaction 기록 
                    const transferHash = signedTx.transactionHash;
                    console.log(transferHash)

                    //트랜잭션 기록되기도 전에 바로 읽어오려하면 null값이라 1초 대기
                    setTimeout(() => {
                        web3.eth.getTransaction(transferHash)
                            .then(async (info) => {
                                //읽어온 nft전송 트랜잭션 정보를 db에 기록
                                const { nonce, from, to, value, gas, gasPrice, input, v, r, s, } = info;
                                const newTx = new transactionForm({
                                    nonce, from, to, value, gas, gasPrice, input, v, r, s,
                                    hash: transferHash,
                                    tokenId: trade.tokenId,
                                    type: "transferNFT",
                                    status: "pending"
                                })

                                newTx.save((err) => {
                                    if (err) {
                                        res.send(err);
                                    } else {
                                        console.log("NFT 전송 트랜잭션이 기록되었습니다.")
                                    }
                                });
                            })
                    }, 1000);


                    //trade 상태 "NFT전송중"으로 업데이트 및 NFT전송 Tx 기록
                    tradeForm.findOneAndUpdate({ tokenTx },
                        { NFTTx: transferHash, status: "NFT전송중" },
                        { new: true, upsert: true },
                        (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log("trade의 정보가 업데이트 되었습니다.");
                            }
                        })
                })
        })
    }
}