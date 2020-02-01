import { Box, Container, Paper } from "@material-ui/core";
import React from "react";

export default function PaperHeader(props) {
  return (
    <Paper>
      <Box p={2}>
        {props.header}
        <Container maxWidth="md">{props.children}</Container>
      </Box>
    </Paper>
  );
}
