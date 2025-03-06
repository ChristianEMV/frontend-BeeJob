"use client"

import type React from "react"
import { useState } from "react"
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
} from "@mui/material"
import type { Job } from "../../Home/Home.types"
import AdminCardHome from "./AdminCardHome"
import WorkIcon from "@mui/icons-material/Work"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import CategoryIcon from "@mui/icons-material/Category"
import AddIcon from "@mui/icons-material/Add"
import "./AdminHome.css"

const AdminHome: React.FC = () => {
  const [location, setLocation] = useState<string>("")
  const [position, setPosition] = useState<string>("")
  const [area, setArea] = useState<string>("")

  // Datos de trabajos
  const jobs: Job[] = [
    {
      id: 1,
      location: "New York",
      positionName: "UX Designer",
      area: "Technology",
    },
    { id: 2, location: "Brasil", positionName: "Accountant", area: "Finance" },
    {
      id: 3,
      location: "Mexico",
      positionName: "Designer and Photographer",
      area: "Marketing",
    },
    {
      id: 4,
      location: "New York",
      positionName: "UX Designer",
      area: "Technology",
    },
    {
      id: 5,
      location: "New York",
      positionName: "UX Designer",
      area: "Technology",
    },
    {
      id: 6,
      location: "Canada",
      positionName: "Software Engineer",
      area: "Technology",
    },
    {
      id: 7,
      location: "Germany",
      positionName: "Financial Analyst",
      area: "Finance",
    },
    {
      id: 8,
      location: "France",
      positionName: "Marketing Manager",
      area: "Marketing",
    },
    {
      id: 9,
      location: "India",
      positionName: "Data Scientist",
      area: "Technology",
    },
    {
      id: 10,
      location: "UK",
      positionName: "Product Manager",
      area: "Technology",
    },
    {
      id: 11,
      location: "Japan",
      positionName: "Account Manager",
      area: "Finance",
    },
    {
      id: 12,
      location: "Spain",
      positionName: "Graphic Designer",
      area: "Marketing",
    },
    {
      id: 13,
      location: "Italy",
      positionName: "Web Developer",
      area: "Technology",
    },
    {
      id: 14,
      location: "Australia",
      positionName: "HR Specialist",
      area: "Human Resources",
    },
    {
      id: 15,
      location: "Netherlands",
      positionName: "Business Analyst",
      area: "Finance",
    },
    {
      id: 16,
      location: "Sweden",
      positionName: "AI Researcher",
      area: "Technology",
    },
    {
      id: 17,
      location: "China",
      positionName: "SEO Specialist",
      area: "Marketing",
    },
    {
      id: 18,
      location: "South Korea",
      positionName: "Cybersecurity Analyst",
      area: "Technology",
    },
    {
      id: 19,
      location: "Mexico",
      positionName: "Financial Consultant",
      area: "Finance",
    },
    {
      id: 20,
      location: "Argentina",
      positionName: "Brand Strategist",
      area: "Marketing",
    },
    {
      id: 21,
      location: "Colombia",
      positionName: "UX/UI Designer",
      area: "Technology",
    },
    {
      id: 22,
      location: "Chile",
      positionName: "Investment Analyst",
      area: "Finance",
    },
    {
      id: 23,
      location: "Peru",
      positionName: "Social Media Manager",
      area: "Marketing",
    },
    {
      id: 24,
      location: "Switzerland",
      positionName: "Machine Learning Engineer",
      area: "Technology",
    },
    {
      id: 25,
      location: "Russia",
      positionName: "Risk Manager",
      area: "Finance",
    },
  ]

  const filteredJobs = jobs.filter(
    (job) =>
      (location === "" || job.location.toLowerCase().includes(location.toLowerCase())) &&
      (position === "" || job.positionName.toLowerCase().includes(position.toLowerCase())) &&
      (area === "" || job.area.toLowerCase().includes(area.toLowerCase())),
  )

  const uniqueLocations = Array.from(new Set(jobs.map((job) => job.location)))
  const uniqueAreas = Array.from(new Set(jobs.map((job) => job.area)))

  return (
    <Box className="admin-home-container">
      <Box className="admin-home-header">
        <Typography variant="h3" component="h1" gutterBottom align="center" color="white" className="header-title">
          Bienvenido, Administrador
        </Typography>
        <Button variant="contained" color="primary" className="add-job-button" startIcon={<AddIcon />}>
          Agregar nuevo trabajo
        </Button>
      </Box>

      <Container maxWidth="lg" className="main-content">
        <Paper elevation={3} className="search-container">
          <Typography variant="h5" component="h2" gutterBottom className="search-title">
            Gestionar trabajos 👨🏽‍💻
          </Typography>
          <Box className="search-fields">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Ubicación</InputLabel>
              <Select
                value={location}
                onChange={(e) => setLocation(e.target.value as string)}
                label="Ubicación"
                startAdornment={<LocationOnIcon className="select-icon" />}
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
                    <WorkIcon className="text-field-icon" />
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
                startAdornment={<CategoryIcon className="select-icon" />}
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
          </Box>
        </Paper>

        <Box className="results-summary">
          <Typography variant="h6" component="h3">
            Trabajos encontrados: {filteredJobs.length}
          </Typography>
          <Box className="active-filters">
            {location && <Chip label={`Ubicación: ${location}`} onDelete={() => setLocation("")} />}
            {position && <Chip label={`Puesto: ${position}`} onDelete={() => setPosition("")} />}
            {area && <Chip label={`Área: ${area}`} onDelete={() => setArea("")} />}
          </Box>
        </Box>

        <Grid container spacing={3} className="job-grid">
          {filteredJobs.map((job) => (
            <AdminCardHome key={job.id} job={job} />
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default AdminHome

