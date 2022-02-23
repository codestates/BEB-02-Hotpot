const express = require("express");
const router = express.Router();
const Web3 = require("web3");
const mongoose = require("mongoose");
const signUpForm = require("../forms/SignupForm");

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  signUpForm.findOne({ username: username }, (err, user) => {
    if (user) {
      res.send({ message: "이미 있는 유저입니다." });
    } else {
      const user = new signUpForm({
        username,
        password,
      });
      console.log("user" + user);

      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({
            message: "회원가입이 완료되었습니다. 로그인해주세요.",
          });
        }
      });
    }
  });
});
module.exports = router;
