import React from "react";
import useInput from "../hooks/useInput";
import { Rating } from "@mui/material";

const GridRating = () => {
  const ratingValue = useInput();
  return (
    <>
      <Rating {...ratingValue} precision={0.5} readOnly size="small" />
    </>
  );
};

export default GridRating;
