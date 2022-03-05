import { React, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import jQuery from "jquery";
import { useNavigate } from "react-router-dom";
window.$ = window.jQuery = jQuery;

const Comment = styled.textarea`
  width: 85%;
  height: 13vh;
  border: 0.1em groove;
`;

const Enter = styled.button`
  position: absolute;
  background-color: #8977ad;
  margin-left: 1em;
  height: 13vh;
  width: 10%;
`;

export default function NewComment({ contentid, useraddress }) {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const account = useSelector((state) => state.accountReducer);

  function reloadDivArea() {
    window.$("#div_comment").load(window.location.href + " #div_comment");
  }

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const save = async () => {
    if (comment && account.account.username) {
      await axios
        .post("http://localhost:8888/newcomment", {
          contentid,
          comment,
          username: account.account.username,
        })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          reward();
          reloadDivArea();
          navigate("/");
          //window.location.reload();
        });
    } else if (!account.account.username) alert("로그인 후 작성해주세요.");
    else alert("내용을 입력해주세요.");
  };

  const reward = async () => {
    if (!useraddress) {
      alert("보상실패 : 지갑연결을 먼저 해주세요.");
      return;
    }
    const rewardURL = "http://localhost:8888/reward";
    console.log("reward useraddress: ", useraddress);
    await axios
      .post(rewardURL, {
        useraddress: useraddress,
        rewardtype: "comment",
      })
      .then((res) => {
        if (res.data.data) {
          console.log(res.data.data);
          alert("댓글보상으로 1 토큰을 지급하였습니다.");
        } else {
          alert(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div id="div_comment">
      <div>
        <h4>댓글쓰기</h4>
        <Comment
          id="comment"
          type="text"
          placeholder="댓글을 남겨보세요"
          onChange={onChangeComment}
        ></Comment>
        <Enter onClick={save}>등록</Enter>
      </div>
    </div>
  );
}
