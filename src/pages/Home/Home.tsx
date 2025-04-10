"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Paper,
  CircularProgress,
  Pagination,
  PaginationItem,
  type SelectChangeEvent,
} from "@mui/material"
import type { Job } from "./Home.types"
import HomeCard from "./HomeCard"
import WorkIcon from "@mui/icons-material/Work"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import CategoryIcon from "@mui/icons-material/Category"
import styles from "./styles.module.css"
import { getAllVacantsUser } from "../../services/authService"
import Swal from "sweetalert2"

const Home: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false)
  const [location, setLocation] = useState<string>("")
  const [position, setPosition] = useState<string>("")
  const [area, setArea] = useState<string>("")
  const [vacants, setVacants] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(12)
  const [totalPages, setTotalPages] = useState(0)

  const fetchVacants = useCallback(async () => {
    setIsLoading(true)
    try {
      const requestSize = size === -1 ? 1000 : size

      const response = await getAllVacantsUser({
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
    fetchVacants()
  }, [fetchVacants])

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  const handleSizeChange = (event: SelectChangeEvent<number>) => {
    const newSize = event.target.value as number
    setSize(newSize)
    setPage(0)
  }

  const handleStudentButtonClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be redirected to a Google Form for students.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1b0096",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirigir al Google Form
        window.location.href = "https://forms.gle/your-google-form-link";
      }
    });
  };

  const filteredJobs = vacants.filter(
    (job) =>
      (location === "" || job.location.toLowerCase().includes(location.toLowerCase())) &&
      (position === "" || job.positionName.toLowerCase().includes(position.toLowerCase())) &&
      (area === "" || job.area.toLowerCase().includes(area.toLowerCase())),
  )

  const uniqueLocations = Array.from(new Set(vacants.map((job) => job.location)))
  const uniqueAreas = Array.from(new Set(vacants.map((job) => job.area)))

  return (
    <Box className={styles.homecontainer}>
      <Box className={styles.homeheader}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          color="white"
          className={styles.headertitle}>
          Find your ideal job
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={styles.studentbutton}
          onClick={handleStudentButtonClick}
        >
          I am a student 🎓
        </Button>
      </Box>

      <Container maxWidth="lg" className={styles.maincontent}>
        <Paper elevation={3} className={styles.searchcontainer}>
          <Typography variant="h5" component="h2" gutterBottom className={styles.searchtitle}>
          Explore job opportunities 🚀
          </Typography>
          <Box className={styles.searchfields}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Location</InputLabel>
              <Select
                value={location}
                onChange={(e) => setLocation(e.target.value as string)}
                label="Location"
                startAdornment={<LocationOnIcon className={styles.selecticon} />}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {uniqueLocations.map((loc) => (
                  <MenuItem key={loc} value={loc}>
                    {loc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Position name"
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
              <InputLabel>Area</InputLabel>
              <Select
                value={area}
                onChange={(e) => setArea(e.target.value as string)}
                label="Area"
                startAdornment={<CategoryIcon className={styles.selecticon} />}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {uniqueAreas.map((a) => (
                  <MenuItem key={a} value={a}>
                    {a}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Paper>

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
              <HomeCard key={job.id} job={job} />
            ))}
          </Grid>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={6}>
            <Typography variant="h6" style={{ color: "#666" }}>
              No se encontraron trabajos con los filtros seleccionados
            </Typography>
          </Box>
        )}

        {!isLoading && filteredJobs.length > 0 && (
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
        )}
      </Container>
    </Box>
  )
}

export default Home

