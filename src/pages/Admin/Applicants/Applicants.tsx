"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Container,
  Box,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Grid,
  IconButton,
  Alert,
  CircularProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  InputAdornment,
  TextField,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from "@mui/icons-material/Cancel"
import SchoolIcon from "@mui/icons-material/School"
import WorkIcon from "@mui/icons-material/Work"
import EmailIcon from "@mui/icons-material/Email"
import DateRangeIcon from "@mui/icons-material/DateRange"
import PersonIcon from "@mui/icons-material/Person"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import BusinessIcon from "@mui/icons-material/Business"
import PhoneIcon from "@mui/icons-material/Phone"
import DescriptionIcon from "@mui/icons-material/Description"
import LinkIcon from "@mui/icons-material/Link"
import CloseIcon from "@mui/icons-material/Close"
import LanguageIcon from "@mui/icons-material/Language"
import CodeIcon from "@mui/icons-material/Code"
import PsychologyIcon from "@mui/icons-material/Psychology"
import FacebookIcon from "@mui/icons-material/Facebook"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import SearchIcon from "@mui/icons-material/Search"
import VisibilityIcon from "@mui/icons-material/Visibility"
import RefreshIcon from "@mui/icons-material/Refresh"
import { getAllPostulations, updatePostulationStatus } from "../../../services/authService"
import { EPostulationStatus, type ResponseGetPostulationDTO } from "../../../services/authService"
import styles from "./styles.module.css"
import Swal from "sweetalert2"

// Custom styled components for table
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: "20px auto",
  borderRadius: "12px",
  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
  overflow: "hidden",
  border: "1px solid rgba(27, 0, 150, 0.1)",
}))

const StyledTableHead = styled(TableHead)(() => ({
  backgroundColor: "#1b0096",
}))

const StyledHeaderCell = styled(TableCell)(() => ({
  color: "white",
  fontWeight: "bold",
  fontSize: "0.9rem",
  padding: "16px",
}))

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(27, 0, 150, 0.03)",
  },
  "&:hover": {
    backgroundColor: "rgba(27, 0, 150, 0.07)",
    transition: "background-color 0.2s ease",
  },
}))

const ActionButton = styled(Button)(({ color }: { color?: string }) => ({
  textTransform: "none",
  minWidth: "auto",
  padding: "6px 12px",
  fontWeight: 500,
}))

const RefreshButton = styled(IconButton)(() => ({
  color: "#1b0096",
  marginBottom: "16px",
}))

const StyledModalContent = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  maxWidth: "90vw",
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  padding: "0",
  outline: "none",
}))

