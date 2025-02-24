import React from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Work as WorkIcon,
  LocationOn as LocationOnIcon,
  BusinessCenter as BusinessCenterIcon,
  FlightTakeoff as FlightTakeoffIcon,
  AttachMoney as AttachMoneyIcon,
  CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";
import "./Job.css";

const Job: React.FC = () => {
  const job = {
    positionName: "Entry Level Software Developer: 2025",
    aboutJob:
      "At IBM, work is more than a job - it's a calling. To build. To design. To code. To consult. To think along with clients and sell. To make markets. To invent. To collaborate. Not just to do something better, but to attempt things you never thought possible. Are you ready to lead in this new era of technology and solve some of the world's most challenging problems? If so, let's talk.",
    responsibilities: [
      "Participate in many aspects of the software development lifecycle, such as design, code implementation, testing, and support.",
      "Work to create software that is of high quality and meets our clients' needs.",
      "Become a contributor within Open Source communities across multiple disciplines.",
    ],
    qualificationsRequired: [
      "Resilience, commitment, and curiosity.",
      "Ability to work in an abstract, fast-paced, and continuously changing tech world.",
    ],
    qualificationsPreferred: [
      "Experience with Open Source communities.",
      "Knowledge of modern software development practices.",
    ],
    additionalInformation:
      "Position start dates are in 2025. You will be supported by mentors and coaches who will encourage you to challenge the norm.",
    area: "Software Engineering",
    location: "Multiple Locations",
    jobType: "Entry Level",
    relocation: "Yes",
    travel: "Occasional",
    salary: "Competitive",
    datePosted: "2025-02-11",
  };

  return (
    <Box className="job-details">
      {/* Columna izquierda */}
      <Box className="left-column">
        <Typography variant="h4" component="h1" gutterBottom>
          {job.positionName}
        </Typography>
        <Divider sx={{ bgcolor: "white", mb: 2 }} />

        <Typography variant="h6" component="h2" gutterBottom>
          Introduction
        </Typography>
        <Typography variant="body1" gutterBottom>
          {job.aboutJob}
        </Typography>
        <Divider sx={{ bgcolor: "white", my: 2 }} />

        <Typography variant="h6" component="h2" gutterBottom>
          Your Role and Responsibilities
        </Typography>
        <List>
          {job.responsibilities.map((item, index) => (
            <ListItem key={index} className="list-item">
              <ListItemIcon className="list-item-icon">
                <WorkIcon style={{ color: "#1B0096" }} />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ bgcolor: "white", my: 2 }} />

        <Typography variant="h6" component="h2" gutterBottom>
          Qualifications Required
        </Typography>
        <List>
          {job.qualificationsRequired.map((item, index) => (
            <ListItem key={index} className="list-item">
              <ListItemIcon className="list-item-icon">
                <WorkIcon style={{ color: "#1B0096" }} />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ bgcolor: "white", my: 2 }} />

        <Typography variant="h6" component="h2" gutterBottom>
          Qualifications Preferred
        </Typography>
        <List>
          {job.qualificationsPreferred.map((item, index) => (
            <ListItem key={index} className="list-item">
              <ListItemIcon className="list-item-icon">
                <WorkIcon style={{ color: "#1B0096" }} />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ bgcolor: "white", my: 2 }} />

        <Typography variant="h6" component="h2" gutterBottom>
          Additional Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          {job.additionalInformation}
        </Typography>
      </Box>

      {/* Columna derecha */}
      <Box className="right-column">
        <List>
          <ListItem className="list-item">
            <ListItemIcon className="list-item-icon">
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary={`Area: ${job.area}`} />
          </ListItem>
          <ListItem className="list-item">
            <ListItemIcon className="list-item-icon">
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary={`Location: ${job.location}`} />
          </ListItem>
          <ListItem className="list-item">
            <ListItemIcon className="list-item-icon">
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary={`Job Type: ${job.jobType}`} />
          </ListItem>
          <ListItem className="list-item">
            <ListItemIcon className="list-item-icon">
              <FlightTakeoffIcon />
            </ListItemIcon>
            <ListItemText primary={`Relocation: ${job.relocation}`} />
          </ListItem>
          <ListItem className="list-item">
            <ListItemIcon className="list-item-icon">
              <FlightTakeoffIcon />
            </ListItemIcon>
            <ListItemText primary={`Travel: ${job.travel}`} />
          </ListItem>
          <ListItem className="list-item">
            <ListItemIcon className="list-item-icon">
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary={`Salary: ${job.salary}`} />
          </ListItem>
          <ListItem className="list-item">
            <ListItemIcon className="list-item-icon">
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary={`Date Posted: ${job.datePosted}`} />
          </ListItem>
        </List>
        <Button variant="contained" className="apply-button">
          Apply Now
        </Button>
      </Box>
    </Box>
  );
};

export default Job;