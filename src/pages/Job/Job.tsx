"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Divider,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  LinearProgress,
  Tooltip,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import ShareIcon from "@mui/icons-material/Share"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import LockIcon from "@mui/icons-material/Lock"
import PersonIcon from "@mui/icons-material/Person"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import WorkIcon from "@mui/icons-material/Work"
import SchoolIcon from "@mui/icons-material/School"
import BugReportIcon from "@mui/icons-material/BugReport"
import styles from "./jobmodal.module.css"
import type { Job } from "../../pages/Home/Home.types"
import "react-quill/dist/quill.snow.css"
import { applyForVacant, getUserInSession, hasAppliedToVacant, type UserInSession } from "../../services/authService"

interface JobModalProps {
  open: boolean
  handleClose: () => void
  job: Job
}

// Actualizar el componente JobModal para usar los servicios de autenticación
const JobModal: React.FC<JobModalProps> = ({ open, handleClose, job }) => {
  const navigate = useNavigate()
  const [applying, setApplying] = useState<boolean>(false)
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success")
  const [applicationProgress, setApplicationProgress] = useState<number>(0)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [hasApplied, setHasApplied] = useState<boolean>(false)
  const [showAuthPrompt, setShowAuthPrompt] = useState<boolean>(false)
  const [showProfilePrompt, setShowProfilePrompt] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserInSession | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  // Opción para forzar la aplicación (para desarrollo/pruebas)
  const [forceApply, setForceApply] = useState<boolean>(false)

  // Verificar autenticación y estado del perfil
  useEffect(() => {
    const checkAuthAndProfile = async () => {
      try {
        setLoading(true)
        // Verificar si hay token
        const token = localStorage.getItem("token")
        const isAuth = !!token
        setIsAuthenticated(isAuth)

        if (!isAuth) {
          setLoading(false)
          return
        }

        // Obtener datos del usuario
        const user = await getUserInSession()
        setUserData(user)

        // Verificar si ya se ha postulado a esta vacante
        if (job && job.id) {
          try {
            const alreadyApplied = await hasAppliedToVacant(job.id)
            setHasApplied(alreadyApplied)
            console.log("¿Ya se ha postulado a esta vacante?", alreadyApplied)
          } catch (error) {
            console.error("Error verificando si ya se ha postulado:", error)
            setHasApplied(false)
          }
        }
      } catch (error) {
        console.error("Error verificando estado del usuario:", error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuthAndProfile()
  }, [job])

  // Función para mostrar los datos del usuario en la consola (para depuración)
  const debugUserData = () => {
    console.log("Datos completos del usuario:", userData)

    // Mostrar un mensaje al usuario
    setSnackbarMessage("Datos del usuario mostrados en la consola (F12)")
    setSnackbarSeverity("info")
    setOpenSnackbar(true)

    // Forzar la aplicación para pruebas
    setForceApply(true)
  }

  const handleApplyNow = async () => {
    if (!isAuthenticated) {
      setShowAuthPrompt(true)
      return
    }

    // Si forceApply está activado, permitir la aplicación sin más verificaciones
    if (!forceApply) {
      // Verificación simplificada: solo verificar si el usuario existe
      if (!userData) {
        setShowProfilePrompt(true)
        return
      }
    }

    if (hasApplied) {
      setSnackbarMessage("You have already applied for this position")
      setSnackbarSeverity("info")
      setOpenSnackbar(true)
      return
    }

    // Usuario autenticado y con perfil completo o forzado
    setApplying(true)
    setShowAuthPrompt(false)
    setShowProfilePrompt(false)

    // Simulación de progreso para mejor UX
    const progressInterval = setInterval(() => {
      setApplicationProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + Math.random() * 20, 90)
        return newProgress
      })
    }, 500)

    try {
      await applyForVacant({ id: job.id })
      clearInterval(progressInterval)
      setApplicationProgress(100)
      setHasApplied(true)

      setSnackbarMessage("Your application has been successfully submitted!")
      setSnackbarSeverity("success")
      setOpenSnackbar(true)

      // Esperar un momento para que el usuario vea el mensaje de éxito antes de cerrar el modal
      setTimeout(() => {
        handleClose() // Cerrar el modal
        navigate(`/home`) // Navegar a la página del trabajo
      }, 1500)
    } catch (err: any) {
      clearInterval(progressInterval)
      setApplicationProgress(0)

      setSnackbarMessage(err.message || "An error occurred while submitting your application.")
      setSnackbarSeverity("error")
      setOpenSnackbar(true)
      setApplying(false)
    }
  }

  const handleLogin = () => {
    handleClose()
    navigate("/login")
  }

  const handleSignup = () => {
    handleClose()
    navigate("/signup")
  }

  const handleCompleteProfile = () => {
    handleClose()
    navigate("/profile")
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleCloseAuthPrompt = () => {
    setShowAuthPrompt(false)
  }

  const handleCloseProfilePrompt = () => {
    setShowProfilePrompt(false)
  }

  // Format salary
  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(salary)
  }

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      classes={{ paper: styles.dialogpaper }}
      aria-labelledby="job-details-dialog-title"
    >
      <Box className={styles.modalHeader}>
        <IconButton aria-label="close" onClick={handleClose} className={styles.closebutton}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent className={styles.dialogcontent}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <Box className={styles.jobHeader}>
              <Box className={styles.titleBackground}>

                <Typography variant="h3" component="h1" className={styles.jobtitle}>
                  {job.positionName}
                </Typography>

              </Box>
            </Box>

            <Box className={styles.jobinfo}>
              <Typography variant="h6" className={styles.sectiontitle}>
                About the role
              </Typography>
              <div
                className={styles.jobdescription}
                dangerouslySetInnerHTML={{
                  __html: job.jobDescription || "No description available.",
                }}
              />

              <Divider className={styles.divider} />

              <Typography variant="h6" className={styles.sectiontitle}>
                Requirements
              </Typography>
              <div
                className={styles.jobdescription}
                dangerouslySetInnerHTML={{
                  __html: job.requirements || "No requirements specified.",
                }}
              />

              {job.aditionalInformation && (
                <>
                  <Divider className={styles.divider} />
                  <Typography variant="h6" className={styles.sectiontitle}>
                    Additional Information
                  </Typography>
                  <div
                    className={styles.jobdescription}
                    dangerouslySetInnerHTML={{
                      __html: job.aditionalInformation,
                    }}
                  />
                </>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box className={styles.jobmeta}>
              <Box className={styles.metaHeader}>
                <Typography variant="subtitle2" className={styles.metaSectionTitle}>
                  Job Details
                </Typography>
              </Box>

              <div className={styles.metaContainer}>
                <div className={styles.metaCard}>
                  <LocationOnIcon className={styles.metaIcon} />
                  <div>
                    <div className={styles.metaCardTitle}>Location</div>
                    <div className={styles.metaCardValue}>{job.location}</div>
                  </div>
                </div>

                <div className={styles.metaCard}>
                  <BusinessCenterIcon className={styles.metaIcon} />
                  <div>
                    <div className={styles.metaCardTitle}>Department</div>
                    <div className={styles.metaCardValue}>{job.area}</div>
                  </div>
                </div>

                <div className={styles.metaCard}>
                  <AttachMoneyIcon className={styles.metaIcon} />
                  <div>
                    <div className={styles.metaCardTitle}>Salary</div>
                    <div className={styles.metaCardValue}>{formatSalary(job.salary)}</div>
                  </div>
                </div>

                <div className={styles.metaCard}>
                  <CalendarTodayIcon className={styles.metaIcon} />
                  <div>
                    <div className={styles.metaCardTitle}>Deadline</div>
                    <div className={styles.metaCardValue}>{formatDate(job.deadline)}</div>
                  </div>
                </div>
              </div>

              {/* Sección de aplicación */}
              <Box className={styles.applySection}>
                {applying && (
                  <Box className={styles.progressContainer}>
                    <LinearProgress variant="determinate" value={applicationProgress} className={styles.progressBar} />
                    <Typography variant="caption" className={styles.progressText}>
                      {applicationProgress < 100 ? "Submitting application..." : "Application submitted!"}
                    </Typography>
                  </Box>
                )}

                {loading ? (
                  <Button variant="contained" className={styles.applybutton} disabled={true}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                      Loading...
                    </Box>
                  </Button>
                ) : hasApplied ? (
                  <Button
                    variant="contained"
                    className={`${styles.applybutton} ${styles.appliedButton}`}
                    disabled={true}
                  >
                    You have already applied
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    className={styles.applybutton}
                    onClick={handleApplyNow}
                    disabled={applying}
                    endIcon={!applying && <ArrowForwardIcon />}
                  >
                    {applying ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                        Applying...
                      </Box>
                    ) : (
                      "Apply for this position"
                    )}
                  </Button>
                )}

                {/* Indicador de modo forzado */}
                {forceApply && (
                  <Typography variant="caption" className={styles.forceApplyText}>
                    Debug mode: Profile validation bypassed
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <Dialog
        open={showAuthPrompt}
        onClose={handleCloseAuthPrompt}
        maxWidth="xs"
        fullWidth
        classes={{ paper: styles.authDialogPaper }}
      >
        <Box className={styles.authDialogContent}>
          <Box className={styles.authIcon}>
            <LockIcon />
          </Box>
          <Typography variant="h6" className={styles.authTitle}>
            Authentication Required
          </Typography>
          <Typography variant="body2" className={styles.authDescription}>
            You need to be logged in to apply for this position. Please sign in or create an account to continue.
          </Typography>
          <Box className={styles.authButtons}>
            <Button variant="contained" className={styles.loginButton} onClick={handleLogin} startIcon={<PersonIcon />}>
              Sign In
            </Button>
            <Button variant="outlined" className={styles.signupButton} onClick={handleSignup}>
              Create Account
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* Profile Completion Prompt Dialog */}
      <Dialog
        open={showProfilePrompt}
        onClose={handleCloseProfilePrompt}
        maxWidth="sm"
        fullWidth
        classes={{ paper: styles.authDialogPaper }}
      >
        <Box className={styles.authDialogContent}>
          <Box className={styles.authIcon}>
            <AccountCircleIcon />
          </Box>
          <Typography variant="h6" className={styles.authTitle}>
            Complete Your Profile
          </Typography>
          <Typography variant="body2" className={styles.authDescription}>
            Before applying for this position, you need to complete your profile information. This helps employers
            better understand your qualifications.
          </Typography>

          <Box className={styles.profileRequirements}>
            <Box className={styles.profileRequirement}>
              <PersonIcon className={styles.profileRequirementIcon} />
              <Typography variant="body2">Personal Information</Typography>
            </Box>
            <Box className={styles.profileRequirement}>
              <WorkIcon className={styles.profileRequirementIcon} />
              <Typography variant="body2">Work Experience</Typography>
            </Box>
            <Box className={styles.profileRequirement}>
              <SchoolIcon className={styles.profileRequirementIcon} />
              <Typography variant="body2">Education</Typography>
            </Box>
          </Box>

          <Box className={styles.authButtons}>
            <Button variant="contained" className={styles.loginButton} onClick={handleCompleteProfile}>
              Complete Profile
            </Button>
            <Button variant="outlined" className={styles.signupButton} onClick={handleCloseProfilePrompt}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} className={styles.alert}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  )
}

export default JobModal

