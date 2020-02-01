import React from "react";
import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Toolbar,
  Typography
} from "@material-ui/core";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

export default function TopBar({ children }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between">
          <Grid item>
            <Link style={{ textDecoration: "none" }} to="/">
              <Typography variant="h6" color="textPrimary">
                AutoChef
              </Typography>
            </Link>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
