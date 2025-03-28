"use client"

import { useState } from "react"
import { Modal, Box, IconButton, Typography, Chip, Divider, Button, Avatar, Fade } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff"
import DescriptionIcon from "@mui/icons-material/Description"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import InfoIcon from "@mui/icons-material/Info"
import WorkIcon from "@mui/icons-material/Work"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import VerifiedIcon from "@mui/icons-material/Verified"
import parse from 'html-react-parser'
import 'react-quill/dist/quill.snow.css'
import React from "react"
import styles from "./jobmodal.module.css"
import type { Job } from "../../pages/Home/Home.types"

interface JobModalProps {
  open: boolean;
  handleClose: () => void;
  job: Job;
  onApply: () => void;
}

const JobModal: React.FC<JobModalProps> = ({ open, handleClose, job, onApply }) => {
  const [activeTab, setActiveTab] = useState("description")

  if (!job) return null

  const formatDate = (dateString: string) => {
    if (!dateString) return "No date specified"
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(salary)
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

  // Generate initials for the avatar
  const getInitials = (positionName: string) => {
    return positionName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Split requirements into bullet points if they contain line breaks or semicolons
  const formatRequirements = (requirements: string) => {
    if (!requirements) return ["No specific requirements provided."]

    // Split by line breaks or semicolons
    const splitPattern = /[;\n]+/
    const items = requirements.split(splitPattern).filter((item) => item.trim().length > 0)

    return items.length > 0 ? items : [requirements]
  }

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="job-details-modal" closeAfterTransition>
      <Fade in={open}>
        <Box className={styles.jobModalContent}>

          <Box className={styles.jobModalHeader}>
            <IconButton onClick={handleClose} className={styles.closeButton} aria-label="close">
              <CloseIcon />
            </IconButton>

            <Box className={styles.headerContent}>
              <Avatar className={styles.jobAvatar} style={{ background: getAvatarColor(job.id) }}>
                {getInitials(job.positionName)}
              </Avatar>

              <Box className={styles.jobTitleContainer}>
                <Typography variant="h4" component="h2" className={styles.jobTitle}>
                  {job.positionName}
                </Typography>

                <Box className={styles.jobMetadata}>
                  <Chip
                    icon={<BusinessCenterIcon />}
                    label={job.area}
                    className={styles.jobChip}
                    color="info"
                    size="small"
                    style={{ backgroundColor: 'rgba(27, 0, 150, 0.08)', color: '#1b0096' }}
                  />
                  <Chip
                    icon={<LocationOnIcon />}
                    label={job.location}
                    className={styles.jobChip}
                    variant="outlined"
                    size="small"
                  />
                  {job.status ? (
                    <Chip
                      icon={<VerifiedIcon />}
                      label="Active"
                      className={styles.statusChip}
                      color="success"
                      size="small"
                    />
                  ) : (
                    <Chip icon={<DoDisturbOnIcon/>} label="Inactive" className={styles.statusChip} color="error" size="small" />
                  )}
                </Box>
              </Box>
            </Box>

            <Box className={styles.quickInfoContainer}>
              <Box className={styles.quickInfoItem}>
                <AttachMoneyIcon className={styles.quickInfoIcon} />
                <Box>
                  <Typography variant="caption" className={styles.quickInfoLabel}>
                    Salary
                  </Typography>
                  <Typography variant="body1" className={styles.quickInfoValue}>
                    {formatSalary(job.salary)}
                  </Typography>
                </Box>
              </Box>

              <Divider orientation="vertical" flexItem className={styles.quickInfoDivider} />

              <Box className={styles.quickInfoItem}>
                <CalendarTodayIcon className={styles.quickInfoIcon} />
                <Box>
                  <Typography variant="caption" className={styles.quickInfoLabel}>
                    Deadline
                  </Typography>
                  <Typography variant="body1" className={styles.quickInfoValue}>
                    {formatDate(job.deadline)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Navigation Tabs */}
          <Box className={styles.tabsContainer}>
            <Button
              className={`${styles.tabButton} ${activeTab === "description" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("description")}
              startIcon={<DescriptionIcon />}
            >
              Description
            </Button>
            <Button
              className={`${styles.tabButton} ${activeTab === "requirements" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("requirements")}
              startIcon={<CheckCircleOutlineIcon />}
            >
              Requirements
            </Button>
            <Button
              className={`${styles.tabButton} ${activeTab === "details" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("details")}
              startIcon={<InfoIcon />}
            >
              Details
            </Button>
          </Box>

          {/* Content Section */}
          <Box className={styles.jobModalBody}>
            {activeTab === "description" && (
              <Fade in={activeTab === "description"}>
                <Box className={styles.tabContent}>
                  <Box className={styles.sectionHeader}>
                    <WorkIcon className={styles.sectionIcon} />
                    <Typography variant="h6" component="h3" className={styles.sectionTitle}>
                      Job Description
                    </Typography>
                  </Box>

                  <Box className={styles.quillContent}>
                    {parse(job.jobDescription || "No description provided.")}
                  </Box>
                </Box>
              </Fade>
            )}

            {activeTab === "requirements" && (
              <Fade in={activeTab === "requirements"}>
                <Box className={styles.tabContent}>
                  <Box className={styles.sectionHeader}>
                    <CheckCircleOutlineIcon className={styles.sectionIcon} />
                    <Typography variant="h6" component="h3" className={styles.sectionTitle}>
                      Requirements
                    </Typography>
                  </Box>

                  <Box className={styles.quillContent}>
                    {parse(job.requirements || "No specific requirements provided.")}
                  </Box>
                </Box>
              </Fade>
            )}

            {activeTab === "details" && (
              <Fade in={activeTab === "details"}>
                <Box className={styles.tabContent}>
                  <Box className={styles.sectionHeader}>
                    <InfoIcon className={styles.sectionIcon} />
                    <Typography variant="h6" component="h3" className={styles.sectionTitle}>
                      Job Details
                    </Typography>
                  </Box>

                  <Box className={styles.detailsGrid}>
                    <Box className={styles.detailItem}>
                      <BusinessCenterIcon className={styles.detailIcon} />
                      <Box>
                        <Typography variant="subtitle2" className={styles.detailLabel}>
                          Department
                        </Typography>
                        <Typography variant="body1" className={styles.detailValue}>
                          {job.area}
                        </Typography>
                      </Box>
                    </Box>

                    <Box className={styles.detailItem}>
                      <LocationOnIcon className={styles.detailIcon} />
                      <Box>
                        <Typography variant="subtitle2" className={styles.detailLabel}>
                          Location
                        </Typography>
                        <Typography variant="body1" className={styles.detailValue}>
                          {job.location}
                        </Typography>
                      </Box>
                    </Box>

                    <Box className={styles.detailItem}>
                      <AttachMoneyIcon className={styles.detailIcon} />
                      <Box>
                        <Typography variant="subtitle2" className={styles.detailLabel}>
                          Salary
                        </Typography>
                        <Typography variant="body1" className={styles.detailValue}>
                          {formatSalary(job.salary)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box className={styles.detailItem}>
                      <CalendarTodayIcon className={styles.detailIcon} />
                      <Box>
                        <Typography variant="subtitle2" className={styles.detailLabel}>
                          Application Deadline
                        </Typography>
                        <Typography variant="body1" className={styles.detailValue}>
                          {formatDate(job.deadline)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box className={styles.detailItem}>
                      <AccessTimeIcon className={styles.detailIcon} />
                      <Box>
                        <Typography variant="subtitle2" className={styles.detailLabel}>
                          Status
                        </Typography>
                        <Typography variant="body1" className={styles.detailValue}>
                          {job.status ? "Active" : "Inactive"}
                        </Typography>
                      </Box>
                    </Box>

                    {job.relocation && (
                      <Box className={styles.detailItem}>
                        <FlightTakeoffIcon className={styles.detailIcon} />
                        <Box>
                          <Typography variant="subtitle2" className={styles.detailLabel}>
                            Relocation
                          </Typography>
                          <Typography variant="body1" className={styles.detailValue}>
                            {job.relocation ? "Available" : "Not Available"}
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {job.aditionalInformation && (
                      <Box className={styles.detailItem} sx={{ gridColumn: "1 / -1" }}>
                        <InfoIcon className={styles.detailIcon} />
                        <Box>
                          <Typography variant="subtitle2" className={styles.detailLabel}>
                            Additional Information
                          </Typography>
                          <Box className={styles.quillContent}>
                            {parse(job.aditionalInformation)}
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Fade>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default JobModal