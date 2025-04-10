"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Paper,
  Chip,
  Button,
  Pagination,
  PaginationItem,
  type SelectChangeEvent,
  CircularProgress,
} from "@mui/material"
import type { Job } from "../../Home/Home.types"
import AdminCardHome from "./AdminCardHome"
import WorkIcon from "@mui/icons-material/Work"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import CategoryIcon from "@mui/icons-material/Category"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddIcon from "@mui/icons-material/Add"
import styles from "./styles.module.css"
import NewJob from "../../../components/NewJob/NewJob"
import { getAllVacants } from "../../../services/authService"

const AdminHome: React.FC = () => {
  const [location, setLocation] = useState<string>("")
  const [position, setPosition] = useState<string>("")
  const [area, setArea] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("all") // Nuevo estado para el filtro de estado
  const [openNewJobModal, setOpenNewJobModal] = useState(false)
  const [vacants, setVacants] = useState<Job[]>([])
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const updateVacants = useCallback(async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("No authentication token found")
        return
      }

      const requestSize = size === -1 ? 1000 : size

      const response = await getAllVacants({
        page,
        size: requestSize,
        search: "",
        sortBy: "",
      })

      if (response && response.content) {
        setVacants(response.content)
        setTotalPages(size === -1 ? 1 : response.totalPages || 1)
      } else {
        setVacants([])
        setTotalPages(0)
        console.warn("Unexpected response format:", response)
      }
    } catch (error) {
      console.error("Error fetching vacants:", error)
      setVacants([])
      setTotalPages(0)
    } finally {
      setIsLoading(false)
    }
  }, [page, size])

  useEffect(() => {
    updateVacants()
  }, [updateVacants])

  const handleOpenNewJobModal = () => {
    setOpenNewJobModal(true)
  }

  const handleCloseNewJobModal = () => {
    setOpenNewJobModal(false)
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  const handleSizeChange = (event: SelectChangeEvent<number>) => {
    const newSize = event.target.value as number
    setSize(newSize)
    setPage(0)
  }

  const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value)
  }

  // Aplicar filtros a las vacantes
  const filteredJobs = vacants.filter((job) => {
    const matchesLocation = location === "" || job.location.toLowerCase().includes(location.toLowerCase())
    const matchesPosition = position === "" || job.positionName.toLowerCase().includes(position.toLowerCase())
    const matchesArea = area === "" || job.area.toLowerCase().includes(area.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && job.status) ||
      (statusFilter === "inactive" && !job.status)

    return matchesLocation && matchesPosition && matchesArea && matchesStatus
  })

  const uniqueLocations = Array.from(new Set(vacants.map((job) => job.location)))
  const uniqueAreas = Array.from(new Set(vacants.map((job) => job.area)))

  return (
    <Box className={styles.adminhomecontainer}>
      <Box className={styles.adminhomeheader}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          color="white"
          className={styles.headertitle}
        >
          Bienvenido, Administrador
        </Typography>

        <Button
          onClick={handleOpenNewJobModal}
          variant="contained"
          color="primary"
          className={styles.addjobbutton}
          startIcon={<AddIcon />}
        >
          Agregar nuevo trabajo
        </Button>
      </Box>

      <Container maxWidth="lg" className={styles.maincontent}>
        <Paper elevation={3} className={styles.searchcontainer}>
          <Typography variant="h5" component="h2" gutterBottom className={styles.searchtitle}>
            Gestionar trabajos 👨🏽‍💻
          </Typography>
          <Box className={styles.searchfields}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Ubicación</InputLabel>
              <Select
                value={location}
                onChange={(e) => setLocation(e.target.value as string)}
                label="Ubicación"
                startAdornment={<LocationOnIcon className={styles.selecticon} />}
              >
                <MenuItem value="">
                  <em>Todas</em>
                </MenuItem>
                {uniqueLocations.map((loc) => (
                  <MenuItem key={loc} value={loc}>
                    {loc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Nombre del puesto"
              variant="outlined"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkIcon className={styles.textfieldicon} />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel>Área</InputLabel>
              <Select
                value={area}
                onChange={(e) => setArea(e.target.value as string)}
                label="Área"
                startAdornment={<CategoryIcon className={styles.selecticon} />}
              >
                <MenuItem value="">
                  <em>Todas</em>
                </MenuItem>
                {uniqueAreas.map((a) => (
                  <MenuItem key={a} value={a}>
                    {a}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Estado</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                label="Estado"
                startAdornment={<RemoveRedEyeIcon className={styles.selecticon} />}
              >
                <MenuItem value="all">Todas</MenuItem>
                <MenuItem value="active">Activas</MenuItem>
                <MenuItem value="inactive">Inactivas</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>

        <Box className={styles.resultssummary}>
          <Typography variant="h6" component="h3">
            Trabajos encontrados: {filteredJobs.length}
          </Typography>
          <Box className={styles.activefilters}>
            {location && <Chip label={`Ubicación: ${location}`} onDelete={() => setLocation("")} />}
            {position && <Chip label={`Puesto: ${position}`} onDelete={() => setPosition("")} />}
            {area && <Chip label={`Área: ${area}`} onDelete={() => setArea("")} />}
            {statusFilter !== "all" && (
              <Chip
                label={`Estado: ${statusFilter === "active" ? "Activas" : "Inactivas"}`}
                onDelete={() => setStatusFilter("all")}
              />
            )}
          </Box>
        </Box>

        {isLoading ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={6}>
            <CircularProgress size={60} style={{ color: "#1b0096" }} thickness={4} />
            <Typography variant="h6" style={{ color: "#1b0096", marginTop: 16 }}>
              Cargando trabajos...
            </Typography>
          </Box>
        ) : filteredJobs.length > 0 ? (
          <Grid container spacing={3} className={styles.jobgrid}>
            {filteredJobs.map((job) => (
              <AdminCardHome key={job.id} job={job} refreshVacants={updateVacants} />
            ))}
          </Grid>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={6}>
            <Typography variant="h6" style={{ color: "#666" }}>
              No se encontraron trabajos con los filtros seleccionados
            </Typography>
          </Box>
        )}

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          mt={4}
          mb={4}
          p={2}
          borderRadius={2}
          bgcolor="rgba(27, 0, 150, 0.05)"
        >
          <Box display="flex" alignItems="center" mb={{ xs: 2, sm: 0 }}>
            <Typography variant="body2" color="textSecondary" mr={2}>
              {size === -1
                ? `Mostrando todos los ${filteredJobs.length} trabajos`
                : `Mostrando ${filteredJobs.length > 0 ? page * size + 1 : 0} - ${Math.min(
                    (page + 1) * size,
                    filteredJobs.length,
                  )} de ${filteredJobs.length} trabajos`}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent={{ xs: "center", sm: "flex-end" }}>
            <FormControl variant="outlined" size="small" style={{ width: 120, marginRight: 16 }}>
              <InputLabel>Por página</InputLabel>
              <Select
                value={size}
                onChange={handleSizeChange}
                label="Por página"
                style={{ backgroundColor: "white" }}
              >
                <MenuItem value={4}>4 trabajos</MenuItem>
                <MenuItem value={12}>12 trabajos</MenuItem>
                <MenuItem value={16}>16 trabajos</MenuItem>
                <MenuItem value={20}>20 trabajos</MenuItem>
                <MenuItem value={-1}>Todos</MenuItem>
              </Select>
            </FormControl>
            {size !== -1 && (
              <Pagination
                count={totalPages}
                page={page + 1}
                onChange={handlePageChange}
                color="primary"
                size="medium"
                showFirstButton
                showLastButton
                renderItem={(item) => (
                  <PaginationItem
                    {...item}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "#1b0096",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#1b0096cc",
                        },
                      },
                      "&.MuiPaginationItem-root": {
                        margin: "0 2px",
                      },
                    }}
                  />
                )}
              />
            )}
          </Box>
        </Box>
      </Container>

      <NewJob open={openNewJobModal} handleClose={handleCloseNewJobModal} updateVacants={updateVacants} />
    </Box>
  )
}

export default AdminHome

