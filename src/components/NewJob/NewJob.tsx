"use client"

import React, { useState } from "react"
import styles from "./newjob.module.css"
import { Modal, Box, IconButton, Tooltip } from "@mui/material"
import Swal from "sweetalert2"
import { createVacant } from "../../services/authService"
import CloseIcon from "@mui/icons-material/Close"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import DescriptionIcon from "@mui/icons-material/Description"
import InfoIcon from "@mui/icons-material/Info"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const NewJob = ({
  open,
  handleClose,
  updateVacants,
}: { open: boolean; handleClose: () => void; updateVacants: () => void }) => {
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
    relocation: false, // Checkbox for relocation
    jobDescription: "",
    salary: 0,
    deadline: "",
    requirements: "",
    status: true,
    aditionalInformation: "",
  }

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateField = (name: string, value: any) => {
    let error = ""

    switch (name) {
      case "positionName":
        if (!value) error = "Position name is required"
        else if (value.length > 50) error = "Position name must not exceed 50 characters"
        break
      case "area":
        if (!value) error = "Area is required"
        break
      case "location":
        if (!value) error = "Location is required"
        break
      case "jobDescription":
        if (!value) error = "Job description is required"
        else if (value.length > 1500) error = "Job description must not exceed 1500 characters"
        break
      case "salary":
        if (value < 0) error = "Salary must be 0 or a positive number"
        break
      case "deadline":
        if (!value) error = "Deadline is required"
        else if (new Date(value) <= new Date()) error = "Deadline must be in the future"
        break
      case "requirements":
        if (!value) error = "Requirements are required"
        else if (value.length > 1500) error = "Requirements must not exceed 1500 characters"
        break
      case "aditionalInformation":
        if (value.length > 1500) error = "Additional information must not exceed 1500 characters"
        break
      default:
        break
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    const fieldValue = type === "checkbox" ? checked : value

    setFormData({
      ...formData,
      [name]: fieldValue,
    })

    validateField(name, fieldValue)
  }

  const handleQuillChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })

    validateField(name, value)
  }

  const isFormValid = () => {
    return Object.values(errors).every((error) => !error) && Object.values(formData).every((value) => value !== "")
  }

  const handleSubmit = () => {
    if (!isFormValid()) {
      Swal.fire("Error!", "Please fix the errors in the form before submitting.", "error")
      return
    }

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
          await createVacant(formData)
          Swal.fire("Saved!", "Job posting saved successfully!", "success")
          setFormData(initialFormData) // Reset form data
          setStep(1) // Reset to step 1
          handleClose()
          updateVacants() // Update the list of vacants
        } catch (error) {
          Swal.fire("Error!", (error as any).message || "Error creating vacant", "error")
        }
      }
    })
  }

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
            <h2>New Job Posting</h2>
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
                  {errors.positionName && <span className={styles.errorText}>{errors.positionName}</span>}
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
                    {errors.area && <span className={styles.errorText}>{errors.area}</span>}
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
                    {errors.location && <span className={styles.errorText}>{errors.location}</span>}
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
                    {errors.salary && <span className={styles.errorText}>{errors.salary}</span>}
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
                    onChange={(value) => handleQuillChange(value, "jobDescription")}
                    placeholder="Describe the responsibilities and duties of this position..."
                    theme="snow"
                    className={styles.quillEditor}
                  />
                  {errors.jobDescription && <span className={styles.errorText}>{errors.jobDescription}</span>}
                </div>

                <div className={styles.newJobFormField}>
                  <label htmlFor="requirements">Requirements</label>
                  <ReactQuill
                    id="requirements"
                    value={formData.requirements}
                    onChange={(value) => handleQuillChange(value, "requirements")}
                    placeholder="List the qualifications, skills, and experience required..."
                    theme="snow"
                    className={styles.quillEditor}
                  />
                  {errors.requirements && <span className={styles.errorText}>{errors.requirements}</span>}
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
                    onChange={(value) => handleQuillChange(value, "aditionalInformation")}
                    placeholder="Include any other relevant details about the position..."
                    theme="snow"
                    className={styles.quillEditor}
                  />
                  {errors.aditionalInformation && (
                    <span className={styles.errorText}>{errors.aditionalInformation}</span>
                  )}
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
                    {errors.deadline && <span className={styles.errorText}>{errors.deadline}</span>}
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
            <button
              className={`${styles.newJobModalButton} ${styles.newJobModalButtonSubmit}`}
              onClick={handleSubmit}
              disabled={!isFormValid()}
            >
              Submit Job
            </button>
          )}
        </div>
      </Box>
    </Modal>
  )
}

export default NewJob

