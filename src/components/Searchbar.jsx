import React from "react";
import TextField from "@mui/material/TextField";

const Searchbar = () => {
  return (
    <form>
      <TextField
        id="standard-basic"
        label="SEARCH"
        variant="standard"
        sx={{        
          
          mr:2.5,
          "& .MuiInputBase-root": {
            color: "rgb(53, 136, 230)", // set text color to white
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "rgb(53, 136, 230)", // set underline color to white
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "rgb(53, 136, 230)", // set underline color to white on hover
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "rgb(53, 136, 230)", // set underline color to white on focus
          },
          "& .MuiInputLabel-root": {
            color: "rgb(53, 136, 230)", // set label color to white
            fontSize:"1.3rem"
          },
        }}
      />
    </form>
  );
};

export default Searchbar;




