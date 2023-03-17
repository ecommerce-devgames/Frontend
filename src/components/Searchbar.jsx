import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { setSearchQuery } from "../state/searchQuery";
import TextField from "@mui/material/TextField";

const Searchbar = () => {
  //Hooks
  const searchQuery = useInput();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Functions
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.value;    
    dispatch(setSearchQuery(query));   
    navigate("/search");
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <TextField
        className="searchBar"
        id="standard-basic"
        label="SEARCH"
        variant="standard"
        type="search"
        placeholder= "SEARCH"
        {...searchQuery}
        style={{ marginRight: "2rem" }}
        sx={{
          mr: 2.5,
          "& .MuiInputBase-root": {
            color: "rgb(53, 136, 230)", 
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "rgb(53, 136, 230)", 
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "rgb(53, 136, 230)", 
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "rgb(53, 136, 230)", 
          },
          "& .MuiInputLabel-root": {
            color: "rgb(53, 136, 230)",
            fontSize: "1.2rem",
          },
        }}
      />
    </form>
  );
};

export default Searchbar;
