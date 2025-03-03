import React, { useState } from "react";
import { Job } from "../../Home/Home.types";
import { Card, CardContent, Typography, Grid, IconButton, Tooltip, Switch, FormControlLabel } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import "./AdminCardHome.css";

interface AdminCardHomeProps {
  job: Job;
}

const CustomSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#1b0096",
    "&:hover": {
      backgroundColor: "rgba(27, 0, 150, 0.08)",
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#1b0096",
  },
}));

const AdminCardHome: React.FC<AdminCardHomeProps> = ({ job }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleToggleDisable = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        className={`home-card ${isDisabled ? "disabled-card" : ""}`}
        sx={{
          height: "75%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid transparent",
        }}
      >
        <CardContent sx={{ flexGrow: 1, position: "relative" }}>
          <Tooltip title="Edit Job" placement="top">
            <IconButton
              component={Link}
              to={`/admin/edit-job/${job.id}`}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "white",
                border: "1px solid #1b0096",
                color: "#1b0096",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" component="h3" gutterBottom>
            <WorkIcon sx={{ verticalAlign: "middle", marginRight: 1}} /> {job.positionName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <LocationOnIcon sx={{ verticalAlign: "middle", marginRight: 1}} />
            <strong>Location:</strong> {job.location}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <BusinessIcon sx={{ verticalAlign: "middle", marginRight: 1}} />
            <strong>Area:</strong> {job.area}
          </Typography>
          <FormControlLabel
            control={
              <CustomSwitch
                checked={!isDisabled}
                onChange={handleToggleDisable}
                color="primary"
              />
            }
            label={isDisabled ? "" : ""}
            labelPlacement="start"
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
            }}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AdminCardHome;