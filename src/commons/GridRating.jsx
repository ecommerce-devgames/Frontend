import React from "react";
import { Rating } from "@mui/material";
import useInput from "../hooks/useInput";

const GridRating = () => {
  const ratingValue = useInput();
  return (
    <>
      <Rating {...ratingValue} precision={0.5} readOnly size="small" />
    </>
  );
};

export default GridRating;
