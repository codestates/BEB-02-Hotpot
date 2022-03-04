const express = require("express");
const router = express.Router();
const crypto = require("crypto-js");
const ethFaucetForm = require("../forms/ethFaucetForm");
const Web3 = require("web3");
const erc20Abi = require("../erc20Abi");
const tokenAddress = "0x019A351B33D2e7a5124065a7738b3423482864D9"; //HPT 토큰주소
let web3, serverAddress, contract;
let balance = 0;

//컨트랙트의 해당 토큰 잔액 조회
async function getBalance(toAddress) {
  try {
    const balance = await contract.methods.balanceOf(toAddress).call();
    console.log("To 주소의 토큰 잔액" + balance);
    return balance;
  } catch (e) {
    console.log(e);
    return e;
  }
}

//컨트랙트의 토큰 transfer (코드스테이츠 제공)
async function setTransfer(fromAddress, toAddress, amount) {
  const isOk = await contract.methods.approve(toAddress, parseInt(amount));
  //console.log("토큰 승인 요청 성공여부 : ", isOk);
  const limited_token = await contract.methods.approve(fromAddress, toAddress);
  // console.log(`전송이 허용된 토큰수량 : ${limited_token}개 입니다.`);
  // console.log('transfer() 실행전....');
  const result = await contract.methods
    .transfer(toAddress, parseInt(amount))
    .send(
      {
        from: fromAddress,
        gasPrice: web3.utils.toHex(web3.eth.gasPrice),
        gas: web3.utils.toHex(100000),
      },
      function (err, txhash) {
        try {
          //console.log('txHash:', txhash);
          //여기서 나온 txhash 로 블록 조회 하고
          //조회가 끝나면 잔액 체크 해주고
          //바뀐 잔액을 DB로 업데이트 해준다.
        } catch (err) {
          console.log("Error " + err.toString());
        }
      }
    );
  console.log("transfer() 실행완료");
  return result;
}

//컨트랙트의 토큰 transferFrom
async function setTransferFrom(fromAddress, toAddress, amount) {
  let nonce = web3.utils.toHex(web3.eth.getTransactionCount(fromAddress));
  let gasPrice = web3.utils.toHex(web3.eth.gasPrice);
  let value = web3.utils.toHex(web3.utils.toWei(`${amount}`));
  console.log(value);
  let gasLimit = web3.utils.toHex(100000);

  const isOk = await contract.methods.approve(toAddress, value);
  console.log("토큰 승인 요청 성공여부 : ", isOk);
  const limited_token = await contract.methods.approve(fromAddress, toAddress);
  console.log(`전송이 허용된 토큰수량 : ${limited_token}개 입니다.`);
  const result = await contract.methods.transferFrom(
    fromAddress,
    toAddress,
    value
  );
  return result;
}

router.post("/reward", (req, res) => {
  const { useraddress } = req.body;

  // users 테이블(서버의 계정주소와 프라이빗키가 저장되어 있는 테이블) 검색
  // 현재 username과 패스워드는 server, server 이다.
  ethFaucetForm.findOne({ username: "server" }, async (err, server) => {
    if (server) {
      //1. ERC20 토큰을 배포한 네트워크 주소
      web3 = new Web3(
        "https://ropsten.infura.io/v3/3fbe081021374f6d876b8153dab168f5"
      );
      await web3.eth.accounts.wallet.add(server.privateKey);
      console.log(server.privateKey);
      //2.서버 계정 주소
      serverAddress = server.address;
      console.log("서버(토큰생성자) 계정 주소 : ", serverAddress);

      //3. 사용자(토큰받을 사람)의 계정주소 useraddress
      let toAddress = useraddress;
      console.log("3. 사용자(토큰받을 사람)의 계정주소", useraddress);

      //4.스마트 컨트랙트 객체 생성 tokenAddress가 스마트컨트랙주소???
      contract = new web3.eth.Contract(erc20Abi, tokenAddress, {
        from: serverAddress,
        gasPrice: "20000000",
      });

      const bal = await getBalance(serverAddress);
      console.log(`지갑 ${serverAddress}의 잔액은... ${bal} wei입니다.`);
      balance = web3.utils.fromWei(bal);
      let amount = 4;
      let result;
      if (balance > 0.0) {
        //let toAddress = serverAddress;
        result = await setTransferFrom(serverAddress, toAddress, 4).then(() => {
          console.log(`4 HPT 전송.`);
          //console.log(`총잔액 ${balance} HPT`);
        });
      } else {
        console.log(`지갑 잔액부족. ${balance} HPT입니다.`);
      }

      res.send({
        message: "토큰전송 성공",
        data: {
          username: server.userName, // 사용자 이름
          address: server.address, // 사용자의 주소
          balance: balance, // 사용자 이더 잔액
          txHash: "txHash값", // 토큰 트랜잭션 해시
        },
      });
    }
  });
});
module.exports = router;
