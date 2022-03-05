import { React, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  text-align: center;
  border-top: groove;
`;
const Title = styled.input`
  width: 95%;
  height: 40px;
  border-radius: 8px;
  margin-top: 0.5em;
`;

const Content = styled.textarea`
  width: 95%;
  height: 40px;
  border-radius: 8px;
  margin-top: 0.5em;
  min-height: 40vh;
`;

const Enter = styled.button`
  background-color: #8977ad;
  display: flex;
`;

export default function Write({ useraddress }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const account = useSelector((state) => state.accountReducer);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const save = async () => {
    // console.log("title= " + title);
    // console.log(account.account.username);
    // console.log("content= " + content);
    if (title && content && account.account.username) {
      await axios
        .post("http://localhost:8888/newcontent", {
          title,
          content,
          username: account.account.username,
        })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          reward();
          navigate("/");
        });
    } else if (!account.account.username)
      alert("게시글은 로그인 후 작성이 가능합니다.");
    else {
      alert("제목과 내용을 입력해주세요.");
    }
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
        rewardtype: "content",
      })
      .then((res) => {
        if (res.data.data) {
          console.log(res.data.data);
          alert("글쓰기 보상으로 4 토큰을 지급하였습니다.");
        } else {
          alert(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h3>커뮤니티 글쓰기</h3>
      <Container>
        <Title
          type="text"
          placeholder="제목을 입력해 주세요."
          onChange={onChangeTitle}
        ></Title>
        <Content
          type="text"
          placeholder="내용을 입력하세요."
          onChange={onChangeContent}
        ></Content>
        <Enter onClick={save}>등록</Enter>
      </Container>
    </div>
  );
}
