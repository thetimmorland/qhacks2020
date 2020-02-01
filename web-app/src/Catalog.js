import React from "react";
import TopBar from "./TopBar";

import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Toolbar,
  Typography
} from "@material-ui/core";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

export default function Catalog() {
  return (
    <>
      <TopBar title="AutoChef">
        <Link style={{ textDecoration: "none" }} to="/editor">
          <Button variant="contained" color="secondary">
            Create
          </Button>
        </Link>
      </TopBar>
    </>
  );
}
