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
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import "./AdminNav.css";  
import Swal from "sweetalert2";

interface AdminNavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ isAuthenticated, onLogout }) => {
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

  const handleLogoutClick = () => {
    interface SwalResult {
      isConfirmed: boolean;
    }

    interface SwalOptions {
      title: string;
      text: string;
      icon: 'warning';
      showCancelButton: boolean;
      confirmButtonColor: string;
      cancelButtonColor: string;
      confirmButtonText: string;
      cancelButtonText: string;
    }

    const swalOptions: SwalOptions = {
      title: 'Cerrar Sesión',
      text: '¿Estas seguro que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancelar'
    };

    Swal.fire(swalOptions).then((result: SwalResult) => {
      if (result.isConfirmed) {
        onLogout();
      }
    });
  };

  const isHome = location.pathname === "/adminHome";

  return (
    <AppBar
      position="static"
      sx={{
        background: isHome ? "white" : "linear-gradient(135deg, #B159C7, #1B0096, #090030)",
        color: isHome ? "#1B0096" : "white",
      }}
    >
      <Toolbar className="Toolbar">
        <Typography variant="h6" component="div" >
          <Link to="/adminHome">
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
            to="/adminHome"
            sx={{ color: isHome ? "#1B0096" : "white" }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/adminApplicants"
            sx={{ color: isHome ? "#1B0096" : "white" }}
          >
            Applicants
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/adminUsers"
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
            {isAuthenticated ? (
              <IconButton
                sx={{ p: "10px", color: isHome ? "#1B0096" : "white" }}
                aria-label="logout"
                onClick={handleLogoutClick}
              >
                <LogoutIcon />
              </IconButton>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ color: isHome ? "#1B0096" : "white" }}
              >
                Login
              </Button>
            )}
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
              {isAuthenticated ? (
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    handleLogoutClick();
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#1B0096",
                    },
                  }}
                >
                  Logout
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/login"
                  sx={{
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#1B0096",
                    },
                  }}
                >
                  Login
                </MenuItem>
              )}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;