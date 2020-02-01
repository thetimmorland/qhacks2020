import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Content from "./Content";
import HeaderPaper from "./HeaderPaper";

export default function Recipe() {
  let { recipeId } = useParams();

  const [recipe, setRecipe] = useState({
    id: 1,
    name: "Cake",
    notes: "This recipe is very good. I make it all the time with my kids!",
    ingredients: [
      { name: "Eggs", amount: 2, unit: "" },
      { name: "Flour", amount: 2, unit: "Cups" },
      { name: "Sugar", amount: 2, unit: "Cups" },
      { name: "Baking Soda", amount: 2, unit: "Teaspoons" }
    ],
    instructions: ["Add flour.", "Create well in flour.", "Crack egg in well."]
  });

  return (
    <Content>
      <Grid item>
        <HeaderPaper header={recipe.name} variant="h6">
          <Typography>{recipe.notes}</Typography>
        </HeaderPaper>
      </Grid>
      <Grid item>
        <HeaderPaper header="Ingredients" variant="h6">
          <Grid container>
            {recipe.ingredients.map(ingredient => (
              <Grid item xs={12} sm={6}>
                <Typography>
                  <li>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </li>
                </Typography>
              </Grid>
            ))}
          </Grid>
        </HeaderPaper>
      </Grid>
      <Grid item>
        <HeaderPaper header="Instructions" variant="h6">
          <ol>
            {recipe.instructions.map(instruction => (
              <Typography>
                <li>{instruction}</li>
              </Typography>
            ))}
          </ol>
        </HeaderPaper>
      </Grid>
    </Content>
  );
}
