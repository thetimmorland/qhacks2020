import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Toolbar,
  Typography
} from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Catalog from "./Catalog";
import Editor from "./Editor";
import Recipe from "./Recipe";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route exact path="/">
          <Catalog />
        </Route>
        <Route path="/editor">
          <Editor />
        </Route>
        <Route path="/recipes/:recipeId">
          <Recipe />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
