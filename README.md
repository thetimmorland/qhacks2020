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
Queries db and returns an array of recipe ids

## POST /api/recipes
Create a new recipe

## GET /api/recipes/{id}
Return instructions for a given recipe id

## PUT /api/recipes/{id}
Update the value of a given recipe id

## POST /api/ratings/{id}
Create a new rating for a given id

## GET /api/ratings/{id}
Return all ratings for a given id
