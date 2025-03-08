"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  Avatar,
  Paper,
  Divider,
  Container,
  Badge,
} from "@mui/material"
import {
  Person as PersonIcon,
  Work as WorkIcon,
  DateRange as DateRangeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material"
import Swal from "sweetalert2"
import styles from "./styles.module.css"

interface Applicant {
  id: number
  name: string
  vacancy: string
  email: string
  phone: string
  experience: string
  education: string
  skills: string[]
  status: "pending" | "accepted" | "rejected"
  appliedDate: string
}

const applicants: Applicant[] = [
  {
    id: 1,
    name: "John Doe",
    vacancy: "Software Engineer",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    experience: "5 years of experience in full-stack development with React and Node.js",
    education: "Bachelor's in Computer Science, Stanford University",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB"],
    status: "pending",
    appliedDate: "2023-10-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    vacancy: "Product Manager",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    experience: "7 years of experience in product management for SaaS companies",
    education: "MBA, Harvard Business School",
    skills: ["Product Strategy", "User Research", "Agile", "Data Analysis", "Roadmapping"],
    status: "pending",
    appliedDate: "2023-10-12",
  },
  {
    id: 3,
    name: "Michael Johnson",
    vacancy: "UX Designer",
    email: "michael.j@example.com",
    phone: "(555) 456-7890",
    experience: "4 years of experience in user experience design for mobile applications",
    education: "Master's in Human-Computer Interaction, Carnegie Mellon",
    skills: ["Figma", "User Testing", "Wireframing", "Prototyping", "UI Design"],
    status: "pending",
    appliedDate: "2023-10-18",
  },
  {
    id: 4,
    name: "Emily Chen",
    vacancy: "Data Scientist",
    email: "emily.chen@example.com",
    phone: "(555) 234-5678",
    experience: "6 years of experience in data science and machine learning",
    education: "PhD in Statistics, MIT",
    skills: ["Python", "R", "Machine Learning", "SQL", "Data Visualization"],
    status: "pending",
    appliedDate: "2023-10-10",
  },
]

const Applicants: React.FC = () => {
  const [applicantsList, setApplicantsList] = useState<Applicant[]>(applicants)
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")

  const handleAccept = (id: number) => {
    Swal.fire({
      title: "Accept Applicant",
      text: "Are you sure you want to accept this applicant?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1B0096",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept",
    }).then((result) => {
      if (result.isConfirmed) {
        setApplicantsList(
          applicantsList.map((applicant) => (applicant.id === id ? { ...applicant, status: "accepted" } : applicant)),
        )
        Swal.fire("Accepted!", "The applicant has been accepted.", "success")
      }
    })
  }

  const handleReject = (id: number) => {
    Swal.fire({
      title: "Reject Applicant",
      text: "Are you sure you want to reject this applicant?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1B0096",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject",
    }).then((result) => {
      if (result.isConfirmed) {
        setApplicantsList(
          applicantsList.map((applicant) => (applicant.id === id ? { ...applicant, status: "rejected" } : applicant)),
        )
        Swal.fire("Rejected!", "The applicant has been rejected.", "success")
      }
    })
  }

  const handleViewKardex = (applicant: Applicant) => {
    setSelectedApplicant(applicant)
  }

  const filteredApplicants = applicantsList.filter((applicant) => {
    if (activeTab === "all") return true
    return applicant.status === activeTab
  })

  const getStatusCount = (status: string) => {
    if (status === "all") return applicantsList.length
    return applicantsList.filter((app) => app.status === status).length
  }

  return (
    <Container maxWidth="xl" className={styles.applicantscontainer}>
      <Paper elevation={0} className={styles.headerPaper}>
        <Typography variant="h4" className={styles.applicantstitle}>
          Applicant Management
        </Typography>
        <Typography variant="subtitle1" className={styles.applicantsSubtitle}>
          Manage and review job applicants
        </Typography>
      </Paper>

      <Paper elevation={1} className={styles.tabsPaper}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          className={styles.applicantstabs}
          variant="fullWidth"
          indicatorColor="primary"
          sx={{ 
            '& .MuiTabs-indicator': { backgroundColor: '#1b0096' },
            '& .MuiTabs-textColor': { color: '#1b0096' }
          }}
          textColor="primary"
        >
          <Tab
            label={
              <Box className={styles.tabLabel}>
                <span>All Applicants</span>
                <Badge badgeContent={getStatusCount("all")} color="primary" className={styles.tabBadge} />
              </Box>
            }
            value="all"
          />
          <Tab
            label={
              <Box className={styles.tabLabel}>
                <span>Pending</span>
                <Badge badgeContent={getStatusCount("pending")} color="warning" className={styles.tabBadge} />
              </Box>
            }
            value="pending"
          />
          <Tab
            label={
              <Box className={styles.tabLabel}>
                <span>Accepted</span>
                <Badge badgeContent={getStatusCount("accepted")} color="success" className={styles.tabBadge} />
              </Box>
            }
            value="accepted"
          />
          <Tab
            label={
              <Box className={styles.tabLabel}>
                <span>Rejected</span>
                <Badge badgeContent={getStatusCount("rejected")} color="error" className={styles.tabBadge} />
              </Box>
            }
            value="rejected"
          />
        </Tabs>
      </Paper>

      <Box className={styles.applicantsgrid}>
        {filteredApplicants.length > 0 ? (
          filteredApplicants.map((applicant) => (
            <ApplicantCard
              key={applicant.id}
              applicant={applicant}
              onViewKardex={handleViewKardex}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))
        ) : (
          <Box className={styles.noApplicants}>
            <Typography variant="h6" color="textSecondary">
              No applicants found in this category
            </Typography>
          </Box>
        )}
      </Box>

      {selectedApplicant && (
        <KardexDialog
          applicant={selectedApplicant}
          open={!!selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}
    </Container>
  )
}

interface ApplicantCardProps {
  applicant: Applicant
  onViewKardex: (applicant: Applicant) => void
  onAccept: (id: number) => void
  onReject: (id: number) => void
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({ applicant, onViewKardex, onAccept, onReject }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AccessTimeIcon fontSize="small" color="inherit"/>
      case "accepted":
        return <CheckCircleIcon fontSize="small" color="inherit"/>
      case "rejected":
        return <CancelIcon fontSize="small" color="inherit"/>
      default:
        return <AccessTimeIcon fontSize="small" color="inherit"/>
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return styles.statusPending
      case "accepted":
        return styles.statusAccepted
      case "rejected":
        return styles.statusRejected
      default:
        return ""
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className={styles.applicantcard}>
      <CardContent className={styles.cardContentWrapper}>
        <Box className={styles.cardheader}>
          <Box className={styles.applicantInfo}>
            <Avatar className={styles.applicantAvatar}>{getInitials(applicant.name)}</Avatar>
            <Box>
              <Typography variant="h6" className={styles.cardtitle}>
                {applicant.name}
              </Typography>
              <Chip
                icon={getStatusIcon(applicant.status)}
                label={applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                className={`${styles.statusbadge} ${getStatusColor(applicant.status)}`}
                size="small"
              />
            </Box>
          </Box>
        </Box>

        <Divider className={styles.cardDivider} />

        <Box className={styles.cardcontent}>
          <Typography variant="body2" className={styles.vacancyinfo}>
            <WorkIcon fontSize="small" /> {applicant.vacancy}
          </Typography>
          <Typography variant="body2" className={styles.emailinfo}>
            <EmailIcon fontSize="small" /> {applicant.email}
          </Typography>
          <Typography variant="body2" className={styles.dateinfo}>
            <DateRangeIcon fontSize="small" /> Applied: {applicant.appliedDate}
          </Typography>
        </Box>

        <Box className={styles.skillscontainer}>
          {applicant.skills.slice(0, 3).map((skill, index) => (
            <Chip key={index} label={skill} className={styles.skillbadge} size="small" />
          ))}
          {applicant.skills.length > 3 && (
            <Chip label={`+${applicant.skills.length - 3}`} className={styles.skillbadge} size="small" />
          )}
        </Box>
      </CardContent>

      <CardActions className={styles.cardactions}>
        <Button size="small" onClick={() => onViewKardex(applicant)} className={styles.viewkardexbtn} variant="text">
          View Kardex
        </Button>
        {applicant.status === "pending" && (
          <>
            <Button size="small" onClick={() => onReject(applicant.id)} className={styles.rejectbtn} variant="outlined">
              Reject
            </Button>
            <Button
              size="small"
              onClick={() => onAccept(applicant.id)}
              className={styles.acceptbtn}
              variant="contained"
            >
              Accept
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  )
}

interface KardexDialogProps {
  applicant: Applicant
  open: boolean
  onClose: () => void
}

const KardexDialog: React.FC<KardexDialogProps> = ({ applicant, open, onClose }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return styles.statusPending
      case "accepted":
        return styles.statusAccepted
      case "rejected":
        return styles.statusRejected
      default:
        return ""
    }
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
          <Typography variant="h6">{applicant.name}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent className={styles.kardexDialogContent}>
        <DialogContentText component="div">
          <Box className={styles.kardexcontent}>
            <Paper elevation={0} className={styles.kardexsection}>
              <Typography variant="h6" className={styles.sectiontitle}>
                <PersonIcon /> Personal Information
              </Typography>
              <Box className={styles.kardexDetails}>
                <Typography className={styles.kardexDetailItem}>
                  <strong>Name:</strong> {applicant.name}
                </Typography>
                <Typography className={styles.kardexDetailItem}>
                  <EmailIcon fontSize="small" className={styles.detailIcon} /> {applicant.email}
                </Typography>
                <Typography className={styles.kardexDetailItem}>
                  <PhoneIcon fontSize="small" className={styles.detailIcon} /> {applicant.phone}
                </Typography>
              </Box>
            </Paper>

            <Paper elevation={0} className={styles.kardexsection}>
              <Typography variant="h6" className={styles.sectiontitle}>
                <WorkIcon /> Application Details
              </Typography>
              <Box className={styles.kardexDetails}>
                <Typography className={styles.kardexDetailItem}>
                  <strong>Position:</strong> {applicant.vacancy}
                </Typography>
                <Typography className={styles.kardexDetailItem}>
                  <DateRangeIcon fontSize="small" className={styles.detailIcon} /> Applied: {applicant.appliedDate}
                </Typography>
                <Box className={styles.statusContainer}>
                  <Typography component="span" className={styles.kardexDetailItem}>
                    <strong>Status:</strong>
                  </Typography>
                  <Chip
                    label={applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                    className={`${styles.statusbadge} ${getStatusColor(applicant.status)}`}
                  />
                </Box>
              </Box>
            </Paper>

            <Paper elevation={0} className={styles.kardexsection}>
              <Typography variant="h6" className={styles.sectiontitle}>
                <SchoolIcon /> Education
              </Typography>
              <Typography className={styles.kardexText}>{applicant.education}</Typography>
            </Paper>

            <Paper elevation={0} className={styles.kardexsection}>
              <Typography variant="h6" className={styles.sectiontitle}>
                <StarIcon /> Experience
              </Typography>
              <Typography className={styles.kardexText}>{applicant.experience}</Typography>
            </Paper>

            <Paper elevation={0} className={`${styles.kardexsection} ${styles.skillsSection}`}>
              <Typography variant="h6" className={styles.sectiontitle}>
                Skills
              </Typography>
              <Box className={styles.skillscontainer}>
                {applicant.skills.map((skill, index) => (
                  <Chip key={index} label={skill} className={styles.skillbadge} />
                ))}
              </Box>
            </Paper>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions className={styles.kardexActions}>
        <Button onClick={onClose} variant="contained" className={styles.closeButton}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Applicants

