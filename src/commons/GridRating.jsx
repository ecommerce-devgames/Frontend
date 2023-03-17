import React from "react";
import useInput from "../hooks/useInput";
import { Rating } from "@mui/material";

const GridRating = () => {
  const ratingValue = useInput();
  return (
    <>
      <Rating {...ratingValue} readOnly precision={0.5} size="small" />
    </>
  );
};

export default GridRating;
