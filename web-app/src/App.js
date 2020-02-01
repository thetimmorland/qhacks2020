import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import {
  CssBaseline,
  Toolbar,
  MenuIcon,
  AppBar,
  Grid,
  Box,
  Button,
  Typography,
} from "@material-ui/core";

import Catalog from "./Catalog"
import Editor from "./Editor"
import Recipe from "./Recipe"

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6">Recipe.io</Typography>
            </Grid>
            <Grid item>
              <Link style={{ textDecoration: 'none' }} to="/create">
                <Button variant="contained">Create</Button>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/">
          <Catalog />
        </Route>
        <Route path="/create">
          <Editor />
        </Route>
        <Route path="/recipe/:recipeId">
          <Recipe />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
