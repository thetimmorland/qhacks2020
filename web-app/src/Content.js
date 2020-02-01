import { Box, Container, Grid } from "@material-ui/core";
import React from "react";

export default function Content(props) {
  return (
    <Box p={2}>
      <Container maxWidth="md">
        <Grid container direction="column" spacing={2}>
          {props.children}
        </Grid>
      </Container>
    </Box>
  );
}
