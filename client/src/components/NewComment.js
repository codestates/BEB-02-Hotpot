import { React, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";

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

export default function NewComment({ contentid }) {
  const [comment, setComment] = useState("");
  const account = useSelector((state) => state.accountReducer);

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
          window.location.reload();
        });
    } else if (!account.account.username) alert("로그인 후 작성해주세요.");
    else alert("내용을 입력해주세요.");
  };

  return (
    <div>
      <h4>댓글쓰기</h4>
      <Comment
        type="text"
        placeholder="댓글을 남겨보세요"
        onChange={onChangeComment}
      ></Comment>
      <Enter onClick={save}>등록</Enter>
      <div />
    </div>
  );
}
