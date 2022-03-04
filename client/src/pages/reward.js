import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const Reward = ({ account }) => {
  const reqEth = async () => {
    const rewardURL = "http://localhost:8888/reward";
    console.log(account);
    // const email = "server";
    const useraddress = account;
    await axios
      .post(rewardURL, {
        // email,
        useraddress,
      })
      .then((res) => {
        if (res.data.data) {
          //dispatch(logIn(res.data.data));
          //navigate("/");
          console.log(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="modal-wrapper">
      <p>send eth</p>
      <button className="modal-button" onClick={() => reqEth()}>
        send
      </button>
    </div>
  );
};

export default Reward;
