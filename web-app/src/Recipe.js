import React, { useState } from "react";

import {
    useParams,
} from "react-router-dom";

import {
    Box,
    Grid,
    Typography,
    Paper,
} from "@material-ui/core";

export default function Recipe() {
    let { recipeId } = useParams()

    const [recipe, setRecipe] = useState({
        ingredients: [
            { name: "eggs", amount: 2, unit: "" },
            { name: "flour", amount: 2, unit: "cups" },
        ],
        instructions: [
            "Add flour.",
            "Create well in flour.",
            "Crack egg in well.",
        ]
    })

    return (
        <Box>
            <Grid container>
                <Grid object>
                    <Grid container>
                    </Grid>
                </Grid>
                <Paper>
                    <Box m={2}>
                        <Grid object>
                            <Grid container direction="column">
                                <Typography variant="h6">Ingredients</Typography>
                                {recipe.ingredients.map(ingredient =>
                                    <Typography>{ingredient.name} {ingredient.amount}</Typography>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        </Box>
    )
}