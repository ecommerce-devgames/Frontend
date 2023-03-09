import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const UserAvatar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector((state) => state.user);
  const open = Boolean(anchorEl);
  const isAdminMenu = [
    "Edit products",
    "Edit categories",
    "Edit admins",
    "Orders",
  ];
  const userMenu = ["Shopping history", "Settings"];
  const navigate = useNavigate();
  console.log("userrrrrrrr", user);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavigateLogin = () => {
    setAnchorEl(null);
    navigate("/login");
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          mt: 2.2,
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* ESTOS LOS PUEDE VER EL ADMIN */}
        {(user !== {} && user.isAdmin === "true")
          ? isAdminMenu.map((menu) => (
              <MenuItem onClick={handleClose}>{menu}</MenuItem>
            ))
          : null}

        {/*ESTOS LOS PUEDE VER EL USER NORMAL */}
        {user.isAdmin === "false"
          ? userMenu.map((menu) => {
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                {menu}
              </MenuItem>;
            })
          : null}

        {/* ESTE LO PUEDEN VER TODOS  */}
        <MenuItem onClick={handleNavigateLogin}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {user.id ? "Login" : "Logout"}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default UserAvatar;
