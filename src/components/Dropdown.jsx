import * as React from "react";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

const Dropdown = () => {
  //Hooks
  const navigate = useNavigate();

  //Variables
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  //Handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchByCategoryHandler =(category)=>{
    setAnchorEl(null);
    navigate(`/category/${category}`)    
  }

  return (
    <div className="navbarDropdown">
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{fontSize:"1.3rem", mt: 3.5, ml: 3, mr: 2}}
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
        <MenuItem onClick={()=>searchByCategoryHandler("action")}>Action</MenuItem>
        <MenuItem onClick={()=>searchByCategoryHandler("indie")}>Indie</MenuItem>
        <MenuItem onClick={()=>searchByCategoryHandler("adventure")}>Adventure</MenuItem>
        <MenuItem onClick={()=>searchByCategoryHandler("RPG")}>RPG</MenuItem>
        <MenuItem onClick={()=>searchByCategoryHandler("strategy")}>Strategy</MenuItem>
        <MenuItem onClick={()=>searchByCategoryHandler("shooter")}>Shooter</MenuItem>
        <MenuItem onClick={()=>searchByCategoryHandler("casual")}>Casual</MenuItem>
        
      </Menu>
    </div>
  );
};

export default Dropdown;
