import {
  Box,
  Container,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import { Rating } from '@material-ui/lab';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "./TopBar";
import Loading from "./Loading"

export default function Recipe() {
  let { recipeId } = useParams();
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    axios
      .get(`/api/recipes/${recipeId}`)
      .then(res => {
        setRecipe(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (recipe) {
    return (
      <>
        <TopBar>
          <Rating name="size-large" defaultValue={2} size="large" />
        </TopBar>
        <Box p={2}>
          <Container maxWidth="md">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Paper>
                  <Box p={2}>
                    <Typography variant="h4" color="primary" gutterBottom>
                      {recipe.name}
                    </Typography>
                    <Container maxWidth="md">
                      <Typography variant="h6">{recipe.notes}</Typography>
                    </Container>
                  </Box>
                </Paper>
              </Grid>
              <Grid item>
                <Paper>
                  <Box p={2}>
                    <Typography variant="h5" color="primary" gutterBottom>
                      Ingredients
                    </Typography>
                    <Container maxWidth="md">
                      <ul>
                        <Grid container>
                          {recipe.ingredients.map((ingredient, idx) => (
                            <Grid key={idx} item xs={12} sm={6}>
                              <Typography variant="h6">
                                <li>
                                  {ingredient.amount} {ingredient.unit}{" "}
                                  {ingredient.name}
                                </li>
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </ul>
                    </Container>
                  </Box>
                </Paper>
              </Grid>
              <Grid item>
                <Paper>
                  <Box p={2}>
                    <Typography variant="h5" color="primary">
                      Instructions
                    </Typography>
                    <Container maxWidth="md">
                      <Grid container spacing={2} direction="column">
                        <ol>
                          {recipe.instructions.map((instruction, idx) => (
                            <Grid item key={idx}>
                              <Typography variant="h6">
                                <li>{instruction}</li>
                              </Typography>
                            </Grid>
                          ))}
                        </ol>
                      </Grid>
                    </Container>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  } else {
    return <Loading />;
  }
}
