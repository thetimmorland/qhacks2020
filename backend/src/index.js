const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const uri = process.env.DB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

// const client = new MongoClient(url, { useNewUrlParser: true });
// const dbName = "recipes";

const express = require("express");

const port = 3000;
const app = express();
app.use(express.json());

app.post("/api/recipes", (req, res) => {
  client.connect((err, client) => {
    let db = client.db("autochef");
    db.collection("recipes").insertOne(req.body);
    client.close();
  });

  res.sendStatus(200);
});

app.get("/api/recipes", (req, res) => {
  client.connect((err, client) => {
    db = client.db("autochef");
    db.collection("recipes")
      .find()
      .limit(100)
      .toArray((err, docs) => {
        let id = [];
        docs.map(doc => {
          id.push(doc._id);
        });

        res.send(id).status(200);
      });
  });
});

app.get("/api/recipes/:recipeId", (req, res) => {
  client.connect((err, client) => {
    db = client.db("autochef");
    db.collection("recipes").findOne(
      { _id: ObjectId(req.params.recipeId) },
      (err, recipe) => {
        res.send(recipe).status(200);
      }
    );
  });
});

app.put("/api/recipes/:recipeId", (req, res) => {
  client.connect((err, client) => {
    const db = client.db("autochef");
    db.collection("recipes").findOneAndReplace(
      { _id: ObjectId(req.params.recipeId) },
      req.body
    );
  });
  res.sendStatus(200);
});

app.post("/api/ratings/:recipeId", (req, res) => {
  let rating = { recipeId: req.params.recipeId, ...req.body };
  console.log(rating)

  client.connect((err, client) => {
    const db = client.db("autochef");
    db.collection("ratings").insertOne(rating);
  });

  res.sendStatus(200);
});

app.get("/api/ratings/:recipeId", (req, res) => {
  client.connect((err, client) => {
    const db = client.db("autochef");
    db.collection("ratings")
      .find({ recipeId: req.params.recipeId })
      .limit(100)
      .toArray((err, ratings) => {
        res.send(ratings).status(200);
      });
  });
});

app.listen(port);
