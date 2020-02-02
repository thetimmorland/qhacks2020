import { Paper, Box, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function Recipe() {
  let { recipeId } = useParams();

  const [recipe, setRecipe] = useState();

  useEffect(async () => {
    const recipe = await fetch(`/api/recipes/${recipeId}`).then(response => {
      return response.json();
    });
    console.log(recipe);
    setRecipe(recipe);
  }, []);

  if (recipe) {
    return (
      <Box p={2}>
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
          </Grid>
        </Grid>
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
