using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace RecipesApi.Models
{
    public class Recipe
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Name")]
        public string RecipeName { get; set; }

        public string Notes { get; set; }

        //public Ingredients Ingredients { get; set; }
        public IList<Ingredients> Ingredients { get; set; }
        public int Rating { get; set; }
    }
    public class Ingredients
    {
        public string Name { get; set; }
        public int Amount { get; set; }
        public string Units { get; set; }
    }
}
