import React, { useState } from "react";

import {
    useParams,
} from "react-router-dom";

import {
    Container,
    Box,
    Grid,
    Typography,
    Paper,
} from "@material-ui/core";

const PaperList = props =>
    <Paper>
        <Box p={2}>
            <Typography variant="h5" color="primary" gutterBottom>
                {props.header}
            </Typography>
            <Container maxWidth="md">
                {props.children}
            </Container>
        </Box>
    </Paper>

export default function Recipe() {
    let { recipeId } = useParams()

    const [recipe, setRecipe] = useState({
        ingredients: [
            { name: "Eggs", amount: 2, unit: "" },
            { name: "Flour", amount: 2, unit: "Cups" },
        ],
        instructions: [
            "Add flour.",
            "Create well in flour.",
            "Crack egg in well.",
        ],
        notes: "This recipe is very good. I make it all the time with my kids!"
    })

    return (
        <Box p={2}>
            <Container maxWidth="md">
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <PaperList header="Ingredients">
                            <Grid container>
                                {recipe.ingredients.map(ingredient =>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>
                                            <li>{ingredient.name}: {ingredient.amount} {ingredient.unit}</li>
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </PaperList>
                    </Grid>
                    <Grid item>
                        <PaperList header="Instructions">
                            <ol>
                                {recipe.instructions.map(instruction =>
                                    <Typography>
                                        <li>{instruction}</li>
                                    </Typography>
                                )}
                            </ol>
                        </PaperList>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}