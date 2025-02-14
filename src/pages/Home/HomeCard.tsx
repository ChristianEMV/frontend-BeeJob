import React from "react";
import { Job } from "./Home.types";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import "./HomeCard.css";

interface HomeCardProps {
  job: Job;
}

const HomeCard: React.FC<HomeCardProps> = ({ job }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ padding: 2 }}>
      <Card
        className="home-card"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid transparent",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            <WorkIcon sx={{ verticalAlign: "middle", marginRight: 1 }} /> {job.positionName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <LocationOnIcon sx={{ verticalAlign: "middle", marginRight: 1 }} />
            <strong>Location:</strong> {job.location}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <BusinessIcon sx={{ verticalAlign: "middle", marginRight: 1 }} />
            <strong>Area:</strong> {job.area}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default HomeCard;