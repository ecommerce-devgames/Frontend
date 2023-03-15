import React from "react";
import useInput from "../hooks/useInput";
import { Rating } from "@mui/material";

const MyProductRating = () => {
  const ratingValue = useInput();
  return (
    <>
      <Rating {...ratingValue} precision={0.5} size="small" />
    </>
  );
};

export default MyProductRating;
