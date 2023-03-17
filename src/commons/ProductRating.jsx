import React from "react";
import useInput from "../hooks/useInput";
import { Rating } from "@mui/material";

const ProductRating = () => {
  const ratingValue = useInput();
  return (
    <>
      <Rating {...ratingValue} precision={0.5} readOnly size="large" />
    </>
  );
};

export default ProductRating;
