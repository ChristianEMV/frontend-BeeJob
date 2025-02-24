import React, { useState, useEffect } from "react"; // Asegúrate de importar useEffect
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
} from "@mui/material";
import { Job } from "./Home.types";
import HomeCard from "./HomeCard";
import SearchIcon from "@mui/icons-material/Search";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import NotificationToast from "../../components/Notification/NotificationToast"; // Importa el componente de notificación
import "./Home.css";

const Home: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false); // Estado para controlar la notificación
  const [location, setLocation] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [area, setArea] = useState<string>("");

  // Datos de ejemplo de trabajos
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
  ];

  // Mostrar la notificación cuando el usuario entra a /home
  useEffect(() => {
    setShowNotification(true); // Activar la notificación
  }, []);

  // Filtrar trabajos según los criterios de búsqueda
  const filteredJobs = jobs.filter(
    (job) =>
      (location === "" || job.location.includes(location)) &&
      (position === "" || job.positionName.includes(position)) &&
      (area === "" || job.area.includes(area))
  );

  return (
    <>
      {/* Notificación animada */}
      {showNotification && (
        <NotificationToast
          message="Completa tu información aquí!"
          onClose={() => setShowNotification(false)} // Cerrar la notificación
        />
      )}

      {/* Encabezado de la página */}
      <Box className="home-header">
        <Typography variant="h4" component="h1" gutterBottom align="center" color="white">
          Are you a student?
        </Typography>
        <Button variant="contained" color="primary" className="student-button">
          Yes, I am ☝️
        </Button>
      </Box>

      {/* Contenido principal */}
      <Container sx={{ py: 4, maxWidth: "lg" }}>
        {/* Filtros de búsqueda */}
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <FormControl fullWidth variant="outlined" sx={{ "& .MuiInputLabel-root": { color: "#1B0096" } }}>
            <InputLabel>Location</InputLabel>
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value as string)}
              label="Location"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#1B0096" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1B0096" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1B0096" },
              }}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Technology">New York</MenuItem>
              <MenuItem value="Finance">Brasil</MenuItem>
              <MenuItem value="Marketing">Mexico</MenuItem>
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
                  <SearchIcon sx={{ color: "#1B0096" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputLabel-root": { color: "#1B0096" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#1B0096" },
                "&:hover fieldset": { borderColor: "#1B0096" },
                "&.Mui-focused fieldset": { borderColor: "#1B0096" },
              },
            }}
          />
          <FormControl fullWidth variant="outlined" sx={{ "& .MuiInputLabel-root": { color: "#1B0096" } }}>
            <InputLabel>Area</InputLabel>
            <Select
              value={area}
              onChange={(e) => setArea(e.target.value as string)}
              label="Area"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#1B0096" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1B0096" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1B0096" },
              }}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Lista de trabajos filtrados */}
        <Grid container spacing={3}>
          {filteredJobs.map((job) => (
            <HomeCard key={job.id} job={job} />
          ))}
        </Grid>
      </Container>

      {/* Botón flotante */}
      <FloatingButton />
    </>
  );
};

export default Home;