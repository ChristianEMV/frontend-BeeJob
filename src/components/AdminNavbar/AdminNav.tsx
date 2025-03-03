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
import "./AdminNav.css";  

const AdminNavbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isHome = location.pathname === "/home";

  return (
    <AppBar
      position="static"
      className="AppBar"
      sx={{
        background: isHome ? "white" : "linear-gradient(135deg, #B159C7, #1B0096, #090030)",
        color: isHome ? "#1B0096" : "white",
      }}
    >
      <Toolbar className="Toolbar">
        <Typography variant="h6" component="div" >
          <Link to="/home">
            <img 
            src={isHome ? "/assets/WI1_500px.png" : "/assets/BI1_500px.png"}
            alt="LogoBeeJop"
            style={{ height: "50px" }} />
          </Link>
        </Typography>
        <Box className="CenteredBox">
          <Button
            color="inherit"
            component={Link}
            to="/home"
            sx={{ color: isHome ? "#1B0096" : "white" }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/applicants"
            sx={{ color: isHome ? "#1B0096" : "white" }}
          >
            Applicants
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/users"
            sx={{ color: isHome ? "#1B0096" : "white" }}
          >
            Users
          </Button>
        </Box>
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{
                background: isHome
                  ? "linear-gradient(135deg, #1B0096, #4A00E0)"
                  : "rgba(255, 255, 255, 0.15)",
                color: "white",
                ml: 1,
                padding: "5px 10px",
              }}
            />
            <IconButton
              type="submit"
              sx={{ p: "10px", color: isHome ? "#1B0096" : "white" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ color: isHome ? "#1B0096" : "white" }}
            >
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
              sx={{ color: isHome ? "#1B0096" : "white" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{
                sx: {
                  background: isHome
                    ? "white"
                    : "linear-gradient(135deg, #B159C7, #1B0096, #090030)",
                  color: isHome ? "#1B0096" : "white",
                },
              }}
            >
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/home"
                sx={{
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#1B0096",
                  },
                }}
              >
                Home
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/applicants"
                sx={{
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#1B0096",
                  },
                }}
              >
                Applicants
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/users"
                sx={{
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#1B0096",
                  },
                }}
              >
                Users
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/"
                sx={{
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#1B0096",
                  },
                }}
              >
                Login
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;