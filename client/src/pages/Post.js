import { React } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import NewComment from "../components/NewComment";
import CommentsList from "../components/CommentsList";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const Container = styled.div`
  width: 95%;
  margin: 2em auto;
  /* border: 0.2em groove;
  border-radius: 5px; */
`;

const Title = styled.div`
  font-size: 2em;
  font-weight: 500;
`;

const Contentdiv = styled.div`
  margin-top: 1em;
  margin-bottom: 2em;
`;

export default function Post() {
  const location = useLocation();
  const data = location.state.data;

  return (
    <Container>
      <Title>{data.title}</Title>
      {data.writtenby}
      <Typography component="div" variant="body2" color="text.secondary">
        {data.createdat} 조회 {data.viewed}
      </Typography>
      <Divider />
      <Contentdiv>
        {data.content.split("\n").map((line) => {
          return (
            <span>
              {line}
              <br />
            </span>
          );
        })}
      </Contentdiv>
      <Divider />
      <NewComment contentid={data.id} />
      <CommentsList contentid={data.id} />
    </Container>
  );
}