const Applicants: React.FC = () => {
  const [applicantsList, setApplicantsList] = useState<ResponseGetPostulationDTO[]>([])
  const [selectedApplicant, setSelectedApplicant] = useState<ResponseGetPostulationDTO | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Fetch applicants from the backend
  const fetchApplicants = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getAllPostulations({
        page: 0,
        size: 100,
        sortBy: "applicationDate",
        sortDirection: "ASC",
        status: activeTab === "all" ? null : (activeTab as EPostulationStatus),
      })
      setApplicantsList(
        response.content.map((postulation: any) => ({
          ...postulation,
          user: postulation.user || null,
          vacant: postulation.vacant || null,
          professionalInformation: postulation.professionalInformation || null,
        })),
      )
    } catch (error) {
      console.error("Error fetching applicants:", error)
      setError("Failed to load applicants. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplicants()
  }, [activeTab])

  const handleAccept = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "Accept Applicant",
        text: "Are you sure you want to accept this applicant?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#1b0096",
        cancelButtonColor: "#6e7881",
        confirmButtonText: "Yes, accept",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        focusCancel: true,
      })

      if (result.isConfirmed) {
        await updatePostulationStatus({
          postulationId: id,
          status: EPostulationStatus.ACCEPTED,
        })

        await Swal.fire({
          title: "Accepted!",
          text: "The applicant has been accepted successfully.",
          icon: "success",
          confirmButtonColor: "#1b0096",
        })

        fetchApplicants()
        if (selectedApplicant?.id === id) {
          setSelectedApplicant(null)
        }
      }
    } catch (error) {
      console.error("Error accepting applicant:", error)
      setError("Failed to accept applicant. Please try again.")

      await Swal.fire({
        title: "Error!",
        text: "Failed to accept the applicant. Please try again.",
        icon: "error",
        confirmButtonColor: "#1b0096",
      })
    }
  }

  const handleReject = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "Reject Applicant",
        text: "Are you sure you want to reject this applicant?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ce0e00",
        cancelButtonColor: "#6e7881",
        confirmButtonText: "Yes, reject",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        focusCancel: true,
      })

      if (result.isConfirmed) {
        await updatePostulationStatus({
          postulationId: id,
          status: EPostulationStatus.REJECTED,
        })

        await Swal.fire({
          title: "Rejected!",
          text: "The applicant has been rejected successfully.",
          icon: "success",
          confirmButtonColor: "#1b0096",
        })

        fetchApplicants()
        if (selectedApplicant?.id === id) {
          setSelectedApplicant(null)
        }
      }
    } catch (error) {
      console.error("Error rejecting applicant:", error)
      setError("Failed to reject applicant. Please try again.")

      await Swal.fire({
        title: "Error!",
        text: "Failed to reject the applicant. Please try again.",
        icon: "error",
        confirmButtonColor: "#1b0096",
      })
    }
  }

  const handleViewKardex = (applicant: ResponseGetPostulationDTO) => {
    setSelectedApplicant(applicant)
  }

  const getStatusCount = (status: string) => {
    if (status === "all") return applicantsList.length
    return applicantsList.filter((app) => app.status === status).length
  }

  const getStatusChipColor = (status: EPostulationStatus) => {
    switch (status) {
      case EPostulationStatus.PENDING:
        return {
          bg: "rgba(240, 161, 43, 0.1)",
          color: "#f0a12b",
        }
      case EPostulationStatus.ACCEPTED:
        return {
          bg: "rgba(76, 175, 80, 0.1)",
          color: "#4caf50",
        }
      case EPostulationStatus.REJECTED:
        return {
          bg: "rgba(206, 14, 0, 0.1)",
          color: "#ce0e00",
        }
      default:
        return {
          bg: "rgba(0, 0, 0, 0.1)",
          color: "#000",
        }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    }
  }

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const filterApplicants = (applicants: ResponseGetPostulationDTO[]) => {
    if (!searchTerm.trim()) return applicants

    const searchTermLower = searchTerm.toLowerCase()

    return applicants.filter(
      (applicant) =>
        applicant.user?.name?.toLowerCase().includes(searchTermLower) ||
        applicant.user?.email?.toLowerCase().includes(searchTermLower) ||
        applicant.vacant?.positionName?.toLowerCase().includes(searchTermLower) ||
        applicant.vacant?.location?.toLowerCase().includes(searchTermLower),
    )
  }

  return (
    <Container maxWidth="xl" className={styles.applicantscontainer}>
      <Box className={styles.headerContainer}>
        <Typography variant="h4" className={styles.applicantstitle}>
          Applicants
        </Typography>
        <Typography variant="body1" className={styles.applicantsSubtitle}>
          Review and manage job applications
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)} className={styles.errorAlert}>
          {error}
        </Alert>
      )}

      <Box className={styles.filterTabsContainer}>
        <Box className={styles.tabsContainer}>
          <Box
            className={`${styles.filterTabItem} ${activeTab === "all" ? styles.activeFilterTab : ""}`}
            onClick={() => setActiveTab("all")}
          >
            <Typography className={styles.filterTabText}>
              All
              <Chip size="small" label={getStatusCount("all")} className={styles.filterTabBadge} />
            </Typography>
          </Box>
          <Box
            className={`${styles.filterTabItem} ${activeTab === EPostulationStatus.PENDING ? styles.activeFilterTab : ""}`}
            onClick={() => setActiveTab(EPostulationStatus.PENDING)}
          >
            <AccessTimeIcon className={styles.filterTabIcon} />
            <Typography className={styles.filterTabText}>
              Pending
              <Chip size="small" label={getStatusCount(EPostulationStatus.PENDING)} className={styles.filterTabBadge} />
            </Typography>
          </Box>
          <Box
            className={`${styles.filterTabItem} ${activeTab === EPostulationStatus.ACCEPTED ? styles.activeFilterTab : ""}`}
            onClick={() => setActiveTab(EPostulationStatus.ACCEPTED)}
          >
            <CheckCircleIcon className={styles.filterTabIcon} />
            <Typography className={styles.filterTabText}>
              Accepted
              <Chip
                size="small"
                label={getStatusCount(EPostulationStatus.ACCEPTED)}
                className={styles.filterTabBadge}
              />
            </Typography>
          </Box>
          <Box
            className={`${styles.filterTabItem} ${activeTab === EPostulationStatus.REJECTED ? styles.activeFilterTab : ""}`}
            onClick={() => setActiveTab(EPostulationStatus.REJECTED)}
          >
            <CancelIcon className={styles.filterTabIcon} />
            <Typography className={styles.filterTabText}>
              Rejected
              <Chip
                size="small"
                label={getStatusCount(EPostulationStatus.REJECTED)}
                className={styles.filterTabBadge}
              />
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <TextField
          placeholder="Search by name, position or location..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "350px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(27, 0, 150, 0.3)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1b0096",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "rgba(9, 0, 48, 0.5)" }} />
              </InputAdornment>
            ),
          }}
        />
        <Tooltip title="Refresh applicants">
          <RefreshButton onClick={fetchApplicants}>
            <RefreshIcon />
          </RefreshButton>
        </Tooltip>
      </Box>

      {loading ? (
        <Box className={styles.loadingContainer}>
          <CircularProgress size={40} thickness={4} className={styles.loadingSpinner} />
          <Typography variant="body2" className={styles.loadingText}>
            Loading applicants...
          </Typography>
        </Box>
      ) : (
        <>
          {filterApplicants(applicantsList).length === 0 ? (
            <Box className={styles.noApplicants}>
              <Box className={styles.emptyStateContent}>
                <PersonIcon className={styles.emptyIcon} />
                <Typography variant="h6">No applicants found</Typography>
                <Typography variant="body2" color="textSecondary">
                  {activeTab === "all"
                    ? searchTerm
                      ? "No results match your search criteria."
                      : "There are no applications yet."
                    : `No ${activeTab.toLowerCase()} applications available.`}
                </Typography>
              </Box>
            </Box>
          ) : (
            <StyledTableContainer>
              <Table>
                <StyledTableHead>
                  <TableRow>
                    <StyledHeaderCell>Applicant</StyledHeaderCell>
                    <StyledHeaderCell>Position</StyledHeaderCell>
                    <StyledHeaderCell>Location</StyledHeaderCell>
                    <StyledHeaderCell>Applied On</StyledHeaderCell>
                    <StyledHeaderCell>Status</StyledHeaderCell>
                    <StyledHeaderCell align="center">Actions</StyledHeaderCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {filterApplicants(applicantsList).map((applicant) => (
                    <StyledTableRow key={applicant.id}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              bgcolor: "#1b0096",
                              width: 36,
                              height: 36,
                              marginRight: "12px",
                              fontSize: "0.9rem",
                            }}
                          >
                            {getInitials(applicant.user?.name)}
                          </Avatar>
                          <Box>
                            <Typography sx={{ fontWeight: 500 }}>
                              {applicant.user?.name} {applicant.user?.firstLastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {applicant.user?.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{applicant.vacant?.positionName}</TableCell>
                      <TableCell>{applicant.vacant?.location || "Not specified"}</TableCell>
                      <TableCell>{formatDate(applicant.applicationDate)}</TableCell>
                      <TableCell>
                        <Chip
                          label={applicant.status}
                          size="small"
                          sx={{
                            backgroundColor: getStatusChipColor(applicant.status).bg,
                            color: getStatusChipColor(applicant.status).color,
                            fontWeight: 500,
                            fontSize: "0.75rem",
                            height: "24px",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                          <Tooltip title="View Profile">
                            <IconButton
                              size="small"
                              onClick={() => handleViewKardex(applicant)}
                              sx={{ color: "#1b0096" }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          {applicant.status === EPostulationStatus.PENDING && (
                            <>
                              <Tooltip title="Accept">
                                <ActionButton
                                  variant="contained"
                                  size="small"
                                  onClick={() => handleAccept(applicant.id)}
                                  sx={{
                                    bgcolor: "#1b0096",
                                    "&:hover": { bgcolor: "#150070" },
                                  }}
                                >
                                  Accept
                                </ActionButton>
                              </Tooltip>
                              <Tooltip title="Reject">
                                <ActionButton
                                  variant="outlined"
                                  size="small"
                                  onClick={() => handleReject(applicant.id)}
                                  sx={{
                                    color: "#ce0e00",
                                    borderColor: "#ce0e00",
                                    "&:hover": {
                                      bgcolor: "rgba(206, 14, 0, 0.04)",
                                      borderColor: "#b50d00",
                                    },
                                  }}
                                >
                                  Reject
                                </ActionButton>
                              </Tooltip>
                            </>
                          )}
                        </Box>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          )}
        </>
      )}

      {selectedApplicant && (
        <KardexDialog
          applicant={selectedApplicant}
          open={!!selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
          onAccept={() => handleAccept(selectedApplicant.id)}
          onReject={() => handleReject(selectedApplicant.id)}
        />
      )}
    </Container>
  )
}

// Helper function to get social media icon
const getSocialMediaIcon = (platformName: string) => {
  switch (platformName.toLowerCase()) {
    case "facebook":
      return <FacebookIcon />
    case "github":
      return <GitHubIcon />
    case "linkedin":
      return <LinkedInIcon />
    case "twitter":
      return <TwitterIcon />
    case "instagram":
      return <InstagramIcon />
    default:
      return <LinkIcon />
  }
}

interface KardexDialogProps {
  applicant: ResponseGetPostulationDTO
  open: boolean
  onClose: () => void
  onAccept: () => void
  onReject: () => void
}

const KardexDialog: React.FC<KardexDialogProps> = ({ applicant, open, onClose, onAccept, onReject }) => {
  const [activeTab, setActiveTab] = useState<number>(0)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: styles.kardexDialog,
      }}
    >
      <DialogTitle className={styles.kardextitle}>
        <Box className={styles.kardexTitleContent}>
          <Typography variant="h5">Applicant Profile</Typography>
          <IconButton onClick={onClose} className={styles.closeIconButton} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent className={styles.kardexDialogContent}>
        <Box className={styles.applicantHeader}>
          <Avatar className={styles.kardexAvatar}>
            {applicant.user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .substring(0, 2)}
          </Avatar>
          <Box className={styles.applicantHeaderInfo}>
            <Typography variant="h6" className={styles.applicantName}>
              {applicant.user?.name} {applicant.user?.firstLastName} {applicant.user?.secondLastName}
            </Typography>
            <Chip
              label={applicant.status}
              className={`${styles.kardexStatusChip} ${
                applicant.status === EPostulationStatus.PENDING
                  ? styles.statusPending
                  : applicant.status === EPostulationStatus.ACCEPTED
                    ? styles.statusAccepted
                    : styles.statusRejected
              }`}
              size="small"
            />
          </Box>
        </Box>

        <Box className={styles.kardexTabs}>
          <Box className={styles.tabsContainer}>
            <Box
              className={`${styles.tabItem} ${activeTab === 0 ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(0)}
            >
              <PersonIcon className={styles.tabIcon} />
              <Typography className={styles.tabText}>BASIC INFO</Typography>
            </Box>
            <Box
              className={`${styles.tabItem} ${activeTab === 1 ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(1)}
            >
              <CodeIcon className={styles.tabIcon} />
              <Typography className={styles.tabText}>SKILLS</Typography>
            </Box>
            <Box
              className={`${styles.tabItem} ${activeTab === 2 ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(2)}
            >
              <SchoolIcon className={styles.tabIcon} />
              <Typography className={styles.tabText}>EDUCATION & EXPERIENCE</Typography>
            </Box>
            <Box
              className={`${styles.tabItem} ${activeTab === 3 ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(3)}
            >
              <DescriptionIcon className={styles.tabIcon} />
              <Typography className={styles.tabText}>CV DOCUMENT</Typography>
            </Box>
          </Box>
        </Box>

        <Box className={styles.kardexTabContent}>
          {/* Basic Info Tab */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box className={styles.kardexSection}>
                  <Typography variant="subtitle1" className={styles.sectionTitle}>
                    <PersonIcon className={styles.sectionIcon} /> Personal Information
                  </Typography>

                  <Box className={styles.infoItem}>
                    <EmailIcon fontSize="small" className={styles.infoItemIcon} />
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Email
                      </Typography>
                      <Typography variant="body2">{applicant.user?.email}</Typography>
                    </Box>
                  </Box>

                  <Box className={styles.infoItem}>
                    <PhoneIcon fontSize="small" className={styles.infoItemIcon} />
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Phone
                      </Typography>
                      <Typography variant="body2">{applicant.user?.phoneNumber || "Not provided"}</Typography>
                    </Box>
                  </Box>

                  <Box className={styles.infoItem}>
                    <LocationOnIcon fontSize="small" className={styles.infoItemIcon} />
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Location
                      </Typography>
                      <Typography variant="body2">
                        {applicant.user?.adressState || "Not provided"},{" "}
                        {applicant.user?.adressCountry || "Not provided"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box className={styles.kardexSection}>
                  <Typography variant="subtitle1" className={styles.sectionTitle}>
                    <WorkIcon className={styles.sectionIcon} /> Application Details
                  </Typography>

                  <Box className={styles.infoItem}>
                    <DateRangeIcon fontSize="small" className={styles.infoItemIcon} />
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Applied on
                      </Typography>
                      <Typography variant="body2">{formatDate(applicant.applicationDate)}</Typography>
                    </Box>
                  </Box>

                  <Box className={styles.infoItem}>
                    <WorkIcon fontSize="small" className={styles.infoItemIcon} />
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Position
                      </Typography>
                      <Typography variant="body2">{applicant.vacant?.positionName}</Typography>
                    </Box>
                  </Box>

                  <Box className={styles.infoItem}>
                    <BusinessIcon fontSize="small" className={styles.infoItemIcon} />
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Department
                      </Typography>
                      <Typography variant="body2">{applicant.vacant?.area}</Typography>
                    </Box>
                  </Box>

                  <Box className={styles.infoItem}>
                    <AttachMoneyIcon fontSize="small" className={styles.infoItemIcon} />
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Salary
                      </Typography>
                      <Typography variant="body2">${applicant.vacant?.salary}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {applicant.professionalInformation?.socialMediaProfiles && (
                <Grid item xs={12}>
                  <Box className={styles.kardexSection}>
                    <Typography variant="subtitle1" className={styles.sectionTitle}>
                      <LinkIcon className={styles.sectionIcon} /> Social Media Profiles
                    </Typography>

                    <Box className={styles.socialMediaContainer}>
                      {applicant.professionalInformation.socialMediaProfiles.map((profile, index) => (
                        <Link
                          key={index}
                          href={profile.profileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.socialMediaLink}
                        >
                          <Box className={styles.socialMediaItem}>
                            {getSocialMediaIcon(profile.platformName)}
                            <Typography variant="body2">{profile.platformName}</Typography>
                          </Box>
                        </Link>
                      ))}

                      {applicant.professionalInformation.socialMediaProfiles?.length === 0 && (
                        <Typography variant="body2" color="textSecondary">
                          No social media profiles provided
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>
          )}

          {/* Skills Tab */}
          {activeTab === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box className={styles.kardexSection}>
                  <Typography variant="subtitle1" className={styles.sectionTitle}>
                    <CodeIcon className={styles.sectionIcon} /> Hard Skills
                  </Typography>

                  <Box className={styles.skillsContainer}>
                    {applicant.professionalInformation?.hardSkills?.map((skill, index) => (
                      <Chip key={index} label={skill.skillName} className={styles.skillChip} size="small" />
                    ))}

                    {(!applicant.professionalInformation?.hardSkills ||
                      applicant.professionalInformation.hardSkills.length === 0) && (
                      <Typography variant="body2" color="textSecondary">
                        No hard skills provided
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box className={styles.kardexSection}>
                  <Typography variant="subtitle1" className={styles.sectionTitle}>
                    <PsychologyIcon className={styles.sectionIcon} /> Soft Skills
                  </Typography>

                  <Box className={styles.skillsContainer}>
                    {applicant.professionalInformation?.softSkills?.map((skill, index) => (
                      <Chip key={index} label={skill.skillName} className={styles.softSkillChip} size="small" />
                    ))}

                    {(!applicant.professionalInformation?.softSkills ||
                      applicant.professionalInformation.softSkills.length === 0) && (
                      <Typography variant="body2" color="textSecondary">
                        No soft skills provided
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box className={styles.kardexSection}>
                  <Typography variant="subtitle1" className={styles.sectionTitle}>
                    <LanguageIcon className={styles.sectionIcon} /> Languages
                  </Typography>

                  <Box className={styles.languagesContainer}>
                    {applicant.professionalInformation?.languages?.map((language, index) => (
                      <Box key={index} className={styles.languageItem}>
                        <Typography variant="body2" className={styles.languageName}>
                          {language.language}
                        </Typography>
                        <Chip label={language.level} size="small" className={styles.languageLevel} />
                      </Box>
                    ))}

                    {(!applicant.professionalInformation?.languages ||
                      applicant.professionalInformation.languages.length === 0) && (
                      <Typography variant="body2" color="textSecondary">
                        No languages provided
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}

          {/* Education & Experience Tab */}
          {activeTab === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box className={styles.kardexSection}>
                  <Typography variant="subtitle1" className={styles.sectionTitle}>
                    <SchoolIcon className={styles.sectionIcon} /> Education
                  </Typography>

                  {applicant.professionalInformation?.educations?.map((education, index) => (
                    <Box key={index} className={styles.educationItem}>
                      <Typography variant="subtitle2" className={styles.educationDegree}>
                        {education.degree} in {education.major}
                      </Typography>
                      <Typography variant="body2" className={styles.educationInstitution}>
                        {education.institution}, {education.schoolLocation}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(education.startDate).getFullYear()} - {new Date(education.endDate).getFullYear()}
                      </Typography>
                      {education.description && (
                        <Typography variant="body2" className={styles.educationDescription}>
                          {education.description}
                        </Typography>
                      )}
                    </Box>
                  ))}

                  {(!applicant.professionalInformation?.educations ||
                    applicant.professionalInformation.educations.length === 0) && (
                    <Typography variant="body2" color="textSecondary">
                      No education history provided
                    </Typography>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box className={styles.kardexSection}>
                  <Typography variant="subtitle1" className={styles.sectionTitle}>
                    <WorkIcon className={styles.sectionIcon} /> Work Experience
                  </Typography>

                  {applicant.professionalInformation?.workExperiences?.map((experience, index) => (
                    <Box key={index} className={styles.experienceItem}>
                      <Typography variant="subtitle2" className={styles.experienceTitle}>
                        {experience.jobTitle}
                      </Typography>
                      <Typography variant="body2" className={styles.experienceCompany}>
                        {experience.companyName}, {experience.location}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(experience.startDate).getFullYear()} - {new Date(experience.endDate).getFullYear()}
                      </Typography>
                      {experience.description && (
                        <Typography variant="body2" className={styles.experienceDescription}>
                          {experience.description}
                        </Typography>
                      )}
                    </Box>
                  ))}

                  {(!applicant.professionalInformation?.workExperiences ||
                    applicant.professionalInformation.workExperiences.length === 0) && (
                    <Typography variant="body2" color="textSecondary">
                      No work experience provided
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}

          {/* CV Document Tab */}
          {activeTab === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {applicant.professionalInformation?.cvLink ? (
                  <Box className={styles.kardexSection}>
                    <Typography variant="subtitle1" className={styles.sectionTitle}>
                      <DescriptionIcon className={styles.sectionIcon} /> CV Document
                    </Typography>

                    <Box className={styles.cvPreviewContainer}>
                      <Box className={styles.pdfPreview}>
                        <iframe
                          src={`${applicant.professionalInformation.cvLink}#toolbar=0&view=FitH`}
                          className={styles.pdfFrame}
                          title="CV Preview"
                        />
                      </Box>

                      <Box className={styles.cvActions}>
                        <Button
                          href={applicant.professionalInformation.cvLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.cvButton}
                          variant="outlined"
                          size="small"
                          startIcon={<LinkIcon />}
                        >
                          View Full CV
                        </Button>

                        <Button
                          href={applicant.professionalInformation.cvLink}
                          download="CV_Document.pdf"
                          className={styles.downloadButton}
                          variant="contained"
                          size="small"
                          startIcon={<DescriptionIcon />}
                        >
                          Download CV
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box className={styles.kardexSection}>
                    <Typography variant="subtitle1" className={styles.sectionTitle}>
                      <DescriptionIcon className={styles.sectionIcon} /> CV Document
                    </Typography>
                    <Box className={styles.noCvContainer}>
                      <DescriptionIcon className={styles.noCvIcon} />
                      <Typography variant="body1">No CV document provided</Typography>
                    </Box>
                  </Box>
                )}
              </Grid>
            </Grid>
          )}
        </Box>
      </DialogContent>

      <DialogActions className={styles.kardexActions}>
        {applicant.status === EPostulationStatus.PENDING && (
          <>
            <Button
              onClick={() => {
                Swal.fire({
                  title: "Reject Applicant",
                  text: "Are you sure you want to reject this applicant?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#ce0e00",
                  cancelButtonColor: "#6e7881",
                  confirmButtonText: "Yes, reject",
                  cancelButtonText: "Cancel",
                  reverseButtons: true,
                  focusCancel: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    onReject()
                    onClose()
                  }
                })
              }}
              className={styles.rejectDialogBtn}
              variant="outlined"
            >
              Reject
            </Button>
            <Button
              onClick={() => {
                Swal.fire({
                  title: "Accept Applicant",
                  text: "Are you sure you want to accept this applicant?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#1b0096",
                  cancelButtonColor: "#6e7881",
                  confirmButtonText: "Yes, accept",
                  cancelButtonText: "Cancel",
                  reverseButtons: true,
                  focusCancel: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    onAccept()
                    onClose()
                  }
                })
              }}
              className={styles.acceptDialogBtn}
              variant="contained"
            >
              Accept
            </Button>
          </>
        )}
        {applicant.status !== EPostulationStatus.PENDING && (
          <Button onClick={onClose} variant="contained" className={styles.closeButton}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default Applicants

