import {
  Box,
  Collapse,
  Container,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import { Alert, AlertTitle, Rating } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditorButton from "./EditorButton";
import Loading from "./Loading";
import TopBar from "./TopBar";

export default function Recipe() {
  let { recipeId } = useParams();
  const [recipe, setRecipe] = useState();
  const [didRate, setDidRate] = useState(false);

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

  const handleRating = event => {
    axios
      .post(`/api/ratings/${recipeId}`, { recipe, rating: event.target.value })
      .then(() => {
        setDidRate(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (recipe != null) {
    return (
      <>
        <TopBar>
          <Rating
            size="large"
            defaultValue="5"
            onChange={handleRating}
            disabled={didRate}
          />
        </TopBar>
        <Box p={2}>
          <Container maxWidth="md">
            <Grid container direction="column" spacing={2}>
              <Collapse in={didRate}>
                <Grid item>
                  <Box p={2}>
                    <Alert severity="success">
                      <AlertTitle>Success</AlertTitle>
                      Thanks for Rating!
                    </Alert>
                  </Box>
                </Grid>
              </Collapse>
              <Grid item>
                <Paper>
                  <Box p={2}>
                    <Typography variant="h5" color="primary" gutterBottom>
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
                        <Grid container direction="column">
                          {recipe.ingredients.map((ingredient, idx) => (
                            <Grid key={idx} item>
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
                    <Typography variant="h5" color="primary" gutterBottom>
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
        <EditorButton />
      </>
    );
  } else {
    return <Loading />;
  }
}
