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
import styles from "./styles.module.css"

interface AdminCardHomeProps {
  job: Job
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
}))

const AdminCardHome: React.FC<AdminCardHomeProps> = ({ job }) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={`styles.admincard ${!isVisible ? styles.invisiblecard : ""}`}>
        <Box className={styles.carddecorator}></Box>
        <CardContent className={styles.cardcontent}>
          <Box className={styles.cardheader}>
            <Chip label={job.area} size="small" className={styles.areabadge} />
            <Typography variant="caption" className={styles.jobid}>
              ID: {job.id}
            </Typography>
          </Box>

          <Typography variant="h6" component="h3" className={styles.jobtitle}>
            <WorkIcon className={styles.titleicon} />
            {job.positionName}
          </Typography>

          <Box className={styles.jobdetails}>
            <Typography variant="body2" className={styles.jobinfo}>
              <LocationOnIcon className={styles.infoicon} />
              {job.location}
            </Typography>
            <Typography variant="body2" className={styles.jobinfo}>
              <BusinessIcon className={styles.infoicon} />
              {job.area}
            </Typography>
          </Box>

          <Box className={styles.cardactions}>
            <Tooltip title="Edit Job" placement="top">
              <IconButton component={Link} to={`/admin/edit-job/${job.id}`} className={styles.editbutton}>
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

