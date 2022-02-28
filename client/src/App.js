import "./App.css";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Community from "./pages/Community";
import SignUp from "./pages/Signup";
import Exchange from "./pages/Exchange";
import Nav from "./components/Nav";
import Write from "./pages/Write";
import ConnectWallet from "./components/ConnectWallet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  };
  return (
    <Router>
      <Nav connectWallet={connectWallet} />
      <Routes>
        <Route path="/" element={<Community />} />
        <Route path="/signup" element={<SignUp account={account} />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </Router>
  );
}

export default App;
