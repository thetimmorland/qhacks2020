import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";

export default function Catalog() {
  const [randomRecipeId, setRandomRecipeId] = useState("");

  useState(() => {
    axios
      .get("/api/recipes")
      .then(res => {
        setRandomRecipeId(
          res.data[Math.floor(Math.random() * res.data.length)]
        );
      })
      .catch(err => {
        console.log(err);
      });
  });

  return randomRecipeId ? (
    <Redirect to={`/recipes/${randomRecipeId}`} />
  ) : (
    <Loading />
  );
}
