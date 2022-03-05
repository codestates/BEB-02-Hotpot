const express = require("express");
const router = express.Router();
const crypto = require("crypto-js");
const ethFaucetForm = require("../forms/ethFaucetForm");
const Web3 = require("web3");
const erc20Abi = require("../erc20Abi");

const contractAddress = "0x019A351B33D2e7a5124065a7738b3423482864D9"; //HPT 토큰주소
let web3, serverAddress, contract;

//컨트랙트의 해당 토큰 잔액 조회
async function getTOKENBalanceOf(toAddress) {
  try {
    const balance = await contract.methods.balanceOf(toAddress).call();
    return web3.utils.fromWei(balance);
  } catch (e) {
    console.log(e);
    return e;
  }
}

router.post("/reward", async (req, res) => {
  const { useraddress, rewardtype } = req.body;
  console.log("useraddress 값", useraddress);
  const toAddress = useraddress;
  //보상 토큰 설정
  var amount = "4";
  if (rewardtype === "comment") {
    //댓글 보상
    amount = "1";
  } else {
    //글쓰기 보상
    amount = "4";
  }
  // users 테이블(서버의 계정주소와 프라이빗키가 저장되어 있는 테이블) 검색
  const server_info = await ethFaucetForm.findOne({ server: "server" });
  if (server_info) {
    //1. ERC20 토큰을 배포한 네트워크 주소
    web3 = new Web3(
      //        new web3.providers.HttpProvider(
      "https://ropsten.infura.io/v3/3fbe081021374f6d876b8153dab168f5"
      //       )
    );
    const privateKey = server_info.privateKey;
    //2. 서버(소유자)의 프라이빗키를 이용하여 지갑 등록
    await web3.eth.accounts.wallet.add(privateKey);

    //3. 서버(토큰 보유자) 계정 주소
    ownerAddress = server_info.address;
    console.log("서버(토큰 보유자)Account Address : ", ownerAddress);

    //4. 스마트 컨트랙트 객체 생성
    contract = new web3.eth.Contract(erc20Abi, contractAddress, {
      from: ownerAddress,
      // gasPrice: "20000000",
    });
    //5. 서버(토큰 보유자)Account Address 잔액조회
    const balance = await getTOKENBalanceOf(ownerAddress);
    console.log(`======== 토큰 발송 전 보유량 ========`);
    console.log(`[전송 전] 서버  토큰 수 : ${balance}`);
    getTOKENBalanceOf(toAddress).then((balance) => {
      console.log(`[전송 전] 사용자 토큰 수 : ${balance}`);
    });

    //6. 토큰 wei변환 및 token transaction 데이터 생성
    var value = web3.utils.toWei(amount);
    var data = contract.methods.transfer(toAddress, value).encodeABI();
    var rawTransaction = { to: contractAddress, gas: 100000, data: data };

    //7. 생성된 token transaction 실행
    web3.eth.accounts
      .signTransaction(rawTransaction, privateKey)
      .then((signedTx) =>
        web3.eth.sendSignedTransaction(signedTx.rawTransaction)
      )
      .then((req) => {
        /* The trx was done. Write your acctions here. For example getBalance */
        console.log("전송결과 : ", req);
        getTOKENBalanceOf(ownerAddress).then((balance) => {
          console.log(`[전송 후] 서버 토큰 수 : ${balance}`);
        });
        getTOKENBalanceOf(toAddress).then((balance) => {
          console.log(`[전송 후] 사용자 토큰 수 : ${balance}`);
        });
        const txHash = req.transactionHash;
        console.log("토큰 트랜잭션 해시 :" + txHash);
        res.send({
          message: "토큰전송 성공",
          data: {
            //username: server_info.userName, // 사용자 이름
            address: toAddress, // 사용자의 주소
            balance: balance, // 사용자 이더 잔액
            txHash: txHash, // 토큰 트랜잭션 해시
          },
        });
      });
  }
});

module.exports = router;
