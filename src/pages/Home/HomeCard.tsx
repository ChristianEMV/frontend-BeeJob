"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, Typography, Grid, Box, Chip, Button } from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import WorkIcon from "@mui/icons-material/Work"
import BusinessIcon from "@mui/icons-material/Business"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import styles from "./styles.module.css"
import JobModal from "../Job/Job"
import type { Job } from "./Home.types"

interface HomeCardProps {
  job: Job
}

const HomeCard: React.FC<HomeCardProps> = ({ job }) => {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false)
  const navigate = useNavigate()
  const isAuthenticated = !!localStorage.getItem("token") // Verifica si el usuario está autenticado

  const handleOpenJobModal = () => {
    setIsJobModalOpen(true) // Permite abrir el modal independientemente de la autenticación
  }

  const handleCloseJobModal = () => {
    setIsJobModalOpen(false)
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate("/login") // Redirige a la página de inicio de sesión si no está autenticado
    } else {
      // Lógica para aplicar a la vacante
      console.log("Aplicando a la vacante:", job.id)
    }
  }

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(salary)
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={styles.homecard}>
        <Box className={styles.carddecorator}></Box>

        <CardContent sx={{ position: "relative", zIndex: 1, p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Chip label={job.area} size="small" className={styles.areabadge} />
          </Box>

          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            className={styles.jobtitle}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              fontWeight: 600,
              mb: 2,
            }}
          >
            <WorkIcon sx={{ color: "#1B0096", mt: 0.5 }} />
            {job.positionName}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <LocationOnIcon sx={{ color: "#1B0096", mr: 1, fontSize: "1rem" }} />
              {job.location}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <BusinessIcon sx={{ color: "#1B0096", mr: 1, fontSize: "1rem" }} />
              {job.area}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <AttachMoneyIcon sx={{ color: "#1B0096", mr: 1, fontSize: "1rem" }} />
              {formatSalary(job.salary)}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            className={styles.viewdetailsbutton}
            fullWidth
            onClick={handleOpenJobModal}
          >
            Ver detalles
          </Button>
        </CardContent>
      </Card>

      <JobModal
        open={isJobModalOpen}
        handleClose={handleCloseJobModal}
        job={job}
        onApply={handleApply}
      />
    </Grid>
  )
}

export default HomeCard

