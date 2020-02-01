import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import {
  Toolbar,
  MenuIcon,
  AppBar,
  Box,
  Button,
  Typography,
} from "@material-ui/core";

import Catalog from "./Catalog"
import Editor from "./Editor"
import Recipe from "./Recipe"

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Recipe.io
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
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
    </>
  );
}

export default App;
