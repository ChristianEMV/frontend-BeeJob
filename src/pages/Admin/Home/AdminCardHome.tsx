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
  Avatar,
} from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import BusinessIcon from "@mui/icons-material/Business"
import EditIcon from "@mui/icons-material/Edit"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { styled } from "@mui/material/styles"
import styles from "./styles.module.css"
import { updateVacantStatus } from "../../../services/authService" 
import EditJob from "../../../components/EditJob/EditJob"
import JobModal from "../../../components/JobModal/Jobmodal"
import Swal from "sweetalert2"

interface AdminCardHomeProps {
  job: Job
  refreshVacants: () => void 
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

const AdminCardHome: React.FC<AdminCardHomeProps> = ({ job, refreshVacants }) => {
  const [isVisible, setIsVisible] = useState(job.status)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isJobModalOpen, setIsJobModalOpen] = useState(false)

  const handleToggleVisibility = async () => {
    const newStatus = !isVisible

    // Mostrar alerta de confirmación
    const result = await Swal.fire({
      title: newStatus ? "Enable Job Posting?" : "Disable Job Posting?",
      text: `Are you sure you want to ${newStatus ? "enable" : "disable"} this job posting?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, continue!",
      cancelButtonText: "Cancel",
    })

    if (result.isConfirmed) {
      setIsVisible(newStatus) // Cambiar el estado localmente
      try {
        await updateVacantStatus({ id: job.id, status: newStatus })
        refreshVacants() // Refrescar la lista de vacantes después de actualizar el estado
        Swal.fire(
          newStatus ? "Enabled!" : "Disabled!",
          `The job posting has been ${newStatus ? "enabled" : "disabled"} successfully.`,
          "success",
        )
      } catch (error) {
        console.error("Error updating vacant status:", error)
        setIsVisible(!newStatus) // Revertir el estado si la actualización falla
        Swal.fire("Error!", "There was an error updating the job posting status. Please try again.", "error")
      }
    }
  }

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
  }

  const handleOpenJobModal = () => {
    setIsJobModalOpen(true)
  }

  const handleCloseJobModal = () => {
    setIsJobModalOpen(false)
  }

  // Generate initials for the avatar
  const getInitials = (positionName: string) => {
    return positionName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Generate a background color based on the job ID
  const getAvatarColor = (id: number) => {
    const colors = [
      "linear-gradient(135deg, #b159c7, #1b0096)",
      "linear-gradient(135deg, #1b0096, #090030)",
      "linear-gradient(135deg, #7a36d9, #1b0096)",
      "linear-gradient(135deg, #b159c7, #7a36d9)",
    ]
    return colors[id % colors.length]
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        className={`${styles.admincard} ${!isVisible ? styles.invisiblecard : ""}`}
        onClick={handleOpenJobModal}
        sx={{ cursor: "pointer" }}
      >
        <div className={styles.cardtopbar}></div>
        <CardContent className={styles.cardcontent}>
          <Box className={styles.cardheader}>
            <Box className={styles.avatarContainer}>
              <Avatar className={styles.jobAvatar} style={{ background: getAvatarColor(job.id) }}>
                {getInitials(job.positionName)}
              </Avatar>
              <Box>
                <Typography variant="caption" className={styles.jobid}>
                  ID: {job.id}
                </Typography>
                <Chip label={job.area} size="small" className={styles.areabadge} />
              </Box>
            </Box>
            <Box className={styles.statusIndicator}>
              <span className={`${styles.statusDot} ${isVisible ? styles.statusActive : styles.statusInactive}`}></span>
              <Typography variant="caption">{isVisible ? "Activo" : "Inactivo"}</Typography>
            </Box>
          </Box>

          <Typography variant="h6" component="h3" className={styles.jobtitle}>
            {job.positionName}
          </Typography>

          <Box className={styles.jobdetails}>
            <Box className={styles.jobinfo}>
              <LocationOnIcon className={styles.infoicon} />
              <Typography variant="body2">{job.location}</Typography>
            </Box>
            <Box className={styles.jobinfo}>
              <BusinessIcon className={styles.infoicon} />
              <Typography variant="body2">{job.area}</Typography>
            </Box>
            <Box className={styles.jobinfo}>
              <AccessTimeIcon className={styles.infoicon} />
              <Typography variant="body2">Publicado recientemente</Typography>
            </Box>
          </Box>

          <Box className={styles.cardactions} onClick={(e) => e.stopPropagation()}>
            <Tooltip title="Editar trabajo" placement="top">
              <IconButton className={styles.editbutton} aria-label="Editar trabajo" onClick={handleOpenEditModal}>
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
              className={styles.visibilityswitch}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <EditJob
        open={isEditModalOpen}
        handleClose={handleCloseEditModal}
        updateVacants={refreshVacants}
        vacantId={job.id}
      />

      {/* Job Details Modal */}
      <JobModal open={isJobModalOpen} handleClose={handleCloseJobModal} job={job} />
    </Grid>
  )
}

export default AdminCardHome

