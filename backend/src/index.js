const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const dbUri = process.env.DB_URI;

var db;

const express = require("express");
const port = 4000;
const app = express();
app.use(express.json());

function varyRecipe(recipe) {
  merged = { ...defaults, ...recipe };

  merged.ingredients = merged.ingredients.map(ingredient => {
    ingredient.amount *= randCoeffient();
  });

  return merged;
}
app.post("/api/recipes", (req, res) => {
  db.collection("recipes")
    .insertOne(req.body)
    .then(recipe => {
      res.send(recipe.insertedId).status(200);
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

app.get("/api/recipes", (req, res) => {
  db.collection("recipes")
    .find()
    .limit(10)
    .toArray()
    .then(recipes => {
      let recipeIds = [];
      recipes.map(recipe => {
        recipeIds.push(recipe._id);
      });
      res.send(recipeIds).status(200);
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

app.get("/api/recipes/:recipeId", (req, res) => {
  db.collection("recipes")
    .findOne({ _id: new ObjectId(req.params.recipeId) })
    .then(recipe => {
      res.send(recipe).status(200);
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

app.put("/api/recipes/:recipeId", (req, res) => {
  db.collection("recipes")
    .findOneAndReplace({ _id: new ObjectID(recipeId) }, req.body)
    .then(recipe => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.send(err).sendStatus(500);
    });
});

app.post("/api/ratings/:recipeId", (req, res) => {
  db.collection("ratings")
    .insertOne({ recipeId: req.params.recipeId, ...req.body })
    .then(rating => {
      res.send(rating.insertedId).status(200);
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

app.get("/api/ratings/:recipeId", (req, res) => {
  db.collection("ratings")
    .find({ recipeId: new ObjectId(req.params.recipeId) })
    .limit(100)
    .toArray()
    .then(ratings => {
      res.send(ratings).status(200);
    })
    .catch(err => {
      res.send(err).statusCode(500);
    });
});

MongoClient.connect(dbUri, (err, client) => {
  if (err) return console.log(err);

  db = client.db("autochef");

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
