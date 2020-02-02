import { AppBar, Grid, MenuItem, Toolbar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function TopBar({ children }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <MenuItem component={Link} to="/">
              AutoChef
            </MenuItem>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
