import React, { useState } from "react";

import {
  Button,
  Container,
  Box,
  Paper,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import TopBar from "./TopBar";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export default function Editor() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [instructions, setInstructions] = useState([""]);
  const [ingredients, setIngredients] = useState([
    { amount: "", unit: "", name: "" }
  ]);

  const handleTextChange = setText => event => {
    setText(event.target.value);
  };

  const handleIngredientAmountChange = idx => event => {
    let newIngredients = [...ingredients];
    newIngredients[idx] = {
      ...newIngredients[idx],
      amount: event.target.value
    };
    setIngredients(newIngredients);
  };

  const handleIngredientUnitChange = idx => event => {
    let newIngredients = [...ingredients];
    newIngredients[idx] = { ...newIngredients[idx], unit: event.target.value };
    setIngredients(newIngredients);
  };

  const handleIngredientNameChange = idx => event => {
    let newIngredients = [...ingredients];
    newIngredients[idx] = { ...newIngredients[idx], name: event.target.value };
    setIngredients(newIngredients);
  };

  const handleAddIngredient = idx => () => {
    let newIngredients = [...ingredients];
    newIngredients.splice(idx + 1, 0, { amount: "", unit: "", name: "" });
    setIngredients(newIngredients);
  };

  const handleRemoveIngredient = idx => () => {
    if (ingredients.length > 1) {
      let newIngredients = [...ingredients];
      newIngredients.splice(idx, 1);
      setIngredients(newIngredients);
    }
  };

  const handleInstructionChange = idx => event => {
    let newInstructions = [...instructions];
    newInstructions[idx] = event.target.value;
    setInstructions(newInstructions);
  };

  const handleAddInstruction = idx => () => {
    let newInstructions = [...instructions];
    newInstructions.splice(idx + 1, 0, "");
    setInstructions(newInstructions);
  };

  const handleRemoveInstruction = idx => () => {
    if (instructions.length > 1) {
      let newInstructions = [...instructions];
      newInstructions.splice(idx, 1);
      setInstructions(newInstructions);
    }
  };

  const handleSubmit = event => {
    let formData = { name, notes, ingredients, instructions };
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TopBar title="AutoChef Editor">
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
      </TopBar>
      <Box p={2}>
        <Container maxWidth="md">
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Paper>
                <Box p={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Recipe Name"
                        variant="outlined"
                        value={name}
                        onChange={handleTextChange(setName)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Additional Notes"
                        variant="outlined"
                        value={notes}
                        onChange={handleTextChange(setNotes)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
            <Grid item>
              <Paper>
                <Box p={2}>
                  <Typography color="primary" variant="h6" gutterBottom>
                    Ingredients
                  </Typography>
                  <Container maxWidth="md">
                    {ingredients.map((ingredient, idx) => (
                      <Grid
                        key={idx}
                        container
                        spacing={2}
                        alignItems="center"
                        justify="space-between"
                      >
                        <Grid item xs={4} md={2}>
                          <TextField
                            fullWidth
                            type="number"
                            variant="outlined"
                            label="Amount"
                            value={ingredient.amount}
                            onChange={handleIngredientAmountChange(idx)}
                          />
                        </Grid>
                        <Grid item xs={8} md={3}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Unit"
                            value={ingredient.unit}
                            onChange={handleIngredientUnitChange(idx)}
                          />
                        </Grid>
                        <Grid item xs={8} md={3}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Name"
                            value={ingredient.name}
                            onChange={handleIngredientNameChange(idx)}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            fullWidth
                            variant="outlined"
                            onClick={handleAddIngredient(idx)}
                          >
                            <AddIcon />
                          </Button>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            fullWidth
                            variant="outlined"
                            onClick={handleRemoveIngredient(idx)}
                          >
                            <RemoveIcon />
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                  </Container>
                </Box>
              </Paper>
            </Grid>
            <Grid item>
              <Paper>
                <Box p={2}>
                  <Typography color="primary" variant="h6" gutterBottom>
                    Instructions
                  </Typography>
                  <Container maxWidth="md">
                    {instructions.map((instruction, idx) => (
                      <Grid container key={idx} spacing={2} direction="column">
                        <Grid item>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={8}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                value={instruction}
                                onChange={handleInstructionChange(idx)}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Button
                                fullWidth
                                variant="outlined"
                                onClick={handleAddInstruction(idx)}
                              >
                                <AddIcon />
                              </Button>
                            </Grid>
                            <Grid item xs={2}>
                              <Button
                                fullWidth
                                variant="outlined"
                                onClick={handleRemoveInstruction(idx)}
                              >
                                <RemoveIcon />
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Container>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </form>
  );
}
