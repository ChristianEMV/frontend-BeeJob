import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  InputBase,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detecta si es móvil
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Para el menú desplegable

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="AppBar">
      <Toolbar className="Toolbar">
        <Typography variant="h6" component="div">
          <Link to="/home">
            <img src="/path/to/logo.png" alt="LogoBeeJop" style={{ height: "40px" }} />
          </Link>
        </Typography>
        <Box className="CenteredBox">
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/jobs">
            Jobs
          </Button>
        </Box>
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{ color: "inherit", ml: 1 }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Button color="inherit" component={Link} to="/">
              Login
            </Button>
          </Box>
        )}
        {isMobile && (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component={Link} to="/home">
                Home
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/jobs">
                Jobs
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/">
                Login
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;