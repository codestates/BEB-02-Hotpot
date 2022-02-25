import React, { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";

export default function connectWallet({ connectWallet, account }) {
  return (
    <div className="connect wallet icon">
      <button
        type="button"
        className="navIcon"
        onClick={() => {
          connectWallet();
        }}
      >
        Connect Wallet
      </button>
      {/* <div className="userInfo">주소: {account}</div> */}
    </div>
  );
}
