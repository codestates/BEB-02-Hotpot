import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { erc20Abi, erc20Addr } from '../erc20Contract';
import axios from 'axios';

function Transfer({ web3, account }) {
  const accountState = useSelector((state) => state.accountReducer);
  const fromAddress = accountState.account.address;
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const recordTxURL = "http://localhost:8888/recordTx";

  async function getBalance(address) {
    try {
      const contract = new web3.eth.Contract(erc20Abi, erc20Addr);
      const balance = await contract.methods.balanceOf(address).call();
      console.log('잔액' + balance);
      return balance;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  const sendToken = async (toAddress, amount) => {
    const contract = new web3.eth.Contract(erc20Abi, erc20Addr);
    console.log(toAddress);
    console.log(fromAddress);
    getBalance(fromAddress);
    if (!toAddress) {
      alert("전송할 주소를 입력해주세요.");
    } else if (!fromAddress) {
      alert("로그인 해주세요.")
    } else if (!account) {
      alert("지갑을 연결해주세요")
    } else if (fromAddress !== account) {
      alert(`등록된 지갑(${fromAddress})과 연결된 지갑(${account})이 다릅니다.`)
    }
    else {
      const result = await contract.methods.transfer(toAddress, String(amount * Math.pow(10, 18))).send(
        { from: fromAddress, gasPrice: 2352340696, gas: 60000 },
        function (err, txhash) {
          try {
            axios.post(recordTxURL, { hash: txhash, type: "sendToken" })
              .then((res) => {
                console.log(res.data);
              })
              .catch((e) => console.log(e));
          } catch (e) {
            console.log(e);
          }
        }
      )
    }
    /*
    console.log(fromAddress);
    var nonce = web3.utils.toHex(web3.eth.getTransactionCount(fromAddress));
    var gasPrice = web3.utils.toHex(web3.eth.gasPrice);
    var value = web3.utils.toWei(amount, "ether");
    var gasLimit = web3.utils.toHex(
      web3.eth.estimateGas({
          to: toAddress,
        from: fromAddress,
        value: value,
      })
        );
        var txObject = {
          nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: toAddress,
        from: fromAddress,
        value: value,
    };
        var transactionHash = web3.utils.toHex(web3.eth.sendTransaction(txObject));
        console.log("transactionHash, etherscan에서 검색 : ", transactionHash);
        alert(transactionHash);
  */};
  return (
    <div className="TransferToken">
      <div>
        <input
          type="text"
          placeholder="recipient address"
          value={toAddress}
          onChange={(e) => {
            setToAddress(e.target.value);
          }}
        ></input>
        <input
          className="Amount"
          type="text"
          placeholder="amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        ></input>
        <button
          className="sendTokenBtn"
          onClick={() => {
            sendToken(toAddress, amount);
          }}
        >
          send Token
        </button>
      </div>
      <div>
        <button id="rewardbtn" style={{ background: "#8977ad" }}>
          <Link to="/reward" style={{ textDecoration: "none" }}>
            eth faucet
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Transfer;
