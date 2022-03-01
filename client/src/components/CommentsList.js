import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function CommentsList() {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
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
      <Divider />

      <ListItem alignItems="flex-start">
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
      <Divider />
    </List>
  );
}
