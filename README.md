# Recipe objects
Each recipe is represented as an object containing an ingredients and instructions field.

```
recipe_t: {
    'ingredients': [{ 'ingredient': string_t, 'amount': int_t }],
    'instructions': [ string_t ]
}
```

# Variation objects
Each user rating is represented as a pair of a recipe and numeric rating from 1-5

```
rating: { recipe: recipe_t, rating: int_t }
```
# Endpoints

## GET /api/recipes
Queries db and returns an array of recipes, called by web-app

## POST /api/recipes
Request body contains recipe object to be stored in db, called by web-app

## PUT /api/recipes/{recipe}
Updates a recipe in db, called by learning-model

## POST /api/ratings/{recipe}
Request body contains rating object to be stored in db, called by web-app

## GET /api/ratings/{recipe}
Queries db and returns a list of ratings for a given recipe, called by learning-model
