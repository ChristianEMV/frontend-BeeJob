"use client"

import type React from "react"
import { useState, useEffect } from "react"
import styles from "./editjob.module.css"
import { Modal, Box, IconButton, Tooltip } from "@mui/material"
import Swal from "sweetalert2"
import { getVacantById, updateVacant } from "../../services/authService"
import CloseIcon from "@mui/icons-material/Close"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import DescriptionIcon from "@mui/icons-material/Description"
import InfoIcon from "@mui/icons-material/Info"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const EditJob = ({
  open,
  handleClose,
  updateVacants,
  vacantId,
}: { open: boolean; handleClose: () => void; updateVacants: () => void; vacantId: number }) => {
  // Steps management
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const previousStep = () => {
    if (step > 1) setStep(step - 1)
  }

  // Form data
  const initialFormData = {
    positionName: "",
    area: "",
    location: "",
    relocation: false,
    jobDescription: "",
    salary: 0,
    deadline: "",
    requirements: "",
    status: true,
    aditionalInformation: "",
  }

  const [formData, setFormData] = useState(initialFormData)

  // Fetch data whenever the modal is opened or vacantId changes
  useEffect(() => {
    const fetchVacantData = async () => {
      if (open && vacantId) {
        console.log("Fetching vacant with ID:", vacantId) // Verifica el ID
        try {
          const data = await getVacantById(vacantId)
          setFormData(data)
        } catch (error) {
          Swal.fire("Error!", (error as any).message || "Error fetching vacant data", "error")
        }
      }
    }

    fetchVacantData()
  }, [open, vacantId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleQuillChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Alert and navigation
  const handleSubmit = () => {
    console.log("Datos enviados al backend:", {
      ...formData,
      id: vacantId,
    });

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to continue with the job posting?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, continue!",
      customClass: {
        container: "swal2-container",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateVacant({
            ...formData,
            id: vacantId,
          });
          Swal.fire("Saved!", "Job posting updated successfully!", "success");
          updateVacants();
          handleClose();
          setFormData(initialFormData);
          setStep(1);
        } catch (error) {
          Swal.fire("Error!", (error as any).message || "Error updating vacant", "error");
        }
      }
    });
  };

  // Step indicators
  const stepIcons = [
    <BusinessCenterIcon key="step1" className={styles.stepIcon} />,
    <DescriptionIcon key="step2" className={styles.stepIcon} />,
    <InfoIcon key="step3" className={styles.stepIcon} />,
  ]

  const stepTitles = ["General Details", "Job Description", "Additional Information"]

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="job-posting-modal">
      <Box className={styles.newJobModalContent}>
        <div className={styles.newJobModalHeader}>
          <div className={styles.headerTop}>
            <h2>Edit Job Posting</h2>
            <Tooltip title="Close">
              <IconButton onClick={handleClose} size="small" className={styles.closeButton}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>

          <div className={styles.stepsContainer}>
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`${styles.stepIndicator} ${step >= stepNumber ? styles.activeStep : ""}`}
                onClick={() => (stepNumber < step ? setStep(stepNumber) : null)}
              >
                <div className={styles.stepIconContainer}>{stepIcons[stepNumber - 1]}</div>
                <span className={styles.stepLabel}>{stepTitles[stepNumber - 1]}</span>
                {stepNumber < 3 && <div className={styles.stepConnector} />}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.newJobModalBody}>
          {step === 1 && (
            <div className={styles.newJobStepContent}>
              <div className={styles.formSection}>
                <div className={styles.newJobFormField}>
                  <label htmlFor="positionName">Position Name</label>
                  <input
                    id="positionName"
                    type="text"
                    name="positionName"
                    placeholder="Enter position title"
                    value={formData.positionName}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.newJobFormGrid}>
                  <div className={styles.newJobFormField}>
                    <label htmlFor="area">Area</label>
                    <select id="area" name="area" value={formData.area} onChange={handleChange}>
                      <option value="">Select area</option>
                      <option value="DEVELOPERS">DEVELOPERS</option>
                      <option value="TESTING">TESTING</option>
                      <option value="SCRUM_MASTER">SCRUM_MASTER</option>
                      <option value="ARCHITECTS">ARCHITECTS</option>
                      <option value="CODE_REVIEWER">CODE_REVIEWER</option>
                      <option value="QUALITY_CONTROL">QUALITY_CONTROL</option>
                      <option value="PLATAFORMS">PLATAFORMS</option>
                      <option value="LABORATORY">LABORATORY</option>
                      <option value="BUSINESS_INTELLIGENCE">BUSINESS_INTELLIGENCE</option>
                      <option value="BEECKER_ACADEMY">BEECKER_ACADEMY</option>
                    </select>
                  </div>

                  <div className={styles.newJobFormField}>
                    <label htmlFor="location">Location</label>
                    <input
                      id="location"
                      type="text"
                      name="location"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.newJobFormField}>
                    <label htmlFor="salary">Salary</label>
                    <input
                      id="salary"
                      type="number"
                      name="salary"
                      placeholder="Salary amount"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.checkboxGroup}>
                  <div className={styles.newJobFormField}>
                    <div className={styles.checkboxContainer}>
                      <input
                        id="relocation"
                        type="checkbox"
                        name="relocation"
                        checked={formData.relocation}
                        onChange={handleChange}
                      />
                      <label htmlFor="relocation">Relocation Available</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.newJobStepContent}>
              <div className={styles.formSection}>
                <div className={styles.newJobFormField}>
                  <label htmlFor="jobDescription">Job Description</label>
                  <ReactQuill
                    id="jobDescription"
                    value={formData.jobDescription}
                    onChange={(value) => handleQuillChange("jobDescription", value)}
                    className={styles.quillEditor}
                  />
                </div>

                <div className={styles.newJobFormField}>
                  <label htmlFor="requirements">Requirements</label>
                  <ReactQuill
                    id="requirements"
                    value={formData.requirements}
                    onChange={(value) => handleQuillChange("requirements", value)}
                    className={styles.quillEditor}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.newJobStepContent}>
              <div className={styles.formSection}>
                <div className={styles.newJobFormField}>
                  <label htmlFor="aditionalInformation">Additional Information</label>
                  <ReactQuill
                    id="aditionalInformation"
                    value={formData.aditionalInformation}
                    onChange={(value) => handleQuillChange("aditionalInformation", value)}
                    className={styles.quillEditor}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.newJobFormField}>
                    <label htmlFor="deadline">Application Deadline</label>
                    <input
                      id="deadline"
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.newJobFormField}>
                    <div className={styles.checkboxContainer}>
                      <input
                        id="status"
                        type="checkbox"
                        name="status"
                        checked={formData.status}
                        onChange={handleChange}
                      />
                      <label htmlFor="status">Active Job Posting</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.newJobModalFooter}>
          {step > 1 ? (
            <button className={`${styles.newJobModalButton} ${styles.newJobModalButtonBack}`} onClick={previousStep}>
              Previous
            </button>
          ) : (
            <button className={`${styles.newJobModalButton} ${styles.newJobModalButtonBack}`} onClick={handleClose}>
              Cancel
            </button>
          )}

          {step < totalSteps ? (
            <button className={styles.newJobModalButton} onClick={nextStep}>
              Next
            </button>
          ) : (
            <button className={`${styles.newJobModalButton} ${styles.newJobModalButtonSubmit}`} onClick={handleSubmit}>
              Submit Job
            </button>
          )}
        </div>
      </Box>
    </Modal>
  )
}

export default EditJob