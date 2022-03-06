const express = require("express");
const router = express.Router();
const crypto = require("crypto-js");
const dotenv = require("dotenv");
const Web3 = require("web3");
const signUpForm = require("../forms/SignupForm");
const addNewContent = require("../forms/NewContent");
const addNewComment = require("../forms/NewComment");
const transactionForm = require("../forms/transactionForm");
dotenv.config();

const rpcURL = process.env.RPC_URL;
const web3 = new Web3(rpcURL);

router.post("/signup", (req, res) => {
  const { email, username, password, address } = req.body;
  signUpForm.findOne({ username, username }, (err, user) => {
    if (user) {
      res.send({ message: "이미 존재하는 닉네임입니다.", success: false });
    } else {
      signUpForm.findOne({ email: email }, (err, user) => {
        if (user) {
          res.send({ message: "이미 있는 유저입니다.", success: false });
        } else {
          const salt = Math.random().toString(36).substring(2, 11);
          const encryptPw = crypto.SHA256(password + salt).toString();
          const user = new signUpForm({
            email,
            username,
            password: encryptPw,
            address,
            salt,
          });
          console.log("user" + user);

          user.save((err) => {
            if (err) {
              res.send(err);
            } else {
              res.send({
                message: "회원가입이 완료되었습니다. 로그인해주세요.",
                success: true,
              });
            }
          });
        }
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  signUpForm.findOne({ email, email }, (err, user) => {
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
        message: "존재하지 않는 계정 입니다.",
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
  const newcomment = new addNewComment({
    contentid,
    username,
    comment,
  });

  // console.log("newcomment =", req.body);
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

router.get("/content/:id", (req, res) => {
  const { contentid } = req.query;
  addNewComment.find({ contentid: contentid }, (err, contents) => {
    if (err) res.send(err);
    else {
      res.send(contents);
    }
  });
});

router.post("/recordTx", (req, res) => {
  const { hash, type, tokenId } = req.body;
  if (hash) {
    transactionForm.findOne({ hash: hash }, (err, tx) => {
      if (tx) {
        res.send({ message: "이미 기록된 트랜잭션입니다." });
      } else {

        web3.eth.getTransaction(hash)
          .then(async (info) => {

            const { hash, nonce, from, to, value, gas, gasPrice, input, v, r, s, } = info;

            const newTx = new transactionForm({
              hash, nonce, from, to, value, gas, gasPrice, input, v, r, s, type, tokenId,
              status: "pending"
            })

            newTx.save((err) => {
              if (err) {
                res.send(err);
              } else {
                res.send({
                  message: "트랜잭션이 기록되었습니다.",
                  data: newTx,
                });
              }
            });
          })
      }
    })
  }
})

router.put("/", (req, res) => {
  const { data } = req.body;
  let mongoose = require("mongoose");
  let id = mongoose.Types.ObjectId(data.id);

  addNewContent.updateOne({ _id: id }, { $inc: { viewed: 1 } }, (err) => {
    if (err) {
      res.send(err);
    }
  });
});

module.exports = router;
