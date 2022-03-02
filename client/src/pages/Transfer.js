import React, { useState } from "react";

function Transfer({ web3, account }) {
  const fromAddress = account;
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  const sendToken = async () => {
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
  };
  return (
    <div className="TransferToken">
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
          sendToken();
        }}
      >
        send Token
      </button>
    </div>
  );
}

export default Transfer;
