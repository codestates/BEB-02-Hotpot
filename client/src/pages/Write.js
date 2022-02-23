import { React, useState } from "react";
import styled from "styled-components";

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

const Content = styled(Title)`
  min-height: 40vh;
`;

const Enter = styled.button`
  background-color: #8977ad;
  display: flex;
`;

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
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
        <Enter>등록</Enter>
      </Container>
    </div>
  );
}
