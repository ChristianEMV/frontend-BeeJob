import type React from "react"
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Container,
  Grid,
} from "@mui/material"
import {
  Work as WorkIcon,
  LocationOn as LocationOnIcon,
  BusinessCenter as BusinessCenterIcon,
  FlightTakeoff as FlightTakeoffIcon,
  AttachMoney as AttachMoneyIcon,
  CalendarToday as CalendarTodayIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from "@mui/icons-material"
import "./Job.css"

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
  }

  return (
    <Box className="job-page">
      <Container maxWidth="xl" className="job-container">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper elevation={3} className="job-details main-content">
              <Typography variant="h3" component="h1" className="job-title">
                {job.positionName}
              </Typography>
              <Box className="job-meta-mobile">
                <Typography variant="subtitle1" className="job-meta-item">
                  <LocationOnIcon /> {job.location}
                </Typography>
                <Typography variant="subtitle1" className="job-meta-item">
                  <BusinessCenterIcon /> {job.area}
                </Typography>
                <Typography variant="subtitle1" className="job-meta-item">
                  <CalendarTodayIcon /> Posted: {job.datePosted}
                </Typography>
              </Box>
              <Divider className="divider" />

              <Typography variant="h5" component="h2" className="section-title">
                About This Role
              </Typography>
              <Typography variant="body1" className="job-description">
                {job.aboutJob}
              </Typography>
              <Divider className="divider" />

              <Typography variant="h5" component="h2" className="section-title">
                Your Responsibilities
              </Typography>
              <List>
                {job.responsibilities.map((item, index) => (
                  <ListItem key={index} className="list-item">
                    <ListItemIcon className="list-item-icon">
                      <CheckCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <Divider className="divider" />

              <Typography variant="h5" component="h2" className="section-title">
                Required Qualifications
              </Typography>
              <List>
                {job.qualificationsRequired.map((item, index) => (
                  <ListItem key={index} className="list-item">
                    <ListItemIcon className="list-item-icon">
                      <CheckCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <Divider className="divider" />

              <Typography variant="h5" component="h2" className="section-title">
                Preferred Qualifications
              </Typography>
              <List>
                {job.qualificationsPreferred.map((item, index) => (
                  <ListItem key={index} className="list-item">
                    <ListItemIcon className="list-item-icon">
                      <CheckCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <Divider className="divider" />

              <Typography variant="h5" component="h2" className="section-title">
                Additional Information
              </Typography>
              <Typography variant="body1" className="job-description">
                {job.additionalInformation}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Box className="right-column">
              <Paper elevation={3} className="job-meta">
                <List>
                  <ListItem className="meta-item">
                    <ListItemIcon className="meta-icon">
                      <BusinessCenterIcon />
                    </ListItemIcon>
                    <ListItemText primary="Area" secondary={job.area} />
                  </ListItem>
                  <ListItem className="meta-item">
                    <ListItemIcon className="meta-icon">
                      <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary="Location" secondary={job.location} />
                  </ListItem>
                  <ListItem className="meta-item">
                    <ListItemIcon className="meta-icon">
                      <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Job Type" secondary={job.jobType} />
                  </ListItem>
                  <ListItem className="meta-item">
                    <ListItemIcon className="meta-icon">
                      <FlightTakeoffIcon />
                    </ListItemIcon>
                    <ListItemText primary="Relocation" secondary={job.relocation} />
                  </ListItem>
                  <ListItem className="meta-item">
                    <ListItemIcon className="meta-icon">
                      <FlightTakeoffIcon />
                    </ListItemIcon>
                    <ListItemText primary="Travel" secondary={job.travel} />
                  </ListItem>
                  <ListItem className="meta-item">
                    <ListItemIcon className="meta-icon">
                      <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Salary" secondary={job.salary} />
                  </ListItem>
                  <ListItem className="meta-item">
                    <ListItemIcon className="meta-icon">
                      <CalendarTodayIcon />
                    </ListItemIcon>
                    <ListItemText primary="Date Posted" secondary={job.datePosted} />
                  </ListItem>
                </List>
              </Paper>
              <Button variant="contained" className="apply-button">
                Apply Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Job

