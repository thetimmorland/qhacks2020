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

        public RecipeService(IRecipeDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            //Continue Here
            _recipes = database.GetCollection<Recipe>(settings.RecipeCollectionName);
        }

        public List<Recipe> Get() =>
            _recipes.Find(book => true).ToList();

        public Recipe Get(string id) =>
            _recipes.Find<Recipe>(book => book.Id == id).FirstOrDefault();

        public Recipe Create(Recipe book)
        {
            _recipes.InsertOne(book);
            return book;
        }

        public void Update(string id, Recipe bookIn) =>
            _recipes.ReplaceOne(book => book.Id == id, bookIn);

        public void Remove(Recipe bookIn) =>
            _recipes.DeleteOne(book => book.Id == bookIn.Id);

        public void Remove(string id) =>
            _recipes.DeleteOne(book => book.Id == id);
    }
}
