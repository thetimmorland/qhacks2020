import React from "react";
import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  MenuItem,
} from "@material-ui/core";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

export default function TopBar({ children }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between">
          <Grid item>
              <MenuItem component={Link} to="/" >
                AutoChef
              </MenuItem>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
