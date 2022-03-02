import React from "react";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function CommentsList({ contentid }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function reqData() {
      await axios
        .get("http://localhost:8888/content/:id", { params: { contentid } })
        .then((res) => {
          let _comments = res.data.map((comment) => ({
            writtenby: comment.username,
            comment: comment.comment,
            createdat: comment.date,
          }));
          setComments(comments.concat(_comments));
        })
        .catch((e) => console.log(e));
    }
    reqData();
  }, []);

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {comments.map((comment) => {
        return (
          <ListItem alignItems="flex-start">
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography
                    component="div"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment.writtenby}
                  </Typography>
                  <Typography
                    component="div"
                    variant="body1"
                    color="text.primary"
                  >
                    {comment.comment}
                  </Typography>
                  <Typography
                    fontSize={5}
                    component="div"
                    color="text.secondary"
                  >
                    {comment.createdat}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}

      {/* <ListItem alignItems="flex-start">
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography component="div" variant="body2" color="text.primary">
                Ali Connors
              </Typography>
              <Typography component="div" variant="body1" color="text.primary">
                I'll be in your neighborhood doing errands this…
              </Typography>
              <Typography fontSize={5} component="div" color="text.secondary">
                2022.03.01 00:00
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider /> */}
    </List>
  );
}
