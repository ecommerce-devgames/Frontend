import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

const Dropdown = () => {
  //Hooks
  const navigate = useNavigate();  

  //Variables and states
  const genres = useSelector((state)=> state.gameProperties.genres[0])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  console.log(genres)
  //Handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchByCategoryHandler = (category) => {
    setAnchorEl(null);
    navigate(`/category/${category}`);
  };

  return (
    <div className="navbarDropdown">
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ fontSize: "1.3rem", mt: 3.5, ml: 3, mr: 2 }}
      >
        Categories
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {genres?.map((genre) => (
          <MenuItem
            key={genre.id}
            onClick={() => searchByCategoryHandler(genre.name)}
          >
            {genre.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Dropdown;
