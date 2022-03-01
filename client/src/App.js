import "./App.css";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Community from "./pages/Community";
import SignUp from "./pages/Signup";
import Exchange from "./pages/Exchange";
import Nav from "./components/Nav";
import Write from "./pages/Write";
import ConnectWallet from "./components/ConnectWallet";
import Post from "./pages/Post";
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
      <Nav />
      <Routes>
        <Route path="/" element={<Community />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/write" element={<Write />} />
        <Route path="/content/:id" element={<Post />} />
        <Route
          path="/wallet"
          element={
            <ConnectWallet
              web3={web3}
              account={account}
              connectWallet={connectWallet}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
