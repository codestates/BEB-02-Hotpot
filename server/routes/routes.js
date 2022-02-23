const express = require("express");
const router = express.Router();
const Web3 = require("web3");
const mongoose = require("mongoose");
const signUpForm = require("../forms/SignupForm");
const e = require('express');

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

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(password)
  signUpForm.findOne({ username, username }, (err, user) => {
    if (user) {
      if (user.password === password) {
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
