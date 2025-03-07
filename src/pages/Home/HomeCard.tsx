import type React from "react"
import type { Job } from "./Home.types"
import { Card, CardContent, Typography, Grid, Box, Chip, Button } from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import WorkIcon from "@mui/icons-material/Work"
import BusinessIcon from "@mui/icons-material/Business"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import styles from "./styles.module.css"

interface HomeCardProps {
  job: Job
}

const HomeCard: React.FC<HomeCardProps> = ({ job }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={styles.homecard}>
        <Box className={styles.carddecorator}></Box>

        <CardContent sx={{ position: "relative", zIndex: 1, p: 3 }}>
          <Box sx={{ mb: 2 }}>
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
              }}
            >
              <BusinessIcon sx={{ color: "#1B0096", mr: 1, fontSize: "1rem" }} />
              {job.area}
            </Typography>
          </Box>

          <Button variant="outlined" endIcon={<ArrowForwardIcon />} className={styles.viewdetailsbutton} fullWidth>
            Ver detalles
          </Button>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default HomeCard

