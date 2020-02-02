using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using RecipesApi.Models;
using MongoDB.Driver;

namespace RecipesApi.Services
{
    public class RecipeService
    {
        private readonly IMongoCollection<Recipe> _recipes;

        public RecipeService(IRecipesDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _recipes = database.GetCollection<Recipe>(settings.RecipesCollectionName);
        }
        //Gets a list of recipes
        public List<Recipe> Get() => _recipes.Find(recipe => true).ToList();
        //Gets recipe based on id
        public Recipe Get(string id) => _recipes.Find<Recipe>(recipe => recipe.Id == id).FirstOrDefault();
        //Posts a new recipe
        public Recipe Create(Recipe recipe)
        {
            _recipes.InsertOne(recipe);
            return recipe;
        }
        //Updates a recipe
        public void Update(string id, Recipe recipeIn) => _recipes.ReplaceOne(recipe => recipe.Id == id, recipeIn);
        //Deletes a recipe by using a recipe sent in
        public void Remove(Recipe recipeIn) => _recipes.DeleteOne(recipe => recipe.Id == recipeIn.Id);
        //Deletes a recipe by using the id
        public void Remove(string id) => _recipes.DeleteOne(recipe => recipe.Id == id);
    }
}
