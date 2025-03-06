"use client"

import type React from "react"
import { useState } from "react"
import type { Job } from "../../Home/Home.types"
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
  Box,
  Chip,
} from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import WorkIcon from "@mui/icons-material/Work"
import BusinessIcon from "@mui/icons-material/Business"
import EditIcon from "@mui/icons-material/Edit"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { Link } from "react-router-dom"
import { styled } from "@mui/material/styles"
import "./AdminCardHome.css"

interface AdminCardHomeProps {
  job: Job
}

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#1b0096",
    "&:hover": {
      backgroundColor: "rgba(27, 0, 150, 0.08)",
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#1b0096",
  },
}))

const AdminCardHome: React.FC<AdminCardHomeProps> = ({ job }) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={`admin-card ${!isVisible ? "invisible-card" : ""}`}>
        <Box className="card-decorator"></Box>
        <CardContent className="card-content">
          <Box className="card-header">
            <Chip label={job.area} size="small" className="area-badge" />
            <Typography variant="caption" className="job-id">
              ID: {job.id}
            </Typography>
          </Box>

          <Typography variant="h6" component="h3" className="job-title">
            <WorkIcon className="title-icon" />
            {job.positionName}
          </Typography>

          <Box className="job-details">
            <Typography variant="body2" className="job-info">
              <LocationOnIcon className="info-icon" />
              {job.location}
            </Typography>
            <Typography variant="body2" className="job-info">
              <BusinessIcon className="info-icon" />
              {job.area}
            </Typography>
          </Box>

          <Box className="card-actions">
            <Tooltip title="Edit Job" placement="top">
              <IconButton component={Link} to={`/admin/edit-job/${job.id}`} className="edit-button">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <FormControlLabel
              control={
                <CustomSwitch
                  checked={isVisible}
                  onChange={handleToggleVisibility}
                  icon={<VisibilityOffIcon />}
                  checkedIcon={<VisibilityIcon />}
                />
              }
              label=""
              className="visibility-switch"
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default AdminCardHome

