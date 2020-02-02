const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const express = require("express");

const port = 4000;
const app = express();
app.use(express.json());

app.post("/api/recipes", (req, res) => {
  client
    .connect()
    .then(client => {
      client
        .db("autochef")
        .collection("recipes")
        .insertOne(req.body)
        .then(recipe => {
          res.send(recipe.insertedId.toHexString()).status(200);
          client.close();
        })
        .catch(err => {
          res.send(err).status(500);
        });
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

app.get("/api/recipes", (req, res) => {
  client
    .connect()
    .then(client => {
      client
        .db("autochef")
        .collection("recipes")
        .find()
        .limit(100)
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
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

app.get("/api/recipes/:recipeId", (req, res) => {
  client
    .connect()
    .then(client => {
      client
        .db("autochef")
        .collection("recipes")
        .findOne({ _id: ObjectId(req.params.recipeId) })
        .then(recipe => {
          res.send(recipe).status(200);
          client.close();
        })
        .catch(err => {
          res.send(err).status(500);
        });
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

app.put("/api/recipes/:recipeId", (req, res) => {
  client
    .connect()
    .then(client => {
      client
        .db("autochef")
        .collection("recipes")
        .findOneAndReplace({ _id: ObjectId(req.params.recipeId) }, req.body)
        .then(recipe => {
          res.sendStatus(200);
        })
        .catch(err => {
          res.send(err).sendStatus(500);
        });
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

app.post("/api/ratings/:recipeId", (req, res) => {
  let rating = { recipeId: req.params.recipeId, ...req.body };
  console.log(rating);

  client
    .connect()
    .then(client => {
      client
        .db("autochef")
        .collection("ratings")
        .insertOne(rating)
        .then(rating => {
          res.send(rating.insertedId.toHexString).status(200);
        })
        .catch(err => {
          res.send(err).status(500);
        });
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

app.get("/api/ratings/:recipeId", (req, res) => {
  client
    .connect()
    .then(client => {
      client
        .db("autochef")
        .collection("ratings")
        .find({ recipeId: req.params.recipeId })
        .limit(100)
        .toArray()
        .then(ratings => {
          res.send(ratings).status(200);
        })
        .catch(err => {
          res.send(err).statusCode(500);
        });
    })
    .catch(err => {
      res.send(err).status(500);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
