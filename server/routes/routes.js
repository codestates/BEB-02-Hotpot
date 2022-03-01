const express = require("express");
const router = express.Router();
const crypto = require("crypto-js");
const Web3 = require("web3");
const mongoose = require("mongoose");
const signUpForm = require("../forms/SignupForm");
const addNewContent = require("../forms/NewContent");
const addNewComment = require("../forms/NewComment");
const e = require("express");

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
  console.log(password);
  signUpForm.findOne({ username, username }, (err, user) => {
    if (user) {
      const salt = user.salt;
      const encryptPw = crypto.SHA256(password + salt).toString();
      if (user.password === encryptPw) {
        res.send({
          message: "로그인 성공",
          data: user,
        });
      } else {
        res.send({
          message: "비밀번호를 잘못 입력하셨습니다.",
          data: null,
        });
      }
    } else {
      res.send({
        message: "존재하지 않는 아이디 입니다.",
        data: null,
      });
    }
  });
});

router.post("/newcontent", (req, res) => {
  const { title, content, username } = req.body;
  const newcontent = new addNewContent({ username, title, content });

  newcontent.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({
        message: "게시물이 등록되었습니다.",
      });
    }
  });
});

router.get("/", (req, res) => {
  addNewContent.find({}, (err, contents) => {
    if (err) res.send(err);
    else {
      res.send(contents);
    }
  });
});

router.post("/newcomment", (req, res) => {
  const { contentid, comment, username } = req.body;
  const newcomment = new addNewComment({ contentid, username, comment });

  console.log(req.body);
  newcomment.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({
        message: "댓글이 등록되었습니다.",
      });
    }
  });
});

module.exports = router;
