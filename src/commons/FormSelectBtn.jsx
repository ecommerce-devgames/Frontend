import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";


const FormSelectBtn = ({ title, handler, array, state }) => {
  return (
    <FormControl
      className="createProductSelect"
      sx={{ m: 1, minWidth: 120, color: "primary" }}
      
    >
      <InputLabel
        sx={{ color: "#fff", fontSize: "1.3rem" }}
        id="demo-multiple-checkbox-label"
      >
        {title}
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={state}
        onChange={handler}
        input={<OutlinedInput label="Genres" />}
        renderValue={(selected) => selected.join(", ")}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.07)",
          color: "#fff",
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
        //color="primary"
      >
        {array.map((item) => (
          <MenuItem
            className="createProductSelectItem"
            key={item.id}
            value={item.name}
            color="primary"
          >
            <Checkbox checked={state.indexOf(item.name) > -1} />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormSelectBtn;
