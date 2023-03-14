import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from '@mui/icons-material/Edit';

const AdminCardBtns = ({
  item,
  open,
  anchorEl,
  setAnchorEl,
  handleClick,  
  handleAdminNavigate,
  handleAdminDeleteProduct,
}) => {
  const ITEM_HEIGHT = 50;
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        color="primary" 
        fontSize="large"
        onClick={handleClick}
      >
        <EditIcon />
      </IconButton >
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        // onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",            
          },
        }}
      >
        <MenuItem onClick={()=>handleAdminNavigate(item)}>Edit product</MenuItem>
        <MenuItem onClick={()=>handleAdminDeleteProduct(item)}>Delete product</MenuItem>
      </Menu>
    </div>
  );
};

export default AdminCardBtns;
