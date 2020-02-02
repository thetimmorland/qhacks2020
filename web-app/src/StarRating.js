import React, { useState } from "react";
import { Rating } from "@material-ui/lab";

export default function StarRating() {
  const [rating, setRating] = useState(5);
  return <Rating name="size-large" value={rating} size="large" />;
}
