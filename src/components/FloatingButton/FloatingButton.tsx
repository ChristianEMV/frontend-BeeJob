import React from "react";
import { useNavigate } from "react-router-dom";
import { Fab, Tooltip, Badge } from "@mui/material";
import "./FloatingButton.css";

interface FloatingButtonProps {
  logo?: string;
  notificationMessage?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  logo = "/default-logo.png",
  notificationMessage = "Completar información",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <div className="floating-button-container">
      <Tooltip title={notificationMessage} aria-label="notification">
        <Badge color="secondary" variant="dot" overlap="circular">
          <Fab className="floating-button" onClick={handleClick}>
            <img src={logo} alt="Logo" className="floating-button-logo" />
          </Fab>
        </Badge>
      </Tooltip>
    </div>
  );
};

export default FloatingButton;