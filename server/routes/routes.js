const express = require("express");
const router = express.Router();
const crypto = require('crypto-js');
const Web3 = require("web3");
const mongoose = require("mongoose");
const signUpForm = require("../forms/SignupForm");

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  signUpForm.findOne({ username: username }, (err, user) => {
    if (user) {
      res.send({ message: "이미 있는 유저입니다." });
    } else {
      const salt = Math.random().toString(36).substring(2, 11);
      const encryptPw = crypto.SHA256(password + salt).toString();
      const user = new signUpForm({
        username,
        password: encryptPw,
        salt,
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

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  signUpForm.findOne({ username, username }, (err, user) => {
    if (user) {
      const salt = user.salt;
      const encryptPw = crypto.SHA256(password + salt).toString();
      if (user.password === encryptPw) {
        res.send({
          message: "로그인 성공",
          data: user
        });
      } else {
        res.send({
          message: "비밀번호를 잘못 입력하셨습니다.",
          data: null
        });
      }
    } else {
      res.send({
        message: "존재하지 않는 아이디 입니다.",
        data: null
      });
    }
  })

});
module.exports = router;
