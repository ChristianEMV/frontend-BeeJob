"use client";

import type React from "react";
import { useState } from "react";
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
} from "@mui/material";
import {
  Person as PersonIcon,
  Work as WorkIcon,
  DateRange as DateRangeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import styles from "./styles.module.css";

interface Applicant {
  id: number;
  name: string;
  vacancy: string;
  email: string;
  phone: string;
  experience: string;
  education: string;
  skills: string[];
  status: "pending" | "accepted" | "rejected";
  appliedDate: string;
}

const applicants: Applicant[] = [
  {
    id: 1,
    name: "John Doe",
    vacancy: "Software Engineer",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    experience:
      "5 years of experience in full-stack development with React and Node.js",
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
    experience:
      "7 years of experience in product management for SaaS companies",
    education: "MBA, Harvard Business School",
    skills: [
      "Product Strategy",
      "User Research",
      "Agile",
      "Data Analysis",
      "Roadmapping",
    ],
    status: "pending",
    appliedDate: "2023-10-12",
  },
  {
    id: 3,
    name: "Michael Johnson",
    vacancy: "UX Designer",
    email: "michael.j@example.com",
    phone: "(555) 456-7890",
    experience:
      "4 years of experience in user experience design for mobile applications",
    education: "Master's in Human-Computer Interaction, Carnegie Mellon",
    skills: [
      "Figma",
      "User Testing",
      "Wireframing",
      "Prototyping",
      "UI Design",
    ],
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
];

const Applicants: React.FC = () => {
  const [applicantsList, setApplicantsList] = useState<Applicant[]>(applicants);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<string>("all");

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
          applicantsList.map((applicant) =>
            applicant.id === id
              ? { ...applicant, status: "accepted" }
              : applicant
          )
        );
        Swal.fire("Accepted!", "The applicant has been accepted.", "success");
      }
    });
  };

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
          applicantsList.map((applicant) =>
            applicant.id === id
              ? { ...applicant, status: "rejected" }
              : applicant
          )
        );
        Swal.fire("Rejected!", "The applicant has been rejected.", "success");
      }
    });
  };

  const handleViewKardex = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
  };

  const filteredApplicants = applicantsList.filter((applicant) => {
    if (activeTab === "all") return true;
    return applicant.status === activeTab;
  });

  return (
    <Box className={styles.applicantscontainer}>
      <Typography variant="h4" className={styles.applicantstitle}>
        Applicant Management
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        className={styles.applicantstabs}
      >
        <Tab label="All Applicants" value="all" />
        <Tab label="Pending" value="pending" />
        <Tab label="Accepted" value="accepted" />
        <Tab label="Rejected" value="rejected" />
      </Tabs>

      <Box className={styles.applicantsgrid}>
        {filteredApplicants.map((applicant) => (
          <ApplicantCard
            key={applicant.id}
            applicant={applicant}
            onViewKardex={handleViewKardex}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ))}
      </Box>

      {selectedApplicant && (
        <KardexDialog
          applicant={selectedApplicant}
          open={!!selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}
    </Box>
  );
};

interface ApplicantCardProps {
  applicant: Applicant;
  onViewKardex: (applicant: Applicant) => void;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({
  applicant,
  onViewKardex,
  onAccept,
  onReject,
}) => {
  return (
    <Card className={styles.applicantcard}>
      <CardContent>
        <Box className={styles.cardheader}>
          <Typography variant="h6" className={styles.cardtitle}>
            {applicant.name}
          </Typography>
          <Chip
            label={
              applicant.status.charAt(0).toUpperCase() +
              applicant.status.slice(1)
            }
            className={`styles.statusbadge ${applicant.status}`}
          />
        </Box>
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
            <Chip key={index} label={skill} className={styles.skillbadge} />
          ))}
          {applicant.skills.length > 3 && (
            <Chip
              label={`+${applicant.skills.length - 3}`}
              className={styles.skillbadge}
            />
          )}
        </Box>
      </CardContent>
      <CardActions className={styles.cardactionsApplicants}>
        <Button
          size="small"
          onClick={() => onViewKardex(applicant)}
          className={styles.viewkardexbtn}
        >
          View Kardex
        </Button>
        {applicant.status === "pending" && (
          <>
            <Button
              size="small"
              onClick={() => onReject(applicant.id)}
              className={styles.rejectbtn}
            >
              Reject
            </Button>
            <Button
              size="small"
              onClick={() => onAccept(applicant.id)}
              className={styles.acceptbtn}
            >
              Accept
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

interface KardexDialogProps {
  applicant: Applicant;
  open: boolean;
  onClose: () => void;
}

const KardexDialog: React.FC<KardexDialogProps> = ({
  applicant,
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className={styles.kardextitle}>
        Applicant Kardex: {applicant.name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          <Box className={styles.kardexcontent}>
            <Box className={styles.kardexsection}>
              <Typography variant="h6" className={styles.sectiontitle}>
                <PersonIcon /> Personal Information
              </Typography>
              <Typography>
                <strong>Name:</strong> {applicant.name}
              </Typography>
              <Typography>
                <EmailIcon fontSize="small" /> {applicant.email}
              </Typography>
              <Typography>
                <PhoneIcon fontSize="small" /> {applicant.phone}
              </Typography>
            </Box>
            <Box className={styles.kardexsection}>
              <Typography variant="h6" className={styles.sectiontitle}>
                <WorkIcon /> Application Details
              </Typography>
              <Typography>
                <strong>Position:</strong> {applicant.vacancy}
              </Typography>
              <Typography>
                <DateRangeIcon fontSize="small" /> Applied:{" "}
                {applicant.appliedDate}
              </Typography>
              <Typography>
                <strong>Status:</strong>
                <Chip
                  label={
                    applicant.status.charAt(0).toUpperCase() +
                    applicant.status.slice(1)
                  }
                  className={`styles.statusbadge ${applicant.status}`}
                />
              </Typography>
            </Box>
            <Box className={styles.kardexsection}>
              <Typography variant="h6" className={styles.sectiontitle}>
                <SchoolIcon /> Education
              </Typography>
              <Typography>{applicant.education}</Typography>
            </Box>
            <Box className={styles.kardexsection}>
              <Typography variant="h6" className={styles.sectiontitle}>
                <StarIcon /> Experience
              </Typography>
              <Typography>{applicant.experience}</Typography>
            </Box>
            <Box className={styles.kardexsection}>
              <Typography variant="h6" className={styles.sectiontitle}>
                Skills
              </Typography>
              <Box className={styles.skillscontainer}>
                {applicant.skills.map((skill, index) => (
                  <Chip key={index} label={skill} className={styles.skillbadge} />
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Applicants;
