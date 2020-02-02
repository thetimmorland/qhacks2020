import axios from "axios";
import { Paper, Box, Grid, Typography, Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function Recipe() {
  let { recipeId } = useParams();

  const [recipe, setRecipe] = useState();

<<<<<<< HEAD
  useEffect(() => {
      axios.get(`/api/recipes/${recipeId}`)
      .then(res => {
        setRecipe(res.data)
      }).catch(err => {
        console.log(err)
      })
=======
  useEffect(async () => {
    const recipe = await fetch(`/api/recipes/${recipeId}`, {
      headers: {
        "Connection": "keep-alive"
      }
    }).then(response => {
      return response.json();
    });
    console.log(recipe);
    setRecipe(recipe);
>>>>>>> e50be526ca2d6e494ce307f45462921987def7a6
  }, []);

  if (recipe) {
    return (
      <Box p={2}>
<<<<<<< HEAD
        <Container maxWidth="md">
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Paper>
                <Box p={2}>
                  <Typography>{recipe.name}</Typography>
                  <Typography>{recipe.notes}</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item>
              <Paper>
                <Box p={2}>
                  <ul>
                    <Grid container>
                      {recipe.ingredients.map((ingredient, idx) => (
                        <Grid key={idx} item xs={12} sm={6}>
                          <Typography>
                            <li>
                              {ingredient.amount} {ingredient.unit}{" "}
                              {ingredient.name}
                            </li>
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </ul>
                </Box>
              </Paper>
            </Grid>
            <Grid item>
              <Paper>
                <Box p={2}>
                  <Typography>Ingredients</Typography>
                  <ol>
                    {recipe.instructions.map((instruction, idx) => (
                      <Typography key={idx}>
                        <li>{instruction}</li>
                      </Typography>
                    ))}
                  </ol>
                </Box>
              </Paper>
            </Grid>
=======
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Paper>
              <Box p={2}>
                <Typography>{recipe.name}</Typography>
                <Typography>{recipe.notes}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <Box p={2}>
                <ul>
                  <Grid container>
                    {recipe.ingredients.map((ingredient, idx) => (
                      <Grid key={idx} item xs={12} sm={6}>
                        <Typography>
                          <li>
                            {ingredient.amount} {ingredient.unit} {ingredient.name}
                          </li>
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </ul>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <Box p={2}>
                <Typography>Ingredients</Typography>
                <ol>
                  {recipe.instructions.map((instruction, idx) => (
                    <Typography key={idx}>
                      <li>{instruction}</li>
                    </Typography>
                  ))}
                </ol>
              </Box>
            </Paper>
>>>>>>> e50be526ca2d6e494ce307f45462921987def7a6
          </Grid>
        </Container>
      </Box>
    );
  } else {
    return (
      <Box m={4}>
        <CircularProgress />
      </Box>
    );
  }
}
